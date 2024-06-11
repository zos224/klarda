"use client"
import Blog from "@/components/client/Blog";
import Event from "@/components/client/Event";
import { BookOpenIcon, CheckBadgeIcon, GlobeAltIcon, UserGroupIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import "@/styles/ck.css"
const RootPage = () => {
    const [blogs, setBlogs] = useState([])
    const [events, setEvents] = useState([])
    const [content, setContent] = useState(null)
    useEffect(() => {
        fetch("/api/blog/new4")
            .then(res => res.json())
            .then(data => setBlogs(data))
        fetch("/api/event/upcoming")
            .then(res => res.json())
            .then(data => setEvents(data))
        fetch("/api/content/home")
            .then(res => res.json())
            .then(data => setContent(data.home))
        
    }, [])
    const [showEvents, setShowEvents] = useState([])
    const [types, setTypes] = useState([])
    const [topics, setTopics] = useState([])
    useEffect(() => {
        const setType = new Set(events.map(event => event.eventType.name));
        const types = Array.from(setType);
        setTypes(types);
        const setTopic = new Set(events.flatMap(event => event.eEventTopics.map(topic => topic.eventTopic.name)));
        const topics = Array.from(setTopic);
        setTopics(topics);
        setShowEvents(events);
    }, [events])
    
    const filterType = (type) => {
        if (type == "-") {
            setShowEvents(events);
        } else {
            setShowEvents(events.filter(event => event.eventType.name == type));
        }
    }

    const filterTopic = (topic) => {
        if (topic == "-") {
            setShowEvents(events);
        } else {
            setShowEvents(events.filter(event => event.eEventTopics.map(eEventTopic => eEventTopic.eventTopic.name).includes(topic)));
        }
    }
    return (
        content && <div className="mx-auto">
            <div className="md:flex items-center shadow-md border-4 border-primary-200 gap-10">
                <Image className="md:w-1/2 w-full aspect-4/3 object-cover" src={content.image} width={1200} height={800}></Image>
                <div className="lg:w-1/3 py-10 md:py-5 px-10 md:px-0">
                    <div className="prose ck-content remove-bold-color" style={{ maxWidth: "none" }} dangerouslySetInnerHTML={{ __html: content.content }}>

                    </div>
                    <div className="md:flex gap-5 mt-10">
                        <div className="hover:scale-105 duration-100 w-full">
                            <Link className="block w-full text-center px-3 py-2 border border-primary-500 rounded-md font-semibold text-primary-500" href="/introduce/about">
                                Tìm hiểu thêm
                            </Link>
                        </div>
                        <div className="mt-10 md:mt-0 hover:scale-105 duration-100 w-full">
                            <Link className="block w-full text-center px-3 py-2 border border-primary-500 rounded-md font-semibold text-primary-500" href="/participant-projects/new-participant-project">
                                Tạo mới dự án
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className=" mt-15">
                <div className="font-extrabold text-4xl ">Tin tức mới</div>
                <div className="my-10 grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-10">
                    {blogs.map((blog, index) => (
                        <Blog key={index} blog={blog} numLine={2}></Blog>   
                    ))}
                </div>
                <div>
                    <Link href="/more/blog" className="bg-primary-500 px-4 py-2 cursor-pointer rounded-md text-white font-semibold text-sm mt-10">Tin tức mới</Link>
                </div>
            </div>
            <div className="mt-15">
                <div className="font-extrabold text-4xl">Lịch</div>
                <div className="mt-10 flex gap-10">
                    <div className="w-full">
                        <label>Loại sự kiện</label>
                        <select onChange={(e) => filterType(e.target.value)} className="mt-1 w-full border px-3 py-1 rounded-md border-bodydark focus:border-primary-600 focus:border-2 outline-none ">
                            <option value={"-"}>Tất cả sự kiện</option>
                            {types.map((type, index) => (
                                <option value={type} key={index}>{type}</option>
                            ))}
                        </select>
                    </div>
                    <div className="w-full">
                        <label>Chủ đề</label>
                        <select onChange={(e) => filterTopic(e.target.value)} className="mt-1 w-full border px-3 py-1 rounded-md border-bodydark focus:border-primary-600 focus:border-2 outline-none ">
                            <option value={"-"}>Tất cả chủ đề</option>
                            {topics.map((topic, index) => (
                                <option value={topic} key={index}>{topic}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="mt-10 grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-10">
                    {showEvents.map((event, index) => (
                        <Event key={index} event={event}></Event>
                    ))}
                </div>
            </div>
            <div className=" mt-15">
                <div className="font-extrabold text-4xl">Những thứ bạn cần biết về Vietnam Blockchain Zone</div>
                <div className="mt-10 grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-10">
                    <Link href={"/introduce/aims"} className="relative hover:scale-105 duration-200 flex flex-col">
                        <div className="absolute p-2 bg-primary-500 rounded-md left-1/2 -translate-x-1/2">
                            <CheckBadgeIcon className="w-9 text-white" />
                        </div>
                        <div className="flex-grow">
                            <div className="bg-whiten mt-5 pt-14 text-center px-4 rounded-md pb-2 h-full">
                                <div className="font-bold text-lg">{content.aims.title}</div>
                                <div className="mt-3">{content.aims.description}</div>
                            </div>
                        </div>
                    </Link>
                    <Link href={"/introduce/consortium"} className="relative hover:scale-105 duration-200 flex flex-col">
                        <div className="absolute p-2 bg-primary-500 rounded-md left-1/2 -translate-x-1/2">
                            <UserGroupIcon className="w-9 text-white" />
                        </div>
                        <div className="flex-grow">
                            <div className="bg-whiten mt-5 pt-14 text-center px-4 rounded-md pb-2 h-full">
                                <div className="font-bold text-lg">{content.consortium.title}</div>
                                <div className="mt-3">{content.consortium.description}</div>
                            </div>
                        </div>
                    </Link>
                    <Link href={"/participant-projects"} className="relative hover:scale-105 duration-200 flex flex-col">
                        <div className="absolute p-2 bg-primary-500 rounded-md left-1/2 -translate-x-1/2">
                            <GlobeAltIcon className="w-9 text-white" />
                        </div>
                        <div className="flex-grow">
                            <div className="bg-whiten mt-5 pt-14 text-center px-4 rounded-md pb-2 h-full">
                                <div className="font-bold text-lg">{content.pp.title}</div>
                                <div className="mt-3">{content.pp.description}</div>
                            </div>
                        </div>
                    </Link>
                    <Link href={"/infrastructure-use-cases"} className="relative hover:scale-105 duration-200 flex flex-col">
                        <div className="absolute p-2 bg-primary-500 rounded-md left-1/2 -translate-x-1/2">
                            <BookOpenIcon className="w-9 text-white" />
                        </div>
                        <div className="flex-grow">
                            <div className="bg-whiten mt-5 pt-14 text-center px-4 rounded-md pb-2 h-full">
                                <div className="font-bold text-lg">{content.uc.title}</div>
                                <div className="mt-3">{content.uc.description}</div>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
            <div className=" mt-15">
                <div className="font-extrabold text-4xl">Sự kiện sắp diễn ra</div>
                <div className="mt-10 grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-10">
                    {showEvents.map((event, index) => (
                        <Event key={index} event={event}></Event>
                    ))
                    }
                </div>
            </div>
        </div>
    );
    
}

export default RootPage;