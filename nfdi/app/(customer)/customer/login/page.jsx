"use client"
import { ArrowRightEndOnRectangleIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";
import { signIn} from "next-auth/react"
import { useState } from "react";
const CustomerLoginPage = () => {
    const [loginInfo, setLoginInfo] = useState({email: "", password: "", remember: false})
    const [errorAlert, setErrorAlert] = useState("")
    const handleSubmitLogin = async (e) => {
        e.preventDefault();
        const response = await signIn('credentials', {
            redirect: false,
            email: loginInfo.email,
            password: loginInfo.password
        })
        if (response?.error === "CredentialsSignin") {
            setErrorAlert("Thông tin đăng nhập không chính xác! Vui lòng thử lại!")
        }
        else {
            setErrorAlert("")
            window.location.href = "/customer/home/account"
        }
    }

    return  (
        <div className="bg_login">
            <div className="md:pt-40 pt-10">
                <div className="bg-white p-10 w-fit md:min-w-125 mx-auto rounded-md shadow-lg text-center">
                    <Image className="w-15 h-15 object-contain mx-auto" src="/assets/logo.png" width={200} height={200} alt="logo" />
                    <div className="mt-5 text-xl">Đăng nhập</div>
                    <div className="mt-5">
                        <form className="flex flex-col">
                            <input onChange={(e) => setLoginInfo({...loginInfo, email: e.target.value})} className="px-3 py-2 border-t-2 border-l-2 border-r-2 border-b border-bodydark1 rounded-t-md outline-none focus:border-b-2 focus:border-primary-600" type="email" placeholder="Email"></input>
                            <input onChange={(e) => setLoginInfo({...loginInfo, password: e.target.value})} className="px-3 py-2 border-t border-l-2 border-r-2 border-b-2 border-bodydark1 rounded-b-md outline-none focus:border-t-2 focus:border-primary-600" type="password" placeholder="Mật khẩu"></input>
                            <div className="mt-5 text-start">
                                <input type="checkbox"  id="remember"></input>
                                <label className="ms-3">Ghi nhớ đăng nhập</label>
                            </div>
                            <div className="mt-5">
                                <button onClick={handleSubmitLogin} className="w-full flex gap-2 items-center justify-center py-2 rounded-md bg-primary-500 hover:bg-primary-600 hover:scale-105 duration-200 transition text-white font-semibold">
                                    Đăng nhập
                                    <ArrowRightEndOnRectangleIcon className="h-5 w-5"/>
                                </button>
                            </div>
                        </form>
                        {
                            errorAlert != "" && <div className="mt-5 text-red">{errorAlert}</div>
                        }
                        <div className="mt-5">
                            <Link href={"/customer/forgot-password"} className="font-medium">Quên mật khẩu?</Link>
                        </div>
                        <div className="mt-5">
                            <Link className="flex items-center gap-2 font-semibold text-primary-600 border-2 border-primary-600 rounded-md w-fit mx-auto px-4 py-2 hover:scale-105 duration-200 transition" href={"/customer/register"}>
                                Tạo tài khoản
                                <UserPlusIcon className="h-5 w-5"/>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CustomerLoginPage;
