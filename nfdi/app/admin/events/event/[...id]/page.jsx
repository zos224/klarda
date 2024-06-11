"use client"
import { useParams, useRouter } from "next/navigation"
import {useEffect, useRef, useState } from "react"
import Image from "next/image";
import CKEditorCustom from "@/components/admin/CKEditor";
import Program from "@/components/admin/Program";
import ModalAddProgram from "@/components/admin/Modal/ModalAddProgram";
import Person from "@/components/admin/Person";
import ModalAddPerson from "@/components/admin/Modal/ModalAddPerson";
import moment from "moment-timezone";
const CreateUpdateEvent = () => {
    const [event, setEvent] = useState({
        id: 0,
        title: '',
        location: '',
        language: '',
        idEventType: '',
        overview: '',
        goals: '',
        matter: '',
        startDateTime: '',
        endDateTime: '',
        status: '',
        idUser: '',
        user: '',
        link: '',
        platform: "",
        ageLimit: 0,
        max: 0,
        eEventTopics: [],
        eventPersons: [],
        programs: [],
    })
    const route = useRouter();
    const params = useParams();
    const [loading, setLoading] = useState(false)
    const [eventTypes, setEventTypes] = useState([])
    const [eventTopics, setEventTopics] = useState([])
    useEffect( () => {
        const getEvent = async () => {
            const response = await fetch('/api/event/' + params.id[1])
            if (response.ok) {
                const existEvent = await response.json();
                setEvent(existEvent)
            }
            else {
                route.push('/admin/event/create')
            }
        }

        const getEventTypes = async () => {
            const response = await fetch('/api/event-type/all')
            if (response.ok) {
                const data = await response.json()
                setEventTypes(data)
                if (params.id[0] == "create") {
                    setEvent({...event, idEventType: data[0].id})
                }
            }
        }

        if (params.id[1]) {
            setLoading(true)
            getEvent()
            getEventTypes()
        }
        else {
            setLoading(true)
            getEventTypes()
        }
    }, [params.id[1]])

    useEffect(() => {
        if (eventTypes.length > 0) {
            if (params.id[0] == "create") {
                setLoading(false)
            }
            else {
                if (event.id != 0) {
                    setLoading(false)
                }
            }
        }
    }, [eventTypes, event, params.id[1]])
    
    useEffect(() => {
        if (eventTypes.length > 0) {
            eventTypes.map((eventType) => {
                if (eventType.id == event.idEventType) {
                    setEventTopics(eventType.eventTopics)
                }
            })
        }
    }, [event.idEventType])

    const eventTopicRef = useRef(null)
    const eventTopicContainerRef = useRef(null)
    const newElement = (ref, containerRef) => {
        const element = ref.current;
        const container = containerRef.current;
        if (element) {
            const copy = element.cloneNode(true)
            copy.classList.add("mt-3")
            const image = copy.querySelector("img")
            image.src = "/assets/icon/remove.svg" 
            image.width = '26' 
            image.height = '26'
            image.classList.add("me-1")
            container.appendChild(copy)
            image.onclick = () => {
                copy.remove()
            }
        }
    }
    const [currentProgram, setCurrentProgram] = useState(null)
    const [openModalAddProgram, setOpenModalAddProgram] = useState(false)
    const [action, setAction] = useState("add")
    const onSubmitProgram = (data) => {
        if (data == null) {
            setCurrentProgram(null)
            return
        }
        if (action == "add") {
            const newPrograms = [...event.programs, data]
            setEvent({...event, programs: newPrograms})
        }
        else {
            const newPrograms = event.programs.map((program) => {
                if (program.id == data.id) {
                    return data
                }
                return program
            })
            setEvent({...event, programs: newPrograms})
        }
        setCurrentProgram(null)
    }

    const removeProgram = (id) => {
        const newPrograms = event.programs.filter((program, i) => program.id != id)
        setEvent({...event, programs: newPrograms})        
    }

    const [sortPrograms, setSortPrograms] = useState([])
    useEffect(() => {
        if (event.startDateTime != "" && event.endDateTime != "" && event.programs.length > 0) {
            const listPrograms = []
            const currentDate = new Date(event.startDateTime)   
            while (currentDate <= new Date(event.endDateTime)) {
                const entry = {
                    date: currentDate.toISOString().split('T')[0],
                    programs: []
                }
                listPrograms.push(entry)
                currentDate.setDate(currentDate.getDate() + 1);
            }
            event.programs.map((program) => {
                const index = listPrograms.findIndex((entry) => entry.date == moment.tz(program.date, 'Asia/Ho_Chi_Minh').format('YYYY-MM-DD'))
                if (index != -1) {
                    listPrograms[index].programs.push(program)
                }
                })
            listPrograms.forEach((date) => date.programs.sort((a, b) => a.time - b.time))
            setSortPrograms(listPrograms)
        }        
    }, [event.programs, event.startDateTime, event.endDateTime])

    useEffect(() => {
        if (currentProgram) {
            setOpenModalAddProgram(true)
        }
        else {
            setOpenModalAddProgram(false)
        }
    
    }, [currentProgram])

    const [currentPerson, setCurrentPerson] = useState(null)
    const [openModalPerson, setOpenModalPerson] = useState(false)
    const onSubmitPerson = (data) => {
        if (data == null) {
            setCurrentPerson(null)
            return
        }
        if (action == "add") {
            const newPersons = [...event.eventPersons, data]
            setEvent({...event, eventPersons: newPersons})
        }
        else {
            const newPersons = event.eventPersons.map((person) => {
                if (person.id == data.id) {
                    return data
                }
                return person
            })
            setEvent({...event, eventPersons: newPersons})
        }
        setCurrentPerson(null)
    }

    const removePerson = (id) => {
        const newPersons = event.eventPersons.filter((person, i) => person.id != id)
        setEvent({...event, eventPersons: newPersons})        
    }

    const [sortPersons, setSortPersons] = useState([])
    useEffect(() => {
        if (event.eventPersons.length > 0) {
            const listPerson = [
                {
                    role: "host",
                    vie: "Chủ trì",
                    persons: []
                },
                {
                    role: "invitee",
                    vie: "Khách mời",
                    persons: []
                }
            ]

            event.eventPersons.map((person) => {
                const index = listPerson.findIndex((entry) => entry.role == person.role)
                if (index != -1) {
                    listPerson[index].persons.push(person)
                }
            })  
            setSortPersons(listPerson)
        }        
    }, [event.eventPersons])

    useEffect(() => {
        if (currentPerson) {
            setOpenModalPerson(true)
        }
        else {
            setOpenModalPerson(false)
        }
    
    }, [currentPerson])


    const [errorAlert, setErrorAlert] = useState(null)
    const [submitting, setSubmitting] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true)
        const formData = new FormData();
        formData.append("id", event.id)
        formData.append("title", event.title)
        formData.append("location", event.location)
        formData.append("language", event.language)
        formData.append("idEventType", event.idEventType)
        formData.append("overview", event.overview)
        formData.append("goals", event.goals)
        formData.append("matter", event.matter)
        formData.append("startDateTime", event.startDateTime)
        formData.append("endDateTime", event.endDateTime)
        formData.append("status", event.status)
        formData.append("idUser", event.idUser)
        formData.append("link", event.link)
        formData.append("platform", event.platform)
        formData.append("max", event.max)
        formData.append("ageLimit", event.ageLimit)
        formData.append("eEventTopics", JSON.stringify([...eventTopicContainerRef.current.children].map((topic) => topic.querySelector("select").value)))
        formData.append("eventPersons", JSON.stringify(event.eventPersons))
        event.eventPersons.forEach((person, index) => {
            if (person.avatarUpload) {
                formData.append("eventPersons" + index, person.avatarUpload)
            }
        })
        formData.append("programs", JSON.stringify(event.programs))
        const response = await fetch('/api/event/createOrUpdate', {
            method: "POST",
            body: formData
        })
        if (response.ok) {
            setErrorAlert(null)
            route.push("/admin/events/event")
        }
        else {
            response.text().then(text => {
                setErrorAlert(text)
            })
        }
        setSubmitting(false)
    }

    const generateTempId = () => {
        const time = new Date().getTime()
        return time.toString().slice(0, 6)
    }

    return (
        <section class="py-1">
            <div class="w-full lg:w-8/12 px-4 mx-auto mt-6">
                <div class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg border-0">
                    <div class="rounded-t dark:bg-bodydark bg-white dark:text-black mb-0 px-6 py-3">
                        <div class="text-center flex justify-between">
                            <h6 class="text-xl font-bold">
                            {params.id[0] == 'create' ? 'Thêm' : 'Cập nhật'} sự kiện
                            </h6>
                        </div>
                    </div>
                    {!loading ? (
                        <div class="px-4 lg:px-10 py-10 w-full ">
                        <form onSubmit={handleSubmit}>
                            <div class="w-full px-4 mx-auto">
                                <div class="relative w-full mb-3">
                                <label class="block uppercase text-gray-200 text-xs font-bold mb-2">
                                    Tiêu đề
                                </label>
                                <input value={event.title} type="text" placeholder="Tiêu đề" onChange={(e) => setEvent({...event, title: e.target.value})} class="border-0 px-3 py-3 placeholder-bodydark2 text-black dark:bg-bodydark bg-white rounded text-sm shadow-4 focus:outline-none focus:ring w-full ease-linear transition-all duration-150" required />
                                </div>
                            </div>
                            <div class="w-full px-4 mx-auto">
                                <div class="relative w-full mb-3">
                                <label class="block uppercase text-gray-200 text-xs font-bold mb-2">
                                    Địa điểm
                                </label>
                                <input value={event.location} type="text" placeholder="Địa điểm" onChange={(e) => setEvent({...event, location: e.target.value})} class="border-0 px-3 py-3 placeholder-bodydark2 text-black dark:bg-bodydark bg-white rounded text-sm shadow-4 focus:outline-none focus:ring w-full ease-linear transition-all duration-150" required/>
                                </div>
                            </div>
                            <div class="w-full px-4 mx-auto">
                                <div class="relative w-full mb-3">
                                <label class="block uppercase text-gray-200 text-xs font-bold mb-2">
                                    Ngôn ngữ
                                </label>
                                <input value={event.language} type="text" placeholder="Ngôn ngữ" onChange={(e) => setEvent({...event, language: e.target.value})} class="border-0 px-3 py-3 placeholder-bodydark2 text-black dark:bg-bodydark bg-white rounded text-sm shadow-4 focus:outline-none focus:ring w-full ease-linear transition-all duration-150" required/>
                                </div>
                            </div>
                            <div class="w-full px-4 mx-auto">
                                <div class="relative w-full mb-3">
                                <label class="block uppercase text-gray-200 text-xs font-bold mb-2">
                                    Link
                                </label>
                                <input value={event.link} type="text" placeholder="Link" onChange={(e) => setEvent({...event, link: e.target.value})} class="border-0 px-3 py-3 placeholder-bodydark2 text-black dark:bg-bodydark bg-white rounded text-sm shadow-4 focus:outline-none focus:ring w-full ease-linear transition-all duration-150" />
                                </div>
                            </div>
                            <div class="w-full px-4 mx-auto">
                                <div class="relative w-full mb-3">
                                <label class="block uppercase text-gray-200 text-xs font-bold mb-2">
                                    Nền tảng
                                </label>
                                <input value={event.platform} type="text" placeholder="Nền tảng" onChange={(e) => setEvent({...event, platform: e.target.value})} class="border-0 px-3 py-3 placeholder-bodydark2 text-black dark:bg-bodydark bg-white rounded text-sm shadow-4 focus:outline-none focus:ring w-full ease-linear transition-all duration-150" required/>
                                </div>
                            </div>
                            <div class="w-full px-4 mx-auto">
                                <div class="relative w-full mb-3">
                                <label class="block uppercase text-gray-200 text-xs font-bold mb-2">
                                    Độ tuổi tối thiểu
                                </label>
                                <input value={event.ageLimit} type="number" min={0} onChange={(e) => setEvent({...event, ageLimit: e.target.value})} class="border-0 px-3 py-3 placeholder-bodydark2 text-black dark:bg-bodydark bg-white rounded text-sm shadow-4 focus:outline-none focus:ring w-full ease-linear transition-all duration-150" required/>
                                </div>
                            </div>
                            <div class="w-full px-4 mx-auto">
                                <div class="relative w-full mb-3">
                                <label class="block uppercase text-gray-200 text-xs font-bold mb-2">
                                    Số người tối đa
                                </label>
                                <input value={event.max} type="number" min={0} onChange={(e) => setEvent({...event, max: e.target.value})} class="border-0 px-3 py-3 placeholder-bodydark2 text-black dark:bg-bodydark bg-white rounded text-sm shadow-4 focus:outline-none focus:ring w-full ease-linear transition-all duration-150" required/>
                                </div>
                            </div>
                            <div class="w-full px-4 mx-auto">
                                <div class="relative w-full mb-3">
                                <label class="block uppercase text-gray-200 text-xs font-bold mb-2">
                                    Danh mục sự kiện
                                </label>
                                <select value={event.idEventType} onChange={(e) => setEvent({...event, idEventType: e.target.value})} class="border-0 px-3 py-3 placeholder-bodydark2 text-black dark:bg-bodydark bg-white rounded text-sm shadow-4 focus:outline-none focus:ring w-full ease-linear transition-all duration-150">
                                    {eventTypes.map((eventType) => (
                                        <option value={eventType.id}>{eventType.name}</option>
                                    ))}
                                </select>
                                </div>
                            </div>
                            <div class="w-full px-4 mx-auto mt-3">
                                <div class="relative w-full mb-3">
                                    <label class="block uppercase text-gray-200 text-xs font-bold mb-2">
                                        Chủ đề
                                    </label>
                                    <div ref={eventTopicContainerRef}>
                                        {event.eEventTopics.length == 0 ? (
                                            <div className="flex" ref={eventTopicRef}>
                                                <select className="text-black border-0 px-3 py-3 dark:bg-bodydark bg-white rounded text-sm shadow-4 focus:outline-none focus:ring w-full ease-linear"> 
                                                    {eventTopics && eventTopics.map(topic => (
                                                        <option key={topic.id} value={topic.id}>{topic.name}</option>
                                                    ))}
                                                </select>
                                                <Image className="cursor-pointer ms-7" onClick={() => {newElement(eventTopicRef, eventTopicContainerRef)}} src={"/assets/icon/add.svg"} width={35} height={35}></Image>
                                            </div>
                                        ) : (
                                            event.eEventTopics.map((topic, index) => (
                                                index == 0 ? (
                                                    <div key={index} className="flex" ref={eventTopicRef}>
                                                        <select defaultValue={topic.idTopic} required className="text-black border-0 px-3 py-3 dark:bg-bodydark bg-white rounded text-sm shadow-4 focus:outline-none focus:ring w-full ease-linear"> 
                                                            {eventTopics && eventTopics.map(t => (
                                                                <option key={t.id} value={t.id}>{t.name}</option>
                                                            ))}
                                                        </select>
                                                        <Image className="cursor-pointer ms-7" onClick={() => {newElement(eventTopicRef, eventTopicContainerRef)}} src={"/assets/icon/add.svg"} width={35} height={35}></Image>
                                                    </div>
                                                ) : (
                                                    <div key={index} className="flex mt-3" ref={eventTopicRef}>
                                                        <select required defaultValue={topic.idTopic} className="text-black border-0 px-3 py-3 dark:bg-bodydark bg-white rounded text-sm shadow-4 focus:outline-none focus:ring w-full ease-linear">                                                             
                                                            {eventTopics && eventTopics.map(t => (
                                                                <option key={t.id} value={t.id}>{t.name}</option>
                                                            ))}
                                                        </select>
                                                        <Image className="cursor-pointer ms-7" onClick={(e) => {e.currentTarget.parentNode.remove()}} src={"/assets/icon/remove.svg"} width={28} height={28}></Image>
                                                    </div>
                                                )
                                                
                                            ))
                                        )}
                                        
                                    </div>
                                </div>
                            </div>
                            <div class="w-full px-4 mx-auto mt-2">
                                <div class="relative w-full mb-3">
                                <label class="block uppercase text-gray-200 text-xs font-bold mb-2" >
                                    Tổng quan
                                </label>
                                <CKEditorCustom initData={event.overview} setData={(data) => {setEvent({...event, overview: data})}}></CKEditorCustom>
                                </div>
                            </div>
                            <div class="w-full px-4 mx-auto mt-2">
                                <div class="relative w-full mb-3">
                                <label class="block uppercase text-gray-200 text-xs font-bold mb-2" >
                                    Mục tiêu
                                </label>
                                <CKEditorCustom initData={event.goals} setData={(data) => {setEvent({...event, goals: data})}}></CKEditorCustom>
                                </div>
                            </div>
                            <div class="w-full px-4 mx-auto mt-2">
                                <div class="relative w-full mb-3">
                                <label class="block uppercase text-gray-200 text-xs font-bold mb-2" >
                                    Lưu ý của ban tổ chức
                                </label>
                                <CKEditorCustom initData={event.matter} setData={(data) => {setEvent({...event, matter: data})}}></CKEditorCustom>
                                </div>
                            </div>
                            <div class="w-full px-4 mx-auto">
                                <div class="relative w-full mb-3">
                                    <label class="block uppercase text-gray-200 text-xs font-bold mb-2">
                                        Thời gian bắt đầu
                                    </label>
                                    <input defaultValue={moment.tz(event.startDateTime, 'Asia/Ho_Chi_Minh').format('YYYY-MM-DDTHH:mm')} type="datetime-local" max={event.endDateTime} onChange={(e) => setEvent({...event, startDateTime: e.target.value})} class="border-0 px-3 py-3 placeholder-bodydark2 text-black dark:bg-bodydark bg-white rounded text-sm shadow-4 focus:outline-none focus:ring w-full ease-linear transition-all duration-150" />
                                </div>
                            </div>
                            <div class="w-full px-4 mx-auto">
                                <div class="relative w-full mb-3">
                                    <label class="block uppercase text-gray-200 text-xs font-bold mb-2">
                                        Thời gian kết thúc
                                    </label>
                                    <input defaultValue={moment.tz(event.endDateTime, 'Asia/Ho_Chi_Minh').format('YYYY-MM-DDTHH:mm')} type="datetime-local" min={event.startDateTime} onChange={(e) => setEvent({...event, endDateTime: e.target.value})} class="border-0 px-3 py-3 placeholder-bodydark2 text-black dark:bg-bodydark bg-white rounded text-sm shadow-4 focus:outline-none focus:ring w-full ease-linear transition-all duration-150" />
                                </div>
                            </div>
                            {event.startDateTime != "" && event.endDateTime != "" && (
                                <div class="w-full px-4 mx-auto mt-3">
                                    <div class="relative w-full mb-3">
                                        <div className="flex justify-between items-center">
                                            <div class="block uppercase text-gray-200 text-xs font-bold mb-2">
                                                Lịch trình chi tiết sự kiện
                                            </div>
                                            <div>
                                                <button onClick={(e) => {e.preventDefault(); setAction("add"); setCurrentProgram({id: generateTempId , date: '', time: '', duration: '', activity: '', location: '', mainContent: '', description: '', icon: null})}} className="rounded-md px-4 py-2 bg-black text-white dark:bg-white dark:text-black">Thêm lịch trình</button>
                                            </div>
                                        </div>
                                        <div className="">
                                            {
                                                sortPrograms.map((date, index) => (
                                                    <div className="mt-7">
                                                        <div className="font-semibold">
                                                            {date.date}
                                                        </div>
                                                        <div className="flex lg:flex-row flex-col items-stretch gap-10 mt-4">                                        
                                                            {
                                                                date.programs.map((program, i) => (
                                                                    <div className="flex gap-3 items-center flex-1 mx-auto  cursor-pointer" key={index} >
                                                                        <div onClick={() => {setCurrentProgram(program), setAction("update")}}>
                                                                            <Program program={program}/>
                                                                        </div>
                                                                        <Image className="w-8 h-8 cursor-pointer" onClick={() => {removeProgram(program.id)}} src={"/assets/icon/remove.svg"} width={35} height={35}></Image>
                                                                    </div>
                                                                ))
                                                            }
                                                        </div> 
                                                    </div>
                                                ))
                                            }     
                                        </div>
                                        
                                        <ModalAddProgram data={currentProgram} isOpen={openModalAddProgram} onClose={onSubmitProgram} minDate={event.startDateTime} maxDate={event.endDateTime}></ModalAddProgram>
                                    </div>
                                </div>
                            )}
                            <div class="w-full px-4 mx-auto mt-3">
                                <div class="relative w-full mb-3">
                                    <div className="flex justify-between items-center">
                                        <div class="block uppercase text-gray-200 text-xs font-bold mb-2">
                                            Danh sách người tham gia
                                        </div>
                                        <div>
                                            <button onClick={(e) => {e.preventDefault(); setAction("add"); setCurrentPerson({id: generateTempId , name: "", academicTitle: "", role: "", company: "", avatar: "", avatarUpload: ""})}} className="rounded-md px-4 py-2 bg-black text-white dark:bg-white dark:text-black">Thêm người tham gia</button>
                                        </div>
                                    </div>
                                    <div className="">
                                        {
                                            sortPersons.map((persons, index) => (
                                                <div className="mt-7">
                                                    <div className="font-semibold">
                                                        {persons.vie}
                                                    </div>
                                                    <div className="flex lg:flex-row flex-col items-stretch gap-10 mt-4">                                        
                                                        {
                                                            persons.persons.map((p, i) => (
                                                                <div className="flex gap-3 items-center flex-1 mx-auto  cursor-pointer" key={index} >
                                                                    <div onClick={() => {setCurrentPerson(p), setAction("update")}}>
                                                                        <Person person={p}/>
                                                                    </div>
                                                                    <Image className="w-8 h-8 cursor-pointer" onClick={() => {removePerson(p.id)}} src={"/assets/icon/remove.svg"} width={35} height={35}></Image>
                                                                </div>
                                                            ))
                                                        }
                                                    </div> 
                                                </div>
                                            ))
                                        }     
                                    </div>
                                    
                                    <ModalAddPerson data={currentPerson} isOpen={openModalPerson} onClose={onSubmitPerson}></ModalAddPerson>
                                </div>
                            </div>
                            <div class="w-full lg:w-6/12 px-4 mx-auto mt-3">
                                <div class="relative w-full mb-3">
                                    <label class="block uppercase text-gray-200 text-xs font-bold mb-2">
                                        Trạng thái
                                    </label>
                                    <select required onChange={(e) => setEvent({...event, status: e.target.value})} className="text-black border-0 px-3 py-3 dark:bg-bodydark bg-white rounded text-sm shadow-4 focus:outline-none focus:ring w-full ease-linear"> 
                                        <option className="dark:text-black" selected={event.status == true ? true : false} value={true}>Đã xác nhận</option>
                                        <option className="dark:text-black" selected={event.status == false ? true : false} value={false}>Chưa xác nhận</option>
                                    </select>
                                </div>
                            </div>
                            {!submitting ? (
                                <div className="text-center">
                                    <input type="submit" role="button" className="mt-10 cursor-pointer bg-black text-white dark:bg-whiten dark:text-black px-3 py-2 rounded-xl" value={params.id[0] == 'create' ? 'Thêm' : 'Cập nhật'}/>
                                </div>
                            ) : (
                                <div className="text-center">
                                    <button className="mt-10 cursor-pointer bg-black text-white px-7 py-2 rounded-xl">
                                        <div role="status">
                                            <svg aria-hidden="true" class="w-6 h-6 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                            </svg>
                                            <span class="sr-only">Loading...</span>
                                        </div>
                                    </button>
                                </div>
                            )}
                            
                        </form>
                        {errorAlert ? (
                            <div className="text-white mt-3 bg-red rounded-lg px-3 py-2">
                                {errorAlert}
                            </div>
                        ) : (
                            <></>
                        )}
                    </div>
                    ) : (
                        <div className="flex-center mt-2 mx-auto" role="status">
                            <svg aria-hidden="true" class="w-10 h-10 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                            </svg>
                            <span class="sr-only">Loading...</span>
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}

export default CreateUpdateEvent