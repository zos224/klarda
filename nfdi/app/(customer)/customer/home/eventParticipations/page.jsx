"use client"
import moment from "moment-timezone"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { useEffect, useState } from "react"


const eventParticipationsPage = () => {
    const {data: session} = useSession()
    const [userEvents, setUserEvents] = useState([])
    useEffect(() => {
        const fetchUserEvent = async (id) => {
            const response = await fetch('/api/user-event/' + id + '?type=user')
            if (response.ok) {
                const userEvents = await response.json()
                setUserEvents(userEvents)
            }
        }

        if (session?.user) {
            fetchUserEvent(session.user.id)
        }
    }, [session?.user])

    const compareTime = (eventDate) => {
        const currentDate = new Date()
        const eDate = new Date(eventDate)
        if (eDate > currentDate) {
            return moment.tz(eventDate, "Asia/Ho_Chi_Minh").format("DD/MM/YYYY HH:mm")
        }
        else {
            return "Đã diễn ra"
        }
    }
    return (
        <div className="md:w-8/12 md:mx-auto mx-10 my-20">
            <div className="rounded-lg shadow-md mt-10 overflow-auto">           
                <table className="text-left w-full min-w-230">
                    <thead className="">
                        <tr className="bg-whiten">
                            <th className="px-4 py-3">Thời gian bắt đầu sự kiện</th>
                            <th className="px-4 py-3">Tên sự kiện</th>
                            <th className="px-4 py-3">Link</th>
                            <th className="px-4 py-3">Nền tảng</th>
                        </tr>
                    </thead>
                    <tbody className="text-left text-sm">
                        {
                            userEvents.map((ue, index) => (
                                <tr key={index}>
                                    <td className="px-4 py-3 border-t border-bodydark1 font-semibold">{compareTime(ue.event.startDateTime)}</td>
                                    <td className="px-4 py-3 border-t border-bodydark1"><Link href={"/events/" + ue.event.slug}>{ue.event.title}</Link></td>
                                    <td className="px-4 py-3 border-t border-bodydark1"><Link href={ue.event.link} target="_blank">{ue.event.link}</Link></td>
                                    <td className="px-4 py-3 border-t border-bodydark1">{ue.event.platform}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )   
}

export default eventParticipationsPage