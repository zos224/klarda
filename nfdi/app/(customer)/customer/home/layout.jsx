"use client"
import { ArrowRightEndOnRectangleIcon, Bars3CenterLeftIcon, DocumentTextIcon, HomeIcon, UserGroupIcon, XMarkIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { signOut } from "next-auth/react";
const HomeCustomer = ({children}) => {
    const path = usePathname()
    const [showSideBar, setShowSideBar] = useState(true)
    useEffect(() => {
        const handleResize = () => {
            setShowSideBar(window.innerWidth >= 768);
        };
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
    }, []); 
    const [logo, setLogo] = useState(null)
    useEffect(() => {
        fetch("/api/setting")
            .then(res => res.json())
            .then(data => setLogo(data.logo))
    }, [])
    return (
        <div className="flex md:flex-row flex-col min-h-screen">
            { showSideBar && 
            <div className="z-40 max-w-70 border-r border-bodydark relative min-h-screen pt-4">
                <div className="md:mx-10 mx-2 mb-5 flex justify-between items-center">
                    <Link href={"/"}>
                        <Image className="w-15 h-15 object-contain " src={logo ? logo : ""} width={200} height={200} alt="logo" />
                    </Link>
                    <XMarkIcon onClick={() => setShowSideBar(false)} className="block md:hidden h-8 w-8 cursor-pointer" />
                </div>
                <Link className="" href={"/customer/home/account"}>
                    <div className={`flex gap-4 items-center px-10 py-2 ${path.split("/").pop() == "account" ? "font-semibold border-l-8 border-primary-600 text-primary-600" : "hover:bg-bodydark1"}`}>
                        <HomeIcon className="h-5 w-5"/>
                        Tài khoản
                    </div>
                </Link>
                <Link href={"/customer/home/eventParticipations"}>
                    <div className={`flex gap-4 items-center px-10 py-2 ${path.split("/").pop() == "eventParticipations" ? "font-semibold border-l-8 border-primary-600 text-primary-600" : "hover:bg-bodydark1"}`}>
                        <UserGroupIcon className="h-5 w-5"/>
                        Sự kiện đã tham gia
                    </div>
                </Link>
                <Link href={"/customer/home/eventContributions"}>
                    <div className={`flex gap-4 items-center px-10 py-2 ${path.split("/").pop() == "eventContributions" ? "font-semibold border-l-8 border-primary-600 text-primary-600" : "hover:bg-bodydark1"}`}>
                        <DocumentTextIcon className="h-5 w-5"/>
                        Đóng góp sự kiện
                    </div>
                </Link>
                <div onClick={() => signOut()} className="flex gap-4 items-center px-10 py-2 cursor-pointer hover:bg-bodydark1 absolute bottom-1 w-full">
                    <ArrowRightEndOnRectangleIcon className="h-5 w-5"/>
                    Đăng xuất
                </div>
                {/* <Link href={"/customer/home/account"}>
                    <div className={`flex gap-4 ${path.split("/").pop() == "account" ? "font-semibold border-l-8 border-primary-600" : ""}`}>
                        <HomeIcon className="h-5 w-5"/>
                        Tài khoản
                    </div>
                </Link> */}
            </div>
            }             
            {
                !showSideBar && <div onClick={() => setShowSideBar(true)} className="md:hidden p-2 border-b border-bodydark">
                    <Bars3CenterLeftIcon className="h-8 w-8 cursor-pointer" />
                </div>
            }
            <div className="w-full">
                {children}
            </div>
        </div>
    );
}   

export default HomeCustomer;