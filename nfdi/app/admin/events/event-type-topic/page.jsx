"use client";
import Modal from "@/components/admin/Modal/Modal";
import ModalParent from "@/components/admin/Modal/ModalParent";
import ModalChild from "@/components/admin/Modal/ModalChild";
import { useEffect, useState } from "react";
import Image from "next/image";

const EventTypeTopicPage = () => {
    const [openModalDeleteEtype, setOpenModalDeleteEtype] = useState(false)
    const [openModalDeleteETopic, setOpenModalDeleteETopic] = useState(false)
    const [openModalEType, setOpenModalEType] = useState(false)
    const [openModalETopic, setOpenModalETopic] = useState(false)
    const [deleteLink, setDeleteLink] = useState('')
    const [currentEventType, setcurrentEventType] = useState({
        id: 0,
        name: '',
        icon: ''
    })
    const [action, setAction] = useState('')
    const [eventTypes, seteventTypes] = useState([])
    const [eventTopics, seteventTopics] = useState([])
    const [currentEventTopic, setcurrentEventTopic] = useState({
        id: 0,
        name: '',
        idParent: 0
    })

    useEffect(() => {
        const fetchEventTypes = async () => {
            const res = await fetch('/api/event-type/all')
            if (res.ok) {
                const data = await res.json()
                seteventTypes(data)
            }
            else {
                alert("Something went wrong while fetching data!")
            }
        }

        fetchEventTypes()
    }, [])

    
    const onDeletedEventType = (deleted) => {
        if (deleted) {
            const lastSlash = deleteLink.lastIndexOf('/')
            const id = deleteLink.substring(lastSlash+1)
            const newETypes = eventTypes.filter((ev) => ev.id != id)
            seteventTypes(newETypes)
        }
    }

    const updateOrInsertEventType = (ev) => {
        if (action == "create") {
            seteventTypes([...eventTypes, ev])
        }
        else {
            const newETypes = eventTypes.map((p) => {
                if (p.id == ev.id) {
                    return ev
                }
                return p
            })
            seteventTypes(newETypes)
        }
    }

    useEffect(() => {
        if (eventTypes.length > 0) {
            let neweventTopics = []
            eventTypes.forEach((ev) => {
                if (ev.eventTopics && ev.eventTopics.length > 0)
                {
                    ev.eventTopics.forEach((evt) => {
                        evt.eventType = ev.name
                        neweventTopics.push(evt)
                    })
                }
            })
            seteventTopics(neweventTopics)
        }
    }, [eventTypes])


    const updateOrInsertEventTopic = (evt) => {
        if (action == "create") {
            eventTypes.forEach((ev) => {
                if (ev.id == evt.idEventType) {
                    evt.eventType = ev.name
                }
            })
            seteventTopics([...eventTopics, evt])
        }
        else {
            const neweventTopics = eventTopics.map((p) => {
                if (p.id == evt.id) {
                    eventTypes.forEach((ev) => {
                        if (ev.id == evt.idEventType) {
                            evt.eventType = ev.name
                        }
                    })
                    return evt
                }
                return p
            })
            seteventTopics(neweventTopics)
        }
    }

    const onDeleteEventTopic = (deleted) => {
        if (deleted) {
            const lastSlash = deleteLink.lastIndexOf('/')
            const id = deleteLink.substring(lastSlash+1)
            const neweventTopics = eventTopics.filter((evt) => evt.id != id)
            seteventTopics(neweventTopics)
        }
    }
    return (
        <div className="w-full">
            <div className="flex justify-between">
                <h2 className="font-bold text-xl">Quản lý Danh mục - Chủ đề Sự kiện</h2>
            </div>
            <div>
                {/* table of product option */}
                <div className="mt-10 w-full relative overflow-x-auto shadow-md sm:rounded-lg ">
                    <div className="flex justify-between mx-4">
                        <h3 className="font-bold text-md">Quản lý danh mục</h3>
                        <button className="dark:bg-bodydark dark:text-black-2 text-black bg-white rounded-md px-3 py-2 shadow-md" onClick={() => {setcurrentEventType({id: null, name: ''}); setAction("create"); setOpenModalEType(true)}}>Thêm danh mục</button>
                    </div>
                    <table className="mt-5 w-full text-sm text-center text-gray-500 dark:text-white">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-500 dark:text-white">
                            <tr>
                                <th scope="col" className="px-6 py-3 font-medium">#</th>
                                <th scope="col" className="px-6 py-3 font-medium">
                                    Tên danh mục
                                </th>
                                <th scope="col" className="px-6 py-3 font-medium">
                                    Icon
                                </th>
                                <th scope="col" colSpan={2} className="px-6 py-3 font-medium">
                                    Hành động
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {eventTypes.map((et, index) => (
                                <tr key={et.id} className={`bg-white ${index == eventTypes.length - 1 ? "" : "border-b"} dark:bg-bodydark text-black border-body`}>
                                    <td className="px-6 py-4">
                                        {index + 1}
                                    </td>
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                        {et.name}
                                    </th>
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                        <Image className="w-10 h-10 object-cover mx-auto" src={et.icon}  width={30} height={30}/>
                                    </th>
                                    <td className="px-6 py-4">
                                        <button className="hover:text-boxdark-2 hover:font-bold" onClick={() => {setcurrentEventType(et); setAction("update"); setOpenModalEType(true)}}>Cập nhật</button>
                                    </td>
                                    <td className="px-6 py-4">
                                        <button onClick={() => {setOpenModalDeleteEtype(!openModalDeleteEtype); setDeleteLink("/api/event-type/" + et.id)}} className="hover:text-boxdark-2 hover:font-bold">Xóa</button>
                                    </td>
                                </tr>
                                                        
                            ))}
                        </tbody>
                    </table>
                    <Modal onDeleted={onDeletedEventType} deleteLink={deleteLink} isOpen={openModalDeleteEtype} onClose={() => setOpenModalDeleteEtype(false)}></Modal>
                    <ModalParent name={"event-type"} isOpen={openModalEType} onClose={(evt) => {setOpenModalEType(false); if (evt) updateOrInsertEventType(evt)}} action={action} data={currentEventType} vie={"Danh mục"}></ModalParent>
                </div>
                {/* table of option for each product option */}
                <div className="mt-10 w-full relative overflow-x-auto shadow-md sm:rounded-lg ">
                <div className="flex justify-between mx-4">
                        <h3 className="font-bold text-md">Quản lý chủ đề</h3>
                        <button className="dark:bg-bodydark dark:text-black-2 text-black bg-white rounded-md px-3 py-2 shadow-md" onClick={() => {setcurrentEventTopic({id: null, name: '', idParent: eventTypes[0].id}); setAction("create"); setOpenModalETopic(true)}}>Thêm chủ đề</button>
                    </div>
                    <table className="w-full text-sm text-center text-gray-500 dark:text-white">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-500 dark:text-white">
                            <tr>
                                <th scope="col" className="px-6 py-3 font-medium">#</th>
                                <th scope="col" className="px-6 py-3 font-medium">
                                    Tên chủ đề
                                </th>
                                <th scope="col" className="px-6 py-3 font-medium">
                                    Danh mục
                                </th>
                                <th scope="col" colSpan={2} className="px-6 py-3 font-medium">
                                    Hành động
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {eventTopics.map((evt, index) => (
                                <tr key={evt.id} className={`bg-white ${index == eventTopics.length - 1 ? "" : "border-b"} dark:bg-bodydark text-black border-body`}>
                                    <td className="px-6 py-4">
                                        {index + 1}
                                    </td>
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                        {evt.name}
                                    </th>
                                    <td className="px-6 py-4">
                                        {evt.eventType}
                                    </td>
                                    <td className="px-6 py-4">
                                        <button className="hover:text-boxdark-2 hover:font-bold" onClick={() => {setcurrentEventTopic({id: evt.id, name: evt.name, idParent: evt.idEventType}); setAction("update"); setOpenModalETopic(true)}}>Cập nhật</button>
                                    </td>
                                    <td className="px-6 py-4">
                                        <button onClick={() => {setOpenModalDeleteETopic(!openModalDeleteETopic); setDeleteLink("/api/event-topic/" + evt.id)}} className="hover:text-boxdark-2 hover:font-bold">Xóa</button>
                                    </td>
                                </tr>
                                                        
                            ))}
                        </tbody>
                    </table>
                    <Modal onDeleted={onDeleteEventTopic} deleteLink={deleteLink} isOpen={openModalDeleteETopic} onClose={() => setOpenModalDeleteETopic(false)}></Modal>
                    <ModalChild parent={"Danh mục"} isOpen={openModalETopic} onClose={(evt) => {setOpenModalETopic(false); if (evt) updateOrInsertEventTopic(evt)}} action={action} childData={currentEventTopic} listParent={eventTypes} name={"event-topic"} vie="chủ đề"></ModalChild>
                </div>
            </div>
        </div>
        
        
    )
}

export default EventTypeTopicPage


