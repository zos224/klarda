"use client"
import moment from "moment-timezone"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { useEffect, useState } from "react"


const eventContributionsPage = () => {
    const {data: session} = useSession()
    const [userEvents, setUserEvents] = useState([])
    useEffect(() => {
        const fetchUserEvent = async (id) => {
            const response = await fetch('/api/event/byuser' + '?user=' + id)
            if (response.ok) {
                const userEvents = await response.json()
                setUserEvents(userEvents)
            }
        }

        if (session?.user) {
            fetchUserEvent(session.user.id)
        }
    }, [session?.user])

    return (
        <div className="md:w-8/12 md:mx-auto mx-10 my-20">
            <div className="flex justify-end">
                <Link className="bg-primary-500 px-4 py-2 rounded-md text-white hover:bg-primary-600 duration-100 mt-2" href={"/customer/home/commit-event/create"}>
                    Tạo sự kiện
                </Link>
            </div>
            <div className="rounded-lg shadow-md mt-10 overflow-auto">           
                <table className="text-left w-full min-w-230">
                    <thead className="">
                        <tr className="bg-whiten">
                            <th className="px-4 py-3">Thời gian bắt đầu sự kiện</th>
                            <th className="px-4 py-3">Tên sự kiện</th>
                            <th className="px-4 py-3">Trạng thái</th>
                            <th className="px-4 py-3">Chi tiết</th>
                        </tr>
                    </thead>
                    <tbody className="text-left text-sm">
                        {
                            userEvents.map((ue, index) => (
                                <tr key={index}>
                                    <td className="px-4 py-3 border-t border-bodydark1 font-semibold">{moment.tz(ue.startDateTime, "Asia/Ho_Chi_Minh").format("DD/MM/YYYY HH:mm")}</td>
                                    <td className="px-4 py-3 border-t border-bodydark1">{ue.title}</td>
                                    <td className="px-4 py-3 border-t border-bodydark1">{ue.status == true ? "Đã duyệt" : "Chưa duyệt" }</td>
                                    <td className="px-4 py-3 border-t border-bodydark1">{ue.status == true ? (
                                        <Link href={"/events/" + ue.slug}>Chi tiết</Link>
                                    ) : (
                                        <Link href={"/customer/home/commit-event/update/" + ue.id}>
                                            Chi tiết
                                        </Link>
                                    )}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )   
}

export default eventContributionsPage