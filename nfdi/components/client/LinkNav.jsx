"use client"
import { ChevronDownIcon, HomeIcon } from "@heroicons/react/24/outline"
import { ChevronRightIcon } from "@heroicons/react/24/solid"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react"

const LinkNav = () => {
    const router = useRouter()
    const pathname = usePathname()

    const [pps, setPps] = useState([])
    const [ucs, setUcs] = useState([])
    const [aimsSubContent, setAimsSubContent] = useState([])
    useEffect(() => {
        const getPPs = async () => {
            const res = await fetch("/api/participant-project/max5")
            if (res.ok) {
                const data = await res.json()
                const child = data.map((item) => {
                    return {
                        name: item.code,
                        path: `/participant-projects/${item.code + "-" + item.title}`
                    }
                })
                if (data.length == 5) {
                    child.push({name: "Xem thêm...", path: "/participant-projects"})
                }
                setPps(child)
            }
        }
        const getUCs = async () => {
            const res = await fetch("/api/use-case/max5")
            if (res.ok) {
                const data = await res.json()
                const child = data.map((item) => {
                    return {
                        name: item.code,
                        path: `/infrastructure-use-cases/${item.code + "-" + item.title}`
                    }
                })
                if (data.length == 5) {
                    child.push({name: "Xem thêm...", path: "/infrastructure-use-cases"})
                }
                setUcs(child)
            }

        }

        const getAimsSubContent = async () => {
            const res = await fetch("/api/content/aims")
            if (res.ok) {
                const data = await res.json()
                const newDatas = data.aims.subContent.map(item => { 
                    return {
                            name: item.title,
                            path: `/introduce/aims/${item.slug}`,
                            eng: item.slug
                        }
                    })
                setAimsSubContent(newDatas)
            }
        }
        getAimsSubContent()
        getPPs()
        getUCs()
    }, [])

    const listLink = [
        {
            name: 'home',
            path: '/',
            child: [
                {name: 'Giới thiệu', path: '/introduce/about', eng: "introduce"},
                {name: 'Dự án', path: '/participant-projects', eng: "participant-projects"},
                {name: 'Sử dụng', path: '/infrastructure-use-cases', eng: "infrastructure-use-cases"},
                {name: 'Công cụ', path: '/tools', eng: "tools"},
                {name: 'Sự kiện', path: '/events', eng: "events"},
                {name: 'Bài giảng', path: '/teaching', eng: "teaching"},
                {name: 'Khác', path: '/links', eng: "more"},
            ]
        },
        {
            name: 'introduce',
            showName: 'Giới thiệu',
            path: '/introduce/about',
            child:  [
                {name: 'Mục tiêu', path: '/introduce/aims', eng: "aims"},
                {name: 'Tập đoàn', path: '/introduce/consortium', eng: "consortium"},
                {name: 'Nhiệm vụ', path: '/introduce/task-areas', eng: "task-areas"},
                {name: 'Đối tác', path: '/introduce/cooperation-partners', eng: "cooperation-partners"},
            ]
        },
        {
            name: 'participant-projects',
            showName: 'Dự án',
            path: '/participant-projects',
            child: [
                {name: 'Đề xuất dự án mới', 'path': '/participant-projects/new-participant-project', eng: "new-participant-project"},
                ...pps
            ]
        
        },
        {
            name: 'infrastructure-use-cases',
            path: '/infrastructure-use-cases',
            showName: 'Sử dụng',
            child: ucs
        },
        {
            name: 'more',
            path: '/more/links',
            showName: 'Khác',
            child: [
                {name: 'Links', path: '/more/links', eng: "links"},
                {name: 'Blog', path: '/more/blog', eng: "blog"},
                {name: 'Liên hệ', path: '/more/contact', eng: "contact"},
                {name: 'Tuyển dụng', path: '/more/open-position', eng: "open-position"},
            ]
        },
        {
            name: 'aims',
            path: '/introduce/aims',
            showName: 'Mục tiêu',
            child: [...aimsSubContent]
        }
    ]
    const vietnamese = [
        {eng: "aims", vie: "Mục tiêu"},
        {eng: "about", vie: "Vietnam Blockchain Zone"},
        {eng: "consortium", vie: "Tập đoàn"},
        {eng: "task-areas", vie: "Nhiệm vụ"},
        {eng: "cooperation-partners", vie: "Đối tác"},
        {eng: "new-participant-project", vie: "Đề xuất dự án mới"},
        {eng: "events", vie: "Sự kiện"},
        {eng: "teaching", vie: "Bài giảng"},
        {eng: "tools", vie: "Công cụ"},
        {eng: "contact", vie: "Liên hệ"},
        {eng: "open-position", vie: "Tuyển dụng"},
        {eng: "participant-projects", vie: "Toàn bộ dự án"},
        {eng: "infrastructure-use-cases", vie: "Toàn bộ trường hợp sử dụng cơ sở hạ tầng"},
    ]
    const [showingLink, setShowingLink] = useState([])
    const [last, setLast] = useState("")
    useEffect(() => {
        const path = pathname.split("/")
        setShowingLink(path)
        let result = vietnamese.find(v => v.eng === path[path.length - 1]);

        if (!result) {
            if (path.includes("participant-projects") || path.includes("infrastructure-use-cases")) {
                result = path[path.length - 1]
                .split("-")[0].toUpperCase()
            }
            else {
                result = path[path.length - 1]
                .split("-")
                .join(" ")
                .replace(/\b\w/g, c => c.toUpperCase());
            }
        }
        else {
            result = result.vie
        }
        setLast(result)
    }, [pathname])

    return (
        showingLink.length > 0 && <div className="flex gap-1 items-center">
            {listLink.map((item, index) => {
                if (showingLink.includes(item.name) || item.name == 'home') {
                    return (
                        <div className="flex items-center">
                            <div key={index} className="px-2 py-1 w-fit rounded-md border hover:bg-whiter border-whiten shadow-md text-body flex items-center gap-2 group cursor-pointer relative">
                                {
                                    item.name == 'home' ? (
                                        <HomeIcon onClick={() => router.push(item.path)}  className="h-4 w-4 group-hover:text-primary-500"/>
                                    ) : (
                                        <div onClick={() => router.push(item.path)}  className="text-black-2 text-sm font-semibold group-hover:text-primary-500">{item.showName}</div>
                                    )
                                }
                                {item.child.length > 0 && (
                                    <ChevronDownIcon onClick={() => router.push(item.path)} className="h-4 w-4 group-hover:text-primary-500"/>
                                )}
                                <div className="absolute left-0 top-4.5 flex flex-col z-10 mt-2 py-1 border border-whiten rounded-md shadow-lg bg-white min-w-50 invisible opacity-0 group-hover:visible group-hover:opacity-100 duration-200 transition ease-in-out">
                                    {item.child.map((link, index) => {
                                        return (
                                            <Link key={index} href={link.path} className={`text-sm px-2 py-1.5 hover:bg-whiter text-black-2 ${showingLink.includes(link.eng) ? "text-primary-500" : ""}`}>{link.name}</Link>
                                        )
                                    })}
                                </div>
                            </div>
                            <div>
                                <ChevronRightIcon className="h-3 w-3"/>
                            </div>
                        </div>
                    )
                }
            })}
            <div className="text-black-2 text-sm font-semibold">
                {last}
            </div>
        </div>
    )
}

export default LinkNav;