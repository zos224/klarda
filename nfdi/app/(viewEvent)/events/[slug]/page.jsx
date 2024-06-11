"use client"
import { MapPinIcon, LanguageIcon, CalendarDaysIcon, EnvelopeIcon, PhoneIcon, UserGroupIcon, ClockIcon } from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";
import 'animate.css'
import Member from "@/components/client/Member";
import { useParams } from "next/navigation";
import moment from "moment-timezone";
import Image from "next/image";
import { useSession } from "next-auth/react";
import Link from "next/link";
import "@/styles/ck.css"
const ViewEventPage = () => {
    const [event, setEvent] = useState(null);
    const params = useParams()
    const [loading, setLoading] = useState(true)
    const {data: session} = useSession()
    const [checkJoied, setCheckJoined] = useState("")
    const [countJoined, setCountJoined] = useState(0)
    const [contactInfo, setContactInfo] = useState(null)
    useEffect(() => {
        const fetchEvent = async () => {
            const res = await fetch(`/api/event/` + params.slug);
            const data = await res.json();
            setEvent(data);
        }

        const fetchContact = async () => {
            const res = await fetch("/api/setting");
            const data = await res.json();
            if (data) {
                setContactInfo(data)
            }
        }
        fetchContact()
        fetchEvent();
    }, [params])

    const [sortPrograms, setSortPrograms] = useState([])
    
    useEffect(() => {
        const fetchManyJoined = async () => {
            const res = await fetch("/api/user-event/" + event.id + "?type=event")
            if (res.ok) {
                const data = res.json()
                setCountJoined(data)
                return data
            }
        }
        if (event) {
            const listPrograms = []
            const currentDate = new Date(event.startDateTime)   
            while (currentDate <= new Date(event.endDateTime)) {
                const entry = {
                    date: moment.tz(currentDate, 'Asia/Ho_Chi_Minh').format('DD/MM/YYYY'),
                    programs: []
                }
                listPrograms.push(entry)
                currentDate.setDate(currentDate.getDate() + 1);
            }
            event.programs.map((program) => {
                const index = listPrograms.findIndex((entry) => entry.date == moment.tz(program.date, 'Asia/Ho_Chi_Minh').format('DD/MM/YYYY'))
                if (index != -1) {
                    listPrograms[index].programs.push(program)
                }
                })
            listPrograms.forEach((date) => date.programs.sort((a, b) => a.time - b.time))
            setSortPrograms(listPrograms)
            setLoading(false)

            const count = fetchManyJoined()
            if (count >= event.max) {
                setCheckJoined("Không thể đăng ký!")
                return
            }
            const currentDate1 = new Date()
            const eventStartDate = new Date(event.startDateTime)
            const THREE_DAYS_IN_MS = 3 * 24 * 60 * 60 * 1000;

            const eventStartDatePlusThreeDays = new Date(eventStartDate.getTime() - THREE_DAYS_IN_MS);

            if (currentDate1 > eventStartDatePlusThreeDays) {
                setCheckJoined("Không thể đăng ký!");
                return;
            }
        }
    }, [event])

    const [currentView, setCurrentView] = useState("overview");
    const handleDissapear = (target) => {
        const current = document.querySelector(`#${currentView}`);
        current.classList.remove("animate__bounceInUp");
        current.classList.add("animate__bounceOutDown");
        setTimeout(() => {
            setCurrentView(target);
        }, 500);
    }

    const handleAnimationEnd = (e) => {
        e.target.classList.remove("animate__bounceOutDown");
        e.target.classList.add("animate__bounceInUp");
    }

    useEffect(() => {
        const fetchJoin = async () => {
            const res = await fetch("/api/user-event/check-joined", {
                method: "POST",
                body: JSON.stringify({
                    "userId": session.user.id,
                    "eventId": event.id
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            if (res.status == 200) {
                setCheckJoined("Bạn đã đăng ký")
            }
            else {
                setCheckJoined("")
            }
        }

        if (session?.user && event) {
            const currentDate = new Date()
            const birthday = new Date(session.user.birthday) 
            if ((currentDate.getFullYear - birthday.getFullYear) < event.ageLimit) {
                setCheckJoined("Bạn chưa đủ độ tuổi yêu cầu để tham gia!")
                return
            }
            fetchJoin()
        }
        if (!session?.user) {
            setCheckJoined("Vui lòng đăng nhập để tham gia!")
            return
        }

        if (!session.user.birthday) {
            setCheckJoined("Vui lòng cập nhật ngày sinh của bạn để đăng ký!")
            return
        }
    }, [session?.user, event])
    const joinEvent = async (e) => {
        e.preventDefault()
        await fetch("/api/user-event/create", {
            method: "POST",
            body: JSON.stringify({
                "idUser": session.user.id,
                "idEvent": event.id
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
        setCheckJoined("Đăng ký thành công!")
    }
    return (
        loading ? (            
            <div className="flex justify-center mt-10" role="status">
                <svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                </svg>
                <span class="sr-only">Loading...</span>
            </div>
        ) : (
        <div className="md:w-10/12 mx-auto px-10 py-5">
            <Link href={"/"} className="flex justify-center text-primary-500 text-3xl font-semibold">Vietnam Blockchain Zone</Link>
            <div className="mt-5 flex gap-10">
                <div className="lg:w-8/12 w-full lg:border-r border-bodydark1 pr-10">
                    <div>
                        <h1 className="text-2xl font-bold">{event.title}</h1>
                        <div className="flex items-center gap-3 text-sm mt-3">
                            <MapPinIcon className="h-5 w-5 inline-block" />
                            <span>{event.location}</span>
                        </div>
                        <div className="flex items-center gap-3 mt-3 text-sm">
                            <LanguageIcon className="h-5 w-5 inline-block" />
                            <span>{event.language}</span>
                        </div>
                    </div>
                    <div className="lg:hidden">
                        <div className="border-b pb-7 border-bodydark1">
                            <div className="flex items-center gap-5">
                                <CalendarDaysIcon className="h-6 w-6 inline-block" />
                                <span>{moment(event.startDateTime).tz('Asia/Ho_Chi_Minh').format("DD/MM/YYYY HH:mm") + " - " + moment(event.endDateTime).tz('Asia/Ho_Chi_Minh').format("DD/MM/YYYY HH:mm")}</span>
                            </div>
                            <div className="flex items-center gap-5 mt-3">
                                <UserGroupIcon className="h-6 w-6 inline-block" />
                                <span>{event.eventType.name}</span>
                            </div>
                        </div>
                        <div className="mt-7 border-b pb-7 border-bodydark1">
                            <div>
                                <p>Chủ trì</p>
                                {event.eventPersons.map((person, index) => {
                                    if (person.role == "host") {
                                        return (
                                            <div key={index} className="mt-4">
                                                <Member member={person} size={"small"} />
                                            </div>
                                        )
                                    }
                                })}
                            </div>
                            <div className="mt-7">
                                <p>Khách mời</p>
                                {event.eventPersons.map((person, index) => {
                                    if (person.role == "guest") {
                                        return (
                                            <div key={index} className="mt-4">
                                                <Member member={person} size={"small"} />
                                            </div>
                                        )
                                    }
                                })}
                            </div>
                        </div>
                        <div className="pb-7 mt-7 border-b border-bodydark1">
                            <p className="mt-1">Lượt đăng ký: {countJoined} người</p>
                            <p className="mt-1">Tối đa: {event.max} người</p>
                            <p className="mt-1">
                            {checkJoied != "" ? (
                                <p className="font-semibold">{checkJoied}</p>
                                ) : (
                                    <button onClick={joinEvent} className="bg-primary-500 px-4 py-2 rounded-md hover:bg-primary-600 hover:scale-105 duration-100 text-white">Đăng ký</button>
                                )
                            }
                            </p>
                        </div>
                        <div className="mt-7">
                            <p>Liên hệ</p>
                            <div className="text-primary-500 flex items-center gap-3 mt-3">
                                <EnvelopeIcon className="h-5 w-5 inline-block" />
                                <span>{contactInfo.email}</span>
                            </div>
                            <div className="text-primary-500 flex items-center gap-3 mt-2">
                                <PhoneIcon className="h-5 w-5 inline-block" />
                                <span>{contactInfo.phone}</span>
                            </div>
                        </div>
                    </div>
                    <div className="mt-10">
                        <div className="flex md:flex-row flex-col gap-5 border-b-2 border-bodydark1">
                            <div onClick={() => handleDissapear("overview")} className={`border-b-2 py-1 -m-0.5 px-4 cursor-pointer transition-all duration-150 font-medium border-bodydark1 hover:border-primary-400 ${currentView == "overview" ? "border-primary-600" : ""}`}>Tổng quan</div>
                            <div onClick={() => handleDissapear("goals")} className={`border-b-2 py-1 -m-0.5 px-4 cursor-pointer transition-all duration-150 font-medium border-bodydark1 hover:border-primary-400 ${currentView == "goals" ? "border-primary-600" : ""}`}>Mục tiêu</div>
                            <div onClick={() => handleDissapear("program")} className={`border-b-2 py-1 -m-0.5 px-4 cursor-pointer transition-all duration-150 font-medium border-bodydark1 hover:border-primary-400 ${currentView == "program" ? "border-primary-600" : ""}`}>Kế hoạch chương trình</div>
                            <div onClick={() => handleDissapear("matter")} className={`border-b-2 py-1 -m-0.5 px-4 cursor-pointer transition-all duration-150 font-medium border-bodydark1 hover:border-primary-400 ${currentView == "matter" ? "border-primary-600" : ""}`}>Lưu ý của ban tổ chức</div>
                        </div>
                        {currentView == "overview" && (
                            <div style={{ maxWidth: "none" }} dangerouslySetInnerHTML={{ __html: event.overview }} onAnimationEnd={(e) => handleAnimationEnd(e)} id="overview" className="mt-7 animate__animated animate__bounceInUp prose ck-content" />
                        )}
                        {currentView == "goals" && (
                            <div style={{ maxWidth: "none" }} dangerouslySetInnerHTML={{ __html: event.goals }} onAnimationEnd={(e) => handleAnimationEnd(e)} id="goals" className="mt-7 animate__animated animate__bounceInUp prose ck-content"/>
                        )}
                        {currentView == "program" && (
                            <div onAnimationEnd={(e) => handleAnimationEnd(e)} id="program" className="mt-7 animate__animated animate__bounceInUp">
                                {sortPrograms.map((date, index) => (
                                    <div className="mt-5 shadow-lg rounded-md p-3">
                                        <p className="font-semibold text-lg">{date.date}</p>
                                        {date.programs.map(program => (
                                            <div className="mt-5 ms-7 hover:scale-105 duration-100">
                                                <div className="flex items-center gap-1">
                                                    <ClockIcon className="h-4 w-4 inline-block" /> 
                                                    <span className="underline font-semibold">{program.time}</span>
                                                </div>
                                                <div className="flex gap-2 mt-2">
                                                    <div>
                                                        <Image className="w-10 h-10 rounded-full object-cover" src={program.icon.icon} width={30} height={30} />
                                                    </div>
                                                    <div>
                                                        <div className="flex gap-3  items-center">
                                                            <p className="border border-bodydark rounded-md p-1 text-xs">{program.activity} ({program.duration} phút)</p>
                                                            <p className="flex items-center">
                                                                <MapPinIcon className="h-4 w-4 inline-block" />
                                                                <span className="text-sm">{program.location}</span>
                                                            </p>
                                                        </div>
                                                        <div className="mt-1">
                                                            <p className="font-semibold">{program.mainContent}</p>
                                                            <p className="text-sm">{program.description}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>    
                                ))}
                            </div>
                        )}
                        {currentView == "matter" && (
                            <div dangerouslySetInnerHTML={{__html: event.matter}} onAnimationEnd={(e) => handleAnimationEnd(e)} id="matter" className="mt-7 animate__animated animate__bounceInUp"/>
                        )}
                    </div>
                </div>
                <div className="lg:w-4/12 lg:block hidden">
                    <div className="border-b pb-7 border-bodydark1">
                        <div className="flex items-center gap-5">
                            <CalendarDaysIcon className="h-6 w-6 inline-block" />
                            <span>{moment(event.startDateTime).tz('Asia/Ho_Chi_Minh').format("DD/MM/YYYY HH:mm") + " - " + moment(event.endDateTime).tz('Asia/Ho_Chi_Minh').format("DD/MM/YYYY HH:mm")}</span>
                        </div>
                        <div className="flex items-center gap-5 mt-3">
                            <UserGroupIcon className="h-6 w-6 inline-block" />
                            <span>{event.eventType.name}</span>
                        </div>
                    </div>
                    <div className="mt-7 border-b pb-7 border-bodydark1">
                        <div>
                            <p>Chủ trì</p>
                            {event.eventPersons.map((person, index) => {
                                if (person.role == "host") {
                                    return (
                                        <div key={index} className="mt-4">
                                            <Member member={person} size={"small"} />
                                        </div>
                                    )
                                }
                            })}
                        </div>
                        <div className="mt-7">
                            <p>Khách mời</p>
                            {event.eventPersons.map((person, index) => {
                                if (person.role == "guest") {
                                    return (
                                        <div key={index} className="mt-4">
                                            <Member member={person} size={"small"} />
                                        </div>
                                    )
                                }
                            })}
                        </div>
                    </div>
                    <div className="pb-7 mt-7 border-b border-bodydark1">
                        <p className="mt-1">Lượt đăng ký: {countJoined} người</p>
                        <p className="mt-1">Tối đa: {event.max} người</p>
                        <p className="mt-1">
                            {checkJoied != "" ? (
                                <p className="font-semibold">{checkJoied}</p>
                            ) : (
                                <button onClick={joinEvent} className="bg-primary-500 px-4 py-2 rounded-md hover:bg-primary-600 hover:scale-105 duration-100 text-white">Đăng ký</button>
                            )
                        }
                        </p>
                    </div>
                    <div className="mt-7">
                        <p>Liên hệ</p>
                        <div className="text-primary-500 flex items-center gap-3 mt-3">
                            <EnvelopeIcon className="h-5 w-5 inline-block" />
                            <span>{contactInfo.email}</span>
                        </div>
                        <div className="text-primary-500 flex items-center gap-3 mt-2">
                            <PhoneIcon className="h-5 w-5 inline-block" />
                            <span>{contactInfo.phone}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div> 
        )
    )
}

export default ViewEventPage;