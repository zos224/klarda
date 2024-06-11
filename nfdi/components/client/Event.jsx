"use client"
import Link from "next/link";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from "react";
import moment from "moment-timezone";
import { TagIcon } from "@heroicons/react/24/solid";
const Event = ({event}) => {
    useEffect(() => {
        AOS.init({
            duration: 300,
            once: true
        });
    }, []);
    return (
        <div className="hover:scale-105 duration-200 flex flex-1 justify-center">
            <Link data-aos="zoom-in-left" href={"/events/" + event.slug} className="bg-white shadow-md rounded-md text-center p-4 ">
                {/* <div className="w-fit mx-auto bg-whiten rounded-md flex items-center p-1 gap-2">
                    <CalendarIcon className="w-4 h-4"></CalendarIcon>
                    <div className="text-sm">{moment.tz(event.startDateTime, "Asia/Ho_Chi_Minh").format("DD-MM-YYYY")}</div>
                </div> */}
                <div className="mt-1">
                    <div className="font-semibold text-lg">{event.title}</div>
                </div>
                <div className="flex justify-center items-center gap-2 mt-1">
                    <TagIcon className="w-4 h-4"></TagIcon>
                    <div className="text-sm">{event.eventType.name}</div>
                </div>
                <div className="text-sm mt-1">
                {moment(event.startDateTime).tz('Asia/Ho_Chi_Minh').format("HH:mm DD/MM/YYYY") + " - " + moment(event.endDateTime).tz('Asia/Ho_Chi_Minh').format("HH:mm DD/MM/YYYY")}
                </div>
                {/* <div className="mt-1">
                     <div className="text-sm">Số lượng đăng ký: {event.userEvents.length}</div>
                </div>
                */}
            </Link>
        </div>
        
    );
}

export default Event;