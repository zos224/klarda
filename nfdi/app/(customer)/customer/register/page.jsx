"use client"

import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import 'animate.css'
const RegisterPage = () => {
    const tcRef = useRef(null)
    const ppRef = useRef(null)
    const inputOtpRef = useRef(null)
    const [showingPassword, setShowingPassword] = useState(false)
    const [showingConfirmPassword, setShowingConfirmPassword] = useState(false)
    const [checkPass, setCheckPass] = useState(false)
    const [checkPassConfirm, setCheckPassConfirm] = useState(false)
    const [otp, setOTP] = useState("")
    const [verifyOTP, setVerifyOTP] = useState("")
    const [countDown, setCountDown] = useState(0)
    const [verifyOTPSuccess, setVerifyOTPSuccess] = useState(false)
    const [signUpSuccess, setSignUpSuccess] = useState(false)
    const [countDownRedirect, setCountDownRedirect] = useState(5)
    const [errorAlert, setErrorAlert] = useState("")
    const [signUpInfo, setSignUpInfo] = useState({
        firstName: "",
        lastName: "",
        email: "",
        academicTitle: "ThS",
        gender: "",
        organization: "",
        department: "",
        type: "congdong",
        role: "user",
        password: "",
        confirmPassword: "",
    });
    useEffect(() => {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
        if (!regex.test(signUpInfo.password)) {
            setCheckPass(false)
        }
        else {
            setCheckPass(true)
        }
    }, [signUpInfo.password])

    useEffect(() => {
        if (signUpInfo.password != signUpInfo.confirmPassword) {
            setCheckPassConfirm(false)
        }
        else {
            setCheckPassConfirm(true)
        }
    }, [signUpInfo.confirmPassword, signUpInfo.password])

    const sendOTP = async (e) => {
        e.preventDefault()
        if (signUpInfo.email.includes("@")) {
            setErrorAlert("")
            const random = Math.floor(Math.random() * (999999 - 100001)) + 100001;
            setOTP(random)   
            setCountDown(60)
            setVerifyOTPSuccess(false)
            const send = await fetch("/api/auth/email", {
                method: "POST",
                body: JSON.stringify({
                    email: signUpInfo.email,
                    otp: random
                })
            })
            setTimeout(() => {
                setOTP(null)
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
    const handleSubmitSignUp = async (e) => {
        e.preventDefault();
        if (!verifyOTPSuccess) {
            setErrorAlert("Vui lòng xác nhận email bằng mã OTP")
            return
        } 
        if (!checkPass || !checkPassConfirm) {
            return
        }
        const formData = new FormData();
        formData.append('firstName', signUpInfo.firstName);
        formData.append('lastName', signUpInfo.lastName);
        formData.append('email', signUpInfo.email);
        formData.append('academicTitle', signUpInfo.academicTitle);
        formData.append('gender', signUpInfo.gender)
        formData.append('organization', signUpInfo.organization);
        formData.append('department', signUpInfo.department);
        formData.append('type', signUpInfo.type);
        formData.append('role', signUpInfo.role);
        formData.append('password', signUpInfo.password);
        const res = await fetch('/api/auth/signup', {
            method: 'POST',
            body: formData
        });
        if (res.ok) {
            setSignUpSuccess(true)
            setErrorAlert("");
        }
        else {
            res.text().then(text => {
                setErrorAlert(text)
            })
        }
    }

    useEffect(() => {
        if (signUpSuccess) {
            if (countDownRedirect == 0) {
                window.location.href = "/customer/login"
            }
            else {
                setTimeout(() => {
                    setCountDownRedirect(countDownRedirect - 1)
                }, 1000)
            }
        }
    }), [signUpSuccess, countDownRedirect]

    return (
        <div className="max-w-203 mx-auto px-4 pt-5 pb-20">
            <Image className="w-20 h-20 object-contain mx-auto" src="/assets/logo.png" width={200} height={200} alt="logo" />
            <div className="mt-10 text-center font-bold text-lg">Đăng ký tài khoản</div>
            <div className="mt-7">
                <form>
                    <div className="border border-bodydark1 rounded-md p-4 relative">
                        <div className="absolute top-0 left-0 bg-bodydark1 p-1 rounded-br-md text-sm">Email</div>
                        <div className="mt-7">
                            <label className="font-medium">Email</label>
                            <div className={`mt-3`}>
                                <label className="font-medium">Mã xác nhận</label>
                                <div className="flex gap-7 items-stretch">
                                    <input onChange={(e) => setSignUpInfo({...signUpInfo, email: e.target.value})} className="w-full rounded-md border border-bodydark px-2 py-1 focus:outline-primary-500 mt-1" type="email" placeholder="Email" required></input>
                                    <button onClick={sendOTP} disabled={signUpInfo.email != "" && countDown == 0 ? false : true} className="bg-primary-500 hover:bg-primary-600 disabled:bg-primary-300 duration-100 rounded-md px-2 w-2/12 text-white">{countDown == 0 ? "Gửi mã" : countDown}</button>
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
                    <div className="border border-bodydark1 rounded-md p-4 relative mt-7">
                        <div className="absolute top-0 left-0 bg-bodydark1 p-1 rounded-br-md text-sm">Thông tin cá nhân</div>
                        <div className="mt-7">
                            <label className="font-medium">Giới tính</label>
                            <div className="w-full flex gap-10" onChange={(e) => setSignUpInfo({...signUpInfo, gender: e.target.value})}>
                                <div >
                                    <input id="nam" type="radio" value={"Nam"} name="gender" required></input>
                                    <label htmlFor="nam" className="mx-2">Nam</label>
                                </div>
                                <div>
                                    <input id="nu" type="radio" value={"Nữ"} name="gender" required></input>
                                    <label htmlFor="nu" className="mx-2">Nữ</label>
                                </div>
                                <div>
                                    <input id="khac" type="radio" value={"Khác"} name="gender" required></input>
                                    <label htmlFor="khac" className="mx-2">Khác</label>
                                </div>
                            </div>
                        </div>
                        <div className="mt-3">
                            <label className="font-medium">Học vị</label>
                            <select onChange={(e) => setSignUpInfo({...signUpInfo, academicTitle: e.target.value})} className="w-full rounded-md border border-bodydark px-2 py-1 focus:outline-primary-500 mt-1" required>
                                <option value={"ThS"}>Thạc sĩ</option>
                                <option value={"TS"}>Tiến sĩ</option>
                                <option value={"PGS"}>Phó giáo sư</option>
                                <option value={"GS"}>Giáo sư</option>
                            </select>
                        </div>
                        <div className="flex xsm:flex-row flex-col gap-3 w-full mt-3">
                            <div className="w-full"> 
                                <label className="font-medium">Họ</label>
                                <input onChange={(e) => setSignUpInfo({...signUpInfo, firstName: e.target.value})} className="w-full rounded-md border border-bodydark px-2 py-1 focus:outline-primary-500 mt-1" type="text" placeholder="Họ" required></input>
                            </div>
                            <div className="w-full">
                                <label className="font-medium">Tên</label>
                                <input onChange={(e) => setSignUpInfo({...signUpInfo, lastName: e.target.value})} className="w-full rounded-md border border-bodydark px-2 py-1 focus:outline-primary-500 mt-1" type="text" placeholder="Tên" required></input>
                            </div>
                        </div>
                    </div>
                    <div className="border border-bodydark1 rounded-md p-4 mt-7 relative">
                        <div className="absolute top-0 left-0 bg-bodydark1 p-1 rounded-br-md text-sm">Công việc</div>
                        <div className="mt-7">
                            <label className="font-medium">Tổ chức</label>
                            <input onChange={(e) => setSignUpInfo({...signUpInfo, organization: e.target.value})} className="w-full rounded-md border border-bodydark px-2 py-1 focus:outline-primary-500 mt-1" type="text" placeholder="Tổ chức" required></input>
                        </div>
                        <div className="mt-3">
                            <label className="font-medium">Phòng ban</label>
                            <input onChange={(e) => setSignUpInfo({...signUpInfo, department: e.target.value})} className="w-full rounded-md border border-bodydark px-2 py-1 focus:outline-primary-500 mt-1" type="text" placeholder="Phòng ban" required></input>
                        </div>
                        <div className="mt-3">
                            <label className="font-medium">Loại</label>
                            <select onChange={(e) => setSignUpInfo({...signUpInfo, type: e.target.value})} className="w-full rounded-md border border-bodydark px-2 py-1 focus:outline-primary-500 mt-1" required>
                                <option value={"congdong"}>Tổ chức cộng đồng</option>
                                <option value={"congty"}>Công ty</option>
                                <option value={"hocvien"}>Học viện</option>
                                <option value={"daihoc"}>Trường đại học</option>
                            </select>
                        </div>
                    </div>
                    <div className="border border-bodydark1 rounded-md p-4 mt-7 relative">
                        <div className="absolute top-0 left-0 bg-bodydark1 p-1 rounded-br-md text-sm">Mật khẩu</div>
                        <div className="mt-7">
                            <label className="font-medium">Mật khẩu</label>
                            <div className="relative">
                                <input onChange={(e) => setSignUpInfo({...signUpInfo, password: e.target.value})} className="w-full rounded-md border border-bodydark px-2 py-1 focus:outline-primary-500 mt-1" type={`${showingPassword ? "text" : "password"}`} placeholder="Mật khẩu" required></input>
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
                                <input onChange={(e) => setSignUpInfo({...signUpInfo, confirmPassword: e.target.value})} className="w-full rounded-md border border-bodydark px-2 py-1 focus:outline-primary-500 mt-1" type={`${showingConfirmPassword ? "text" : "password"}`} placeholder="Nhập lại mật khẩu" required></input>
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
                    </div>
                    <div className="mt-7">
                        <div>
                            <input ref={tcRef} id="tc" type="checkbox" className="" required />
                            <label htmlFor="tc" className="font-medium mx-5">Tôi đồng ý với các điều khoản và điều kiện *</label>
                        </div>
                        <div className="mt-4">
                            <input ref={ppRef} id="pp" type="checkbox" required />
                            <label htmlFor="pp" className="font-medium mx-5">Tôi đồng ý với chính sách bảo mật *</label>
                        </div>
                    </div>
                    <div>
                        <button onClick={handleSubmitSignUp} className="w-full bg-primary-500 font-bold text-white rounded-md py-2 mt-5 hover:bg-primary-600 duration-200">Đăng ký</button>
                    </div>
                </form>
                <div>
                    {
                        signUpSuccess && <div className="mt-5 text-center text-primary-600 font-bold">Đăng ký thành công! Chuyển đến trang đăng nhập sau {countDownRedirect}s</div>
                    }
                </div>
                <div className="mt-5 text-center">
                    <Link href={"/customer/login"} className="mt-5 font-medium hover:underline">Đã có tài khoản? Đăng nhập ngay</Link>
                </div>
            </div>
        </div>
    );
}

export default RegisterPage;