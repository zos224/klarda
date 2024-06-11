"use client"
import Image from "next/image"
import Link from "next/link"
import NavbarVertical from "./NavBarVertical"
import {Bars3Icon, BriefcaseIcon, BuildingOffice2Icon, CheckBadgeIcon, FolderIcon, InboxIcon, LinkIcon, RectangleStackIcon, CubeIcon, UserGroupIcon, NewspaperIcon} from '@heroicons/react/24/solid'
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { useSession } from "next-auth/react"
const Navbar = () => {
    const {data: session} = useSession()
    const [openNavVer, setOpenNavVer] = useState(false)
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
        logo != "" && <nav className="xl:w-4/5 mx-auto w-full py-7">
            <div className="flex justify-between px-3 items-center">
                <div className="xl:w-2/12">
                    <Link href={"/"}>
                        <Image className="w-15" src={logo} width={100} height={100}></Image>
                    </Link>
                </div>
                <div className="xl:w-8/12 xl:block hidden">
                    <ul className="flex w-full justify-around font-medium">
                        <li className="hover:text-primary-500 flex gap-3 pb-4 cursor-pointer relative group">
                            <Link className={`${path.split("/").includes("introduce") ? "text-primary-500" : ""}`} href="/introduce/about">Giới thiệu</Link>
                            <svg className={`w-3 ${path.split("/").includes("introduce") ? "text-primary-500" : ""}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill="currentColor" d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z"/></svg>
                            <div className="absolute opacity-0 translate-y-5 group-hover:opacity-100 group-hover:translate-y-0 invisible group-hover:visible top-1/2 left-1/2 -translate-x-1/2 shadow-xl min-w-100 rounded-md transition ease-in-out duration-500 z-10 bg-white">
                                <ul className="p-1">
                                    <li className="text-black px-5 py-3 hover:bg-whiten rounded-md">
                                        <div>
                                            <Link className="flex gap-5 items-center" href="/introduce/aims">
                                                <CheckBadgeIcon className="w-7 text-primary-500" />
                                                <div>
                                                    <div>Mục tiêu</div>
                                                    <div className="font-light text-sm">Mục tiêu của Vietnam Blockchain Zone</div>
                                                </div>
                                            </Link>
                                        </div>
                                    </li>
                                    <li className="text-black px-5 py-3 hover:bg-whiten rounded-md">
                                        <div>
                                            <Link className="flex gap-5 items-center"  href="/introduce/consortium">
                                                <UserGroupIcon className="w-7 text-primary-500" />
                                                <div>
                                                    <div>Tập đoàn</div>
                                                    <div className="font-light text-sm">Chúng tôi là ai</div>
                                                </div>
                                            </Link>
                                        </div>
                                    </li>
                                    <li className="text-black px-5 py-3 hover:bg-whiten rounded-md">
                                        <div>
                                            <Link className="flex gap-5 items-center" href="/introduce/task-areas">
                                                <RectangleStackIcon className="w-7 text-primary-500" />
                                                <div>
                                                    <div>Nhiệm vụ</div>
                                                    <div className="font-light text-sm">Lĩnh vực hoạt động của chúng tôi</div>
                                                </div>
                                            </Link>
                                        </div>
                                    </li>
                                    <li className="text-black px-5 py-3 hover:bg-whiten rounded-md">
                                        <div>
                                            <Link className="flex gap-5 items-center" href="/introduce/cooperation-partners">
                                                <BuildingOffice2Icon className="w-7 text-primary-500" />
                                                <div>
                                                    <div>Đối tác</div>
                                                    <div className="font-light text-sm">Các đối tác của chúng tôi</div>
                                                </div>
                                            </Link>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li className="hover:text-primary-500 flex gap-3 pb-4 cursor-pointer relative group">
                            <Link className={`${path.split("/").includes("participant-projects") ? "text-primary-500" : ""}`} href="/participant-projects">Participation</Link>
                            <svg className={`w-3 ${path.split("/").includes("participant-projects") ? "text-primary-500" : ""}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill="currentColor" d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z"/></svg>
                            <div className="absolute opacity-0 translate-y-5 group-hover:opacity-100 group-hover:translate-y-0 invisible group-hover:visible top-1/2 left-1/2 -translate-x-1/2 shadow-xl min-w-100 rounded-md transition ease-in-out duration-500 z-10 bg-white">
                                <ul className="p-1">
                                    <li className="text-black px-5 py-3 hover:bg-whiten rounded-md">
                                        <div>
                                            <Link className="flex gap-5 items-center" href="/participant-projects/new-participant-project">
                                                <CubeIcon className="w-7 text-primary-500" />
                                                <div>
                                                    Tạo mới dự án
                                                </div>
                                            </Link>
                                        </div>
                                    </li>
                                    {pps.map((pp, index) => (
                                        <li key={index} className="text-black px-5 py-3 hover:bg-whiten rounded-md">
                                            <div>
                                                <Link className="flex gap-5 items-center" href={"/participant-projects/" + pp.code.toLowerCase() + "-" + pp.slug} >
                                                    <CubeIcon className="w-7 text-primary-500" />
                                                    <div >
                                                        <div>{pp.code}</div>
                                                        <div className="font-light text-sm">{pp.title}</div>
                                                    </div>
                                                </Link>
                                            </div>
                                        </li>
                                    ))}
                                    {
                                        pps.length == 5 && (
                                            <li className="text-black px-5 py-3 hover:bg-whiten rounded-md">
                                                <div>
                                                    <Link className="flex gap-5 items-center" href="/participant-projects">
                                                        <CubeIcon className="w-7 text-primary-500" />
                                                        Xem thêm...
                                                    </Link>
                                                </div>
                                            </li>
                                        )
                                    }
                                </ul>
                            </div>
                        </li>
                        <li className="hover:text-primary-500 flex gap-3 cursor-pointer pb-4 relative group">
                            <Link className={`${path.split("/").includes("infrastructure-use-cases") ? "text-primary-500" : ""}`} href="/infrastructure-use-cases">Use Cases</Link>
                            <svg className={`w-3 ${path.split("/").includes("infrastructure-use-cases") ? "text-primary-500" : ""}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill="currentColor" d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z"/></svg>
                            <div className="absolute opacity-0 translate-y-5 group-hover:opacity-100 group-hover:translate-y-0 invisible group-hover:visible top-1/2 left-1/2 -translate-x-1/2 shadow-xl min-w-100 rounded-md transition ease-in-out duration-500 z-10 bg-white">
                                <ul className="p-1">
                                    {
                                        ucs.map((uc, index) => (
                                            <li key={index} className="text-black px-5 py-3 hover:bg-whiten rounded-md">
                                                <div>
                                                    <Link className="flex gap-5 items-center" href={"/infrastructure-use-cases/" + uc.code.toLowerCase() + "-" + uc.slug}>
                                                        <NewspaperIcon className="w-7 text-primary-500" />
                                                        <div>
                                                            <div>{uc.code}</div>
                                                            <div className="font-light text-sm">{uc.title}</div>
                                                        </div>
                                                    </Link>
                                                </div>
                                            </li>
                                        ))
                                    }
                                    {
                                        ucs.length == 5 && ( 
                                            <li className="text-black px-5 py-3 hover:bg-whiten rounded-md">
                                                <div>
                                                    <Link className="flex gap-5 items-center" href="/infrastructure-use-cases">
                                                    <NewspaperIcon className="w-7 text-primary-500" />
                                                        Xem thêm...
                                                    </Link>
                                                </div>
                                            </li>
                                        )
                                    }
                                    
                                </ul>
                            </div>
                        </li>
                        <li className="hover:text-primary-500 flex"><Link className={`${path.split("/").includes("tools") ? "text-primary-500" : ""}`} href="/tools">Tools</Link></li>
                        <li className="hover:text-primary-500 flex"><Link className={`${path.split("/").includes("events") ? "text-primary-500" : ""}`} href="/events">Events</Link></li>
                        <li className="hover:text-primary-500"><Link className={`${path.split("/").includes("teaching") ? "text-primary-500" : ""}`} href="/teaching">Teaching</Link></li>
                        <li className="hover:text-primary-500 flex gap-3 cursor-pointer pb-4 relative group">
                            <Link className={`${path.split("/").includes("more") ? "text-primary-500" : ""}`} href="/more/links">More</Link>
                            <svg className={`w-3 ${path.split("/").includes("more") ? "text-primary-500" : ""}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill="currentColor" d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z"/></svg>
                            <div className="absolute opacity-0 translate-y-5 group-hover:opacity-100 group-hover:translate-y-0 invisible group-hover:visible top-1/2 left-1/2 -translate-x-1/2 shadow-xl min-w-100 rounded-md transition ease-in-out duration-500 z-10 bg-white">
                                <ul className="p-1">
                                    <li className="text-black px-5 py-3 hover:bg-whiten rounded-md">
                                        <div>
                                            <Link className="flex gap-5 items-center" href="/more/links">
                                                <LinkIcon className="w-7 text-primary-500" />
                                                <div>
                                                    <div>Links</div>
                                                </div>
                                            </Link>
                                        </div>
                                    </li>
                                    <li className="text-black px-5 py-3 hover:bg-whiten rounded-md">
                                        <div>
                                            <Link className="flex gap-5 items-center" href="/more/blog">
                                                <FolderIcon className="w-7 text-primary-500" />
                                                <div >
                                                    <div>Blog</div>
                                                    <div className="font-light text-sm">Tin tức mới</div>
                                                </div>
                                            </Link>
                                        </div>
                                    </li>
                                    <li className="text-black px-5 py-3 hover:bg-whiten rounded-md">
                                        <div>
                                            <Link className="flex gap-5 items-center" href="/more/contact">
                                                <InboxIcon className="w-7 text-primary-500" />
                                                <div >
                                                    <div>Liên hệ</div>
                                                    <div className="font-light text-sm">Trao đổi với chúng tôi</div>
                                                </div>
                                            </Link>
                                        </div>
                                    </li>
                                    <li className="text-black px-5 py-3 hover:bg-whiten rounded-md">
                                        <div>
                                            <Link className="flex gap-5 items-center" href="/more/open-position">
                                                <BriefcaseIcon className="w-7 text-primary-500" />
                                                <div >
                                                    <div>Tuyển dụng</div>
                                                    <div className="font-light text-sm">Việc làm sẵn có</div>
                                                </div>
                                            </Link>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className="xl:w-2/12 xl:block hidden">
                    {session?.user ? (
                        <div className="xl:text-end">
                            <button className="rounded-full" href="/customer/login">
                                <Link href="/customer/home/account">   
                                    <Image className="w-8" width={100} height={100} src={session.user.avatar ? session.user.avatar : "/assets/avatar.svg"} />
                                </Link>
                            </button>
                        </div>
                    ) : (
                        <div className="xl:text-end">
                            <button className="bg-primary-500 p-2 rounded-md" href="/customer/login">
                                <Link href="/customer/login">   
                                    <svg className="w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="#ffffff" d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464H398.7c-8.9-63.3-63.3-112-129-112H178.3c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3z"/></svg>
                                </Link>
                            </button>
                        </div>
                    )}
                </div>
                <div onClick={() => {setOpenNavVer(true)}} className="hover:bg-bodydark1 rounded-md p-1 flex items-center xl:hidden">
                    <Bars3Icon className="w-7 cursor-pointer" />
                </div>
            </div>
            <NavbarVertical open={openNavVer} onClose={() => {setOpenNavVer(false)}}/>
        </nav>
    )
}

export default Navbar