"use client"
import { useState, useRef, useEffect } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
const ForgotPassword = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [otp, setOtp] = useState("")
    const [verifyOTP, setVerifyOTP] = useState("")
    const [verifyOTPSuccess, setVerifyOTPSuccess] = useState(false)
    const [countDown, setCountDown] = useState(0)
    const [countDownRedirect, setCountDownRedirect] = useState(5)
    const [showingPassword, setShowingPassword] = useState(false)
    const [showingConfirmPassword, setShowingConfirmPassword] = useState(false)
    const [checkPass, setCheckPass] = useState(true)
    const [checkPassConfirm, setCheckPassConfirm] = useState(true)
    const [errorAlert, setErrorAlert] = useState("")
    const [recoverySuccess, setRecoverySuccess] = useState(false)
    const inputOtpRef = useRef(null)
    useEffect(() => {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
        if (!regex.test(password)) {
            setCheckPass(false)
        }
        else {
            setCheckPass(true)
        }
    }, [password])

    useEffect(() => {
        if (password != confirmPassword) {
            setCheckPassConfirm(false)
        }
        else {
            setCheckPassConfirm(true)
        }
    }, [confirmPassword, password])

    const sendOTP = async (e) => {
        e.preventDefault()
        if (email.includes("@")) {
            setErrorAlert("")
            const random = Math.floor(Math.random() * (999999 - 100001)) + 100001;
            setOtp(random)   
            setCountDown(60)
            setVerifyOTPSuccess(false)
            const send = await fetch("/api/auth/email", {
                method: "POST",
                body: JSON.stringify({
                    email: email,
                    otp: random
                })
            })
            setTimeout(() => {
                setOtp(null)
            }, 300000)
        }
        else {
            setErrorAlert("Email không hợp lệ")
        }
    }  

    useEffect(() => {
        if (countDown > 0) {
            setTimeout(() => {
                setCountDown(countDown - 1)
            }, 1000)
        }
    }, [countDown])

    const checkOTP = (e) => {
        e.preventDefault()
        if (otp == verifyOTP) {
            setVerifyOTPSuccess(true)
        } else {
            setVerifyOTPSuccess(false)
            setErrorAlert("Mã xác nhận không đúng")
        }
    }

    useEffect(() => {
        if (otp != "" && !verifyOTPSuccess) {
            inputOtpRef.current.classList.remove("animate__fadeOutUp", "hidden")
            inputOtpRef.current.classList.add("animate__fadeInDown", "block")
        }
        else {
            inputOtpRef.current.classList.remove("animate__fadeInDown", "block")
            inputOtpRef.current.classList.add("animate__fadeOutUp")
        }
    }, [otp, verifyOTPSuccess])

    const handleHidden = () => {
        if (inputOtpRef.current.classList.contains("animate__fadeOutUp")) {
            inputOtpRef.current.classList.add("hidden")
        }
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!verifyOTPSuccess) {
            setErrorAlert("Vui lòng xác nhận email bằng mã OTP")
            return
        } 
        if (!checkPass || !checkPassConfirm) {
            return
        }
        const formData = new FormData();
        formData.append('email', email);
        formData.append('password', password);
        const res = await fetch('/api/auth/recovery', {
            method: 'PATCH',
            body: formData
        });
        if (res.ok) {
            setRecoverySuccess(true)
            setErrorAlert("");
        }
        else {
            res.text().then(text => {
                setErrorAlert(text)
            })
        }
    }
    useEffect(() => {
        if (recoverySuccess) {
            if (countDownRedirect == 0) {
                window.location.href = "/customer/login"
            }
            else {
                setTimeout(() => {
                    setCountDownRedirect(countDownRedirect - 1)
                }, 1000)
            }
        }
    }), [recoverySuccess, countDownRedirect]
    return (
        <div className="max-w-203 mx-auto px-4 pt-5 pb-20">
            <Image className="w-20 h-20 object-contain mx-auto" src="/assets/logo.png" width={200} height={200} alt="logo" />
            <div className="mt-10 text-center font-bold text-lg">Lấy lại mật khẩu</div>
            <div className="mt-7">
                <form>
                    <div className="border border-bodydark1 rounded-md p-4 relative">
                        <div className="absolute top-0 left-0 bg-bodydark1 p-1 rounded-br-md text-sm">Email</div>
                        <div className="mt-7">
                            <label className="font-medium">Email</label>
                            <div className={`mt-3`}>
                                <label className="font-medium">Mã xác nhận</label>
                                <div className="flex gap-7 items-stretch">
                                    <input onChange={(e) => setEmail(e.target.value)} className="w-full rounded-md border border-bodydark px-2 py-1 focus:outline-primary-500 mt-1" type="email" placeholder="Email" required></input>
                                    <button onClick={sendOTP} disabled={email != "" && countDown == 0 ? false : true} className="bg-primary-500 hover:bg-primary-600 disabled:bg-primary-300 duration-100 rounded-md px-2 w-2/12 text-white">{countDown == 0 ? "Gửi mã" : countDown}</button>
                                </div>
                            </div>
                            <div ref={inputOtpRef} onAnimationEnd={handleHidden} className={`mt-3 animate__animated hidden`}>
                                <label className="font-medium">Mã xác nhận</label>
                                <div className="flex gap-7 items-stretch">
                                    <input onChange={(e) => setVerifyOTP(e.target.value)} className="w-10/12 rounded-md border border-bodydark px-2 py-1 focus:outline-primary-500 mt-1" type="text" placeholder="Mã xác nhận" required></input>
                                    <button onClick={checkOTP} disabled={verifyOTP.length == 6 ? false : true} className="bg-primary-500 hover:bg-primary-600 disabled:bg-primary-300 duration-100 rounded-md px-2 w-2/12 text-white">Xác nhận</button>
                                </div>
                            </div>
                        </div>
                        {
                            errorAlert != "" && <div className="italic text-red text-sm mt-3">{errorAlert}</div>
                        }
                    </div>
                    <div className={`border border-bodydark1 rounded-md p-4 mt-7 relative ${verifyOTPSuccess ? "block" : "hidden"}`}>
                        <div className="absolute top-0 left-0 bg-bodydark1 p-1 rounded-br-md text-sm">Mật khẩu</div>
                        <div className="mt-7">
                            <label className="font-medium">Mật khẩu</label>
                            <div className="relative">
                                <input onChange={(e) => setPassword(e.target.value)} className="w-full rounded-md border border-bodydark px-2 py-1 focus:outline-primary-500 mt-1" type={`${showingPassword ? "text" : "password"}`} placeholder="Mật khẩu" required></input>
                                {
                                    showingPassword ? (
                                        <EyeSlashIcon onClick={() => setShowingPassword(!showingPassword)} className="absolute top-2.5 right-2 h-5 w-5 cursor-pointer"/>
                                    ) : (
                                        <EyeIcon onClick={() => setShowingPassword(!showingPassword)} className="absolute top-2.5 right-2 h-5 w-5 cursor-pointer"/>
                                    )
                                }
                            </div>
                            {
                                !checkPass && 
                                <div className="italic text-red text-sm">
                                    Mật khẩu có ít nhất 8 ký tự, bao gồm ít nhất 1 chữ cái viết hoa, 1 số và 1 ký tự đặc biệt
                                </div>
                            }
                        </div>
                        <div className="mt-3">
                            <label className="font-medium">Nhập lại mật khẩu</label>
                            <div className="relative">
                                <input onChange={(e) => setConfirmPassword(e.target.value)} className="w-full rounded-md border border-bodydark px-2 py-1 focus:outline-primary-500 mt-1" type={`${showingConfirmPassword ? "text" : "password"}`} placeholder="Nhập lại mật khẩu" required></input>
                                {
                                    showingConfirmPassword ? (
                                        <EyeSlashIcon onClick={() => setShowingConfirmPassword(!showingConfirmPassword)} className="absolute top-2.5 right-2 h-5 w-5 cursor-pointer"/>
                                    ) : (
                                        <EyeIcon onClick={() => setShowingConfirmPassword(!showingConfirmPassword)} className="absolute top-2.5 right-2 h-5 w-5 cursor-pointer"/>
                                    )
                                }
                            </div>
                            {
                                !checkPassConfirm && 
                                <div className="italic text-red text-sm">
                                    Mật khẩu không trùng khớp
                                </div>
                            }
                        </div>
                        <div className="mt-3">
                            <button onClick={handleSubmit} className="w-full bg-primary-500 font-bold text-white rounded-md py-2 mt-5 hover:bg-primary-600 duration-200">Đổi mật khẩu</button>
                        </div>
                    </div>
                </form>
                <div>
                    {
                        recoverySuccess && <div className="mt-5 text-center text-primary-600 font-bold">Lấy lại mật khẩu thành công! Chuyển đến trang đăng nhập sau {countDownRedirect}s</div>
                    }
                </div>
                <div className="mt-5 text-center flex justify-between">
                    <Link href={"/customer/login"} className="mt-5 font-medium hover:underline">Đăng nhập</Link>
                    <Link href={"/customer/register"} className="mt-5 font-medium hover:underline">Đăng ký</Link>
                </div>
            </div>
        </div>
    );
}

export default ForgotPassword;