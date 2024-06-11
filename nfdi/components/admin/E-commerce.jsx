"use client";
import io from "socket.io-client";
import React from "react";
import CardDataStats from "./CardDataStats";
import { useEffect, useState } from "react";
import { Cog6ToothIcon, EyeIcon, HomeIcon, ShareIcon } from "@heroicons/react/24/solid";
import moment from "moment-timezone";
const ECommerce = () => {
  const [socket, setSocket] = useState(null);
  const [onlineCount, setOnlineCount] = useState(null);
  const [countPP, setCountPP] = useState(null);
  const [countUC, setCountUC] = useState(null);
  const [view, setView] = useState(null);
  const [upcomingEvent, setUpcomingEvent] = useState([]);
  const [rateOL, setRateOL] = useState(0);
  const [ratePP, setRatePP] = useState(0);
  const [rateUC, setRateUC] = useState(0);
  const [rateView, setRateView] = useState(0);
  useEffect(() => {
    const socketInitialize = async () => {  
      const socket = io({
          path: '/api/socket',
          addTrailingSlash: false,
      })
      setSocket(socket)
  }

  socketInitialize()

  const fetchUpcomingEvent = async () => {
    const response = await fetch('/api/event/upcoming')
    if (response.ok) {
        const data = await response.json()
        setUpcomingEvent(data)
    }
  }

  const fetchCountPP = async () => {
    const response = await fetch('/api/participant-project/count')
    if (response.ok) {
        const data = await response.text()
        setCountPP(data)
    }
  }

  const fetchCountUC = async () => {
    const response = await fetch('/api/use-case/count')
    if (response.ok) {
        const data = await response.text()
        setCountUC(data)
    }
  }

  const fetchView = async () => {
    const response = await fetch('/api/setting')
    if (response.ok) {
        const data = await response.json()
        setView(data.view)
    }
  }

  fetchUpcomingEvent()
  fetchCountPP()
  fetchCountUC()
  fetchView()

  }, []);

  useEffect(() => {
    if (countPP) {
      localStorage.getItem('countPP') ? setRatePP(((countPP - localStorage.getItem('countPP')) / localStorage.getItem('countPP') * 100).toFixed(2)) : setRatePP(0)
      localStorage.setItem('countPP', countPP)
    }
    if (countUC) {
      localStorage.getItem('countUC') ? setRateUC(((countUC - localStorage.getItem('countUC')) / localStorage.getItem('countUC') * 100).toFixed(2)) : setRateUC(0)
      localStorage.setItem('countUC', countUC)
    }
    if (view) {
      localStorage.getItem('view') ? setRateView(((view - localStorage.getItem('view')) / localStorage.getItem('view') * 100).toFixed(2)) : setRateView(0)
      localStorage.setItem('view', view)
    }
    if (onlineCount) {
      localStorage.getItem('onlineCount') ? setRateOL(((onlineCount - localStorage.getItem('onlineCount')) / localStorage.getItem('onlineCount') * 100).toFixed(2)) : setRateOL(0)
      localStorage.setItem('onlineCount', onlineCount)
    }
  }, [countPP, countUC, view, onlineCount])

  useEffect(() => {
    if (socket) {
      socket.emit('getOnline', null)
      socket.on("onlineAlert", (count) => {
        setOnlineCount(count);
      });
    }
    return () => {
      if (socket) {
        socket.off("online");
      }
    };
  }, [socket]);

  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <CardDataStats title="Đang hoạt động" total={onlineCount} rate={rateOL} levelDown={rateOL > 0 ? false : true} levelUp={rateOL > 0 ? true : false}>
          <HomeIcon className="fill-primary dark:fill-white w-10 p-1" />
        </CardDataStats>
        <CardDataStats title="Lượt xem trang" total={view} rate={rateView} levelDown={rateView > 0 ? false : true} levelUp={rateView > 0 ? true : false}>
          <EyeIcon className="fill-primary dark:fill-white w-10 p-1" />
        </CardDataStats>
        <CardDataStats title="Tổng số Dự án" total={countPP} rate={ratePP} levelDown={ratePP > 0 ? false : true} levelUp={ratePP > 0 ? true : false}>
          <ShareIcon className="fill-primary dark:fill-white w-10 p-1" />
        </CardDataStats>
        <CardDataStats title="Tổng số THSD" total={countUC} rate={rateUC} levelDown={rateUC > 0 ? false : true} levelUp={rateUC > 0 ? true : false}>
          <Cog6ToothIcon className="fill-primary dark:fill-white w-10 p-1" />
        </CardDataStats>
      </div>

      <div className="mt-10">
        <div className="font-bold dark:text-white text-black text-xl">Danh sách sự kiện sắp diễn ra</div>
        <div className="mt-10 w-full relative overflow-x-auto shadow-md sm:rounded-lg ">
            <table className="w-full text-sm text-center text-gray-500 dark:text-white">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-500 dark:text-white">
                    <tr>
                        <th scope="col" className="px-6 py-3 font-medium">#</th>
                        <th scope="col" className="px-6 py-3 font-medium">
                            Tiêu đề
                        </th>
                        <th scope="col" className="px-6 py-3 font-medium">
                            Địa điểm
                        </th>
                        <th scope="col" className="px-6 py-3 font-medium">
                            Ngôn ngữ
                        </th>
                        <th scope="col" className="px-6 py-3 font-medium">
                            Thời gian
                        </th>
                        <th scope="col" className="px-6 py-3 font-medium">
                            Link
                        </th>
                        <th scope="col" className="px-6 py-3 font-medium">
                            Nền tảng
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {upcomingEvent.map((event, index) => (
                        <tr key={event.id} className={`bg-white ${index == upcomingEvent.length - 1 ? "" : "border-b"} dark:bg-bodydark text-black border-body`}>
                            <td className="px-6 py-4">
                                {index + 1}
                            </td>
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                {event.title}
                            </th>
                            <td className="px-6 py-4">
                                {event.location}
                            </td>
                            <td className="px-6 py-4 overflow-hidden">
                                {event.language}
                            </td>
                            <td className="px-6 py-4">
                                {moment(event.startDateTime).tz('Asia/Ho_Chi_Minh').format("DD/MM/YYYY HH:mm") + " - " + moment(event.endDateTime).tz('Asia/Ho_Chi_Minh').format("DD/MM/YYYY HH:mm")}
                            </td>
                            <td className="px-6 py-4">
                                {event.link}
                            </td>
                            <td className="px-6 py-4">
                                {event.platform}
                            </td>
                        </tr>
                                                
                    ))}
                </tbody>
            </table>
        </div>
      </div>
    </>
  );
};

export default ECommerce;
