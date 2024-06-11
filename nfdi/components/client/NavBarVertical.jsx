"use client"
import Link from "next/link";
import Image from "next/image";
import { BriefcaseIcon, BuildingOffice2Icon, CheckBadgeIcon, NewspaperIcon, CubeIcon, FolderIcon, InboxIcon, LinkIcon, RectangleStackIcon, ShareIcon, UserGroupIcon } from "@heroicons/react/24/outline";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
const NavbarVertical = ({open, onClose}) => {
    const {data: session} = useSession()
    const navClass = open
        ? "fixed top-0 left-0 w-full z-999 bg-white max-h-screen overflow-auto py-10 scale-100 opacity-100 duration-200 ease-out origin-top-right transition transform"
        : "fixed top-0 left-0 w-full z-999 bg-white max-h-screen overflow-auto py-10 scale-0 opacity-0 duration-200 ease-out origin-top-right transition transform";
    const path = usePathname()
    const [pps, setPps] = useState([])
    const [ucs, setUcs] = useState([])
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
        getPPs()
        getUCs()
    }, [])
    const [logo, setLogo] = useState("");
    useEffect(() => {
        const fetchLogo = async () => {
          const response = await fetch("/api/setting");
          if (response.ok) {
            const data = await response.json();
            setLogo(data.logo);
          }
        };
        fetchLogo();
      }, []);
    return (
        <nav className={navClass}>
            <div className="">
                <div className="xsm:px-3 px-2 flex justify-between">
                    <Link onClick={onClose} href={"/"}>
                        <Image className="w-15 cursor-pointer" src={logo} width={100} height={100}></Image>
                    </Link>
                    <div onClick={onClose} className="hover:bg-bodydark1 rounded-md p-1 flex items-center">
                        <XMarkIcon className="w-7 cursor-pointer" />
                    </div>
                </div>
                <div className="flex flex-col w-full justify-around mt-7">
                    <div className="xsm:px-3 px-2 cursor-pointer">
                        <Link onClick={onClose} className={`${path.split("/").includes("introduce") ? "text-primary-500" : ""} font-medium text-lg tracking-wider underline underline-offset-4 decoration-4 decoration-primary-500 hover:decoration-primary-400  `} href="/introduce/about">Giới thiệu</Link>
                        <div className="mx-5">
                            <div className="p-1">
                                <div className="text-black">
                                    <div>
                                        <Link onClick={onClose} className="flex gap-5 items-center py-1 group" href="/introduce/aims">
                                           <CheckBadgeIcon className="w-5 h-5 group-hover:text-primary-500" />
                                            <div className="group-hover:text-primary-500">
                                                <div>Mục tiêu</div>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                                <div className="text-black">
                                    <div>
                                        <Link onClick={onClose} className="flex gap-5 items-center py-1 group"  href="/introduce/consortium">
                                            <UserGroupIcon className="w-5 h-5 group-hover:text-primary-500" />
                                            <div className="group-hover:text-primary-500">
                                                <div>Tập đoàn</div>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                                <div className="text-black">
                                    <div>
                                        <Link onClick={onClose} className="flex gap-5 items-center py-1 group" href="/introduce/task-areas">
                                            <RectangleStackIcon className="w-5 h-5 group-hover:text-primary-500" />
                                            <div className="group-hover:text-primary-500">
                                                <div>Nhiệm vụ</div>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                                <div className="text-black">
                                    <div>
                                        <Link onClick={onClose} className="flex gap-5 items-center py-1 group " href="/introduce/cooperation-partners">
                                            <BuildingOffice2Icon  className="w-5 h-5 group-hover:text-primary-500"/>
                                            <div className="group-hover:text-primary-500">
                                                <div>Đối tác</div>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="xsm:px-3 px-2 mt-5 cursor-pointer">
                        <Link onClick={onClose} className={`${path.split("/").includes("participant-projects") ? "text-primary-500" : ""} font-medium text-lg tracking-wider underline underline-offset-4 decoration-4 decoration-primary-500 hover:decoration-primary-400`} href="/participant-projects">Participation</Link>
                        <div className="mx-5">
                            <div className="p-1">
                                <div className="text-black">
                                    <div>
                                        <Link onClick={onClose} className="flex gap-5 items-center py-1 group" href="/participant-projects/new-participant-project">
                                            <CubeIcon className="w-5 h-5 group-hover:text-primary-500" />
                                            <div className="group-hover:text-primary-500">
                                                Tạo mới dự án
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                                {
                                    pps.map((pp, index) => (
                                        <div className="text-black" key={index}>
                                            <div>
                                                <Link onClick={onClose} className="flex gap-5 items-center py-1 group" href={`/participant-projects/${pp.code.toLowerCase() + "-" + pp.slug}`}>
                                                    <CubeIcon className="w-5 h-5 group-hover:text-primary-500" />
                                                    <div className="group-hover:text-primary-500">
                                                        <div>{pp.code}</div>
                                                    </div>
                                                </Link>
                                            </div>
                                        </div>
                                    ))
                                }
                                {
                                    pps.length == 5 && (
                                        <div className="text-black">
                                            <div>
                                                <Link onClick={onClose} className="flex gap-5 items-center py-1 hover:text-primary-500" href="/participant-projects">
                                                    <ShareIcon className="w-5 h-5 group-hover:text-primary-500" />
                                                    Xem thêm...
                                                </Link>
                                            </div>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                    <div className="xsm:px-3 px-2 mt-5 cursor-pointer">
                        <Link onClick={onClose} className={`${path.split("/").includes("infrastructure-use-cases") ? "text-primary-500" : ""} font-medium text-lg tracking-wider underline underline-offset-4 decoration-4 decoration-primary-500 hover:decoration-primary-400`} href="/infrastructure-use-cases">Use Cases</Link>
                        <div className="mx-5">
                            <div className="p-1">
                                {
                                    ucs.map((uc, index) => (
                                        <div className="text-black" key={index}>
                                            <div>
                                                <Link onClick={onClose} className="flex gap-5 items-center py-1 group" href={`/infrastructure-use-cases/${uc.code.toLowerCase() + "-" + uc.slug}`}>
                                                    <NewspaperIcon className="w-5 h-5 group-hover:text-primary-500" />
                                                    <div className="group-hover:text-primary-500">
                                                        <div>{uc.code}</div>
                                                    </div>
                                                </Link>
                                            </div>
                                        </div>
                                    ))
                                }
                                {
                                    ucs.length == 5 && (
                                        <div className="text-black">
                                            <div>
                                                <Link onClick={onClose} className="flex gap-5 items-center py-1 group group-hover:text-primary-500" href="/infrastructure-use-cases">
                                                    <NewspaperIcon className="w-5 h-5 group-hover:text-primary-500" />
                                                    Xem thêm...
                                                </Link>
                                            </div>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                    <div className="xsm:px-3 px-2 mt-5 font-medium text-lg tracking-wider underline underline-offset-4 decoration-4 decoration-primary-500 hover:decoration-primary-400"><Link onClick={onClose} className={`${path.split("/").includes("tools") ? "text-primary-500" : ""}`} href="/tools">Tools</Link></div>
                    <div className="xsm:px-3 px-2 mt-5 font-medium text-lg tracking-wider underline underline-offset-4 decoration-4 decoration-primary-500 hover:decoration-primary-400"><Link onClick={onClose} className={`${path.split("/").includes("events") ? "text-primary-500" : ""}`} href="/events">Events</Link></div>
                    <div className="xsm:px-3 px-2 mt-5 font-medium text-lg tracking-wider underline underline-offset-4 decoration-4 decoration-primary-500 hover:decoration-primary-400"><Link onClick={onClose} className={`${path.split("/").includes("teaching") ? "text-primary-500" : ""}`} href="/teaching">Teaching</Link></div>
                    <div className="xsm:px-3 px-2 mt-5 cursor-pointer">
                        <Link onClick={onClose} className={`${path.split("/").includes("more")} font-medium text-lg tracking-wider underline underline-offset-4 decoration-4 decoration-primary-500 hover:decoration-primary-400`} href="/more/links">More</Link>
                        <div className="mx-5">
                            <div className="p-1">
                                <div className="text-black">
                                    <div>
                                        <Link onClick={onClose} className="flex gap-5 items-center py-1 group" href="/more/links">
                                            <LinkIcon className="w-5 h-5 group-hover:text-primary-500" />
                                            <div className="group-hover:text-primary-500">
                                                <div>Links</div>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                                <div className="text-black">
                                    <div>
                                        <Link onClick={onClose} className="flex gap-5 items-center py-1 group" href="/more/blog">
                                            <FolderIcon className="w-5 h-5 group-hover:text-primary-500" />
                                            <div className="group-hover:text-primary-500">
                                                <div>Blog</div>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                                <div className="text-black">
                                    <div>
                                        <Link onClick={onClose} className="flex gap-5 items-center py-1 group" href="/more/contact">
                                            <InboxIcon className="w-5 h-5 group-hover:text-primary-500" />
                                            <div className="group-hover:text-primary-500">
                                                <div>Liên hệ</div>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                                <div className="text-black">
                                    <div>
                                        <Link onClick={onClose} className="flex gap-5 items-center py-1 group" href="/more/open-position">
                                            <BriefcaseIcon className="w-5 h-5 group-hover:text-primary-500" />
                                            <div className="group-hover:text-primary-500">
                                                <div>Tuyển dụng</div>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full mt-5 xsm:px-3 px-2">
                        {session?.user ? (
                             <Link className="w-full block text-center rounded-md text-primary-500 border font-semibold border-primary-500 py-2 hover:text-white hover:bg-primary-500 duration-200" href="/customer/home/account">Trang cá nhân</Link>
                        ) : (
                            <Link className="w-full block text-center rounded-md text-primary-500 border font-semibold border-primary-500 py-2 hover:text-white hover:bg-primary-500 duration-200" href="/customer/login">Đăng nhập</Link>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default NavbarVertical;