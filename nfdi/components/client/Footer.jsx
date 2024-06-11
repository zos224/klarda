"use client"
import { EnvelopeIcon, PhoneIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
const Footer = () => {
    const [pps, setPps] = useState([])
    const [ucs, setUcs] = useState([])
    const [setting, setSetting] = useState(null)
    useEffect(() => {
        const getPPs = async () => {
            const res = await fetch("/api/participant-project/max5")
            if (res.ok) {
                const data = await res.json()
                setPps(data)
            }
        }
        const getUCs = async () => {
            const res = await fetch("/api/use-case/max5")
            if (res.ok) {
                const data = await res.json()
                setUcs(data)
            }
        }
        const getSetting = async () => {
            const res = await fetch("/api/setting")
            if (res.ok) {
                const data = await res.json()
                setSetting(data)
            }
        }
        getPPs()
        getUCs()
        getSetting()
    }, [])

    const [mail, setMail] = useState("")
    const [alert, setAlert] = useState(null)
    const register = async () => {
        const res = await fetch("/api/newletter/register", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: mail })
        })
        if (res.ok) {
            setAlert(true)
        }
        else {
            setAlert(false)
        }
    }

    return (
        setting && <footer className="mt-50">
            <div className="w-full text-white py-2 bg-primary-600 text-center px-5"> 
                <span className="font-semibold text-lg">Vietnam Blockchain Zone là dự án nhận Grant từ Klarda Foundation</span>
            </div>
            <div className="md:flex lg:px-50 md:px-20 px-4 mt-20 justify-between w-full">
                <div className="w-full">
                    <Image className="w-20" src={setting.logo} width={200} height={50} alt="logo" />
                    <div className="flex items-center mt-4">
                        <EnvelopeIcon className="h-5 w-5 inline-block" />
                        <span className="ml-2">{setting.email}</span>
                    </div>
                    <div className="flex items-center mt-2">
                        <PhoneIcon className="h-5 w-5 inline-block" />
                        <span className="ml-2">{setting.phone}</span>
                    </div>
                </div>
                <div className="w-full mt-5 md:mt-0 lg:flex lg:justify-end ">
                    <div className="max-w-md w-full">
                        <div className="font-extrabold text-xl">Đăng ký nhận tin tức mới</div>
                        <div className="mt-2">Nhận thông tin mới nhất từ chúng tôi</div>
                        <div className="md:flex gap-8 mt-5">
                            <input onChange={(e) => setMail(e.target.value)} type="text" className="border border-bodydark md:w-4/6 w-full rounded-md px-2 py-3 focus:border-primary-500 outline-none focus:border-2" placeholder="Nhập email của bạn"></input>
                            <button onClick={register} className="bg-primary-500 hover:bg-primary-600 font-semibold md:w-2/6 w-full mt-3 md:mt-0 text-white rounded-md px-2 py-3">Đăng ký</button>
                        </div>
                        <div className={`text mt-2 ${alert == false ? "text-red" : ""}`}>
                            {
                                alert == false ? "Đăng ký thất bại!" : alert == true ? "Đăng ký thành công!" : ""
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div className="md:flex justify-between lg:px-50 md:px-20 px-4 mt-15 pb-10">
                <div className="flex flex-col gap-3">
                    <Link href={"/introduce/about"} className="font-semibold uppercase text-sm">Giới thiệu</Link>
                    <Link href={"/introduce/aims"} className="text-sm">Mục tiêu</Link>
                    <Link href={"/introduce/consortium"} className="text-sm">Tập đoàn</Link>
                    <Link href={"/introduce/task-areas"} className="text-sm">Nhiệm vụ</Link>
                    <Link href={"/introduce/cooperation-partners"} className="text-sm">Đối tác</Link>
                </div>
                <div className="flex flex-col gap-3 md:mt-0 mt-7">
                    <Link href={"/participant-projects"} className="font-semibold uppercase text-sm">Dự án</Link>
                    {pps.map((pp, index) => (
                        <Link key={index} href={`/participant-projects/${pp.code + "-" + pp.slug}`} className="text-sm">{pp.code}</Link>
                    ))}
                    {
                        pps.length == 5 && <Link href={"/participant-projects"} className="text-sm">Xem thêm...</Link>
                    }
                </div>
                <div className="flex flex-col gap-3 md:mt-0 mt-7">
                    <Link href={"/infrastructure-use-cases"} className="font-semibold uppercase text-sm">Sử dụng</Link>
                    {
                        ucs.map((uc, index) => (
                            <Link key={index} href={`/infrastructure-use-cases/${uc.code + "-" + uc.slug}`} className="text-sm">{uc.code}</Link>
                        ))
                    }
                    {
                        ucs.length == 5 && <Link href={"/infrastructure-use-cases"} className="text-sm">Xem thêm...</Link>
                    }
                </div>
                <div className="md:mt-0 mt-7">
                    <Link href={"/tools"} className="font-semibold uppercase text-sm ">Công cụ</Link>
                </div>
                <div className="md:mt-0 mt-7">
                    <Link href={"/events"} className="font-semibold uppercase text-sm">Sự kiện</Link>
                </div>
                <div className="md:mt-0 mt-7">
                    <Link href={"/teaching"} className="font-semibold uppercase text-sm">Bài giảng</Link>
                </div>
                <div className="flex flex-col gap-3 md:mt-0 mt-7 ">
                    <Link href={"/more/links"} className="font-semibold uppercase text-sm">Khác</Link>
                    <Link href={"/more/links"} className="text-sm">Links</Link>
                    <Link href={"/more/blog"} className="text-sm">Blog</Link>
                    <Link href={"/more/contact"} className="text-sm">Liên hệ</Link>
                    <Link href={"/more/open-position"} className="text-sm">Tuyển dụng</Link>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
