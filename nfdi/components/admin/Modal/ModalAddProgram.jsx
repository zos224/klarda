"use client"

import { useEffect, useState } from "react"
import ImageDropdown from "../DropdownImage"

const ModalAddProgram = ({isOpen, onClose, data, minDate, maxDate}) => {
    const [errorAlert, setErrorAlert] = useState(null)

    const [program, setProgram] = useState({
        id: '',
        date: '',
        time: '',
        duration: '',
        activity: '',
        location: '',
        mainContent: '',
        description: '',
        icon: null
    })

    useEffect(() => {   
        if (data) {
            setProgram({
                id: data.id ? data.id : '',
                date: data.date ? data.date : '',
                time: data.time ? data.time : '',
                duration: data.duration ? data.duration : '',
                activity: data.activity ? data.activity : '',
                location: data.location ? data.location : '',
                mainContent: data.mainContent ? data.mainContent : '',
                description: data.description ? data.description : '',
                icon: data.icon ? data.icon : null
            })
        }
    }, [data])

    const [icons, setIcons] = useState([])
    useEffect(() => {
        const fetchIcons = async () => {
            const res = await fetch('/api/icon/get')
            if (res.ok) {
                const data = await res.json()
                setIcons(data)
            }
            else {
                alert("Something went wrong while fetching data!")
            }
        } 

        fetchIcons()
    }, [])

    const [minD, setMinD] = useState(minDate)
    useEffect(() => {
        const date = new Date(minDate)
        setMinD(date.toISOString().split('T')[0])
    }, [minDate])

    const [maxD, setMaxD] = useState(maxDate)
    useEffect(() => {
        const date = new Date(maxDate)
        setMaxD(date.toISOString().split('T')[0])
    }, [maxDate])
    
    const handleSubmit = (e) => {
        e.preventDefault();
        if (program.date === '' || program.time === '' || program.duration === '' || program.activity === '' || program.location === '' || program.mainContent === '' || program.description === '') {
            setErrorAlert('Vui lòng điền đầy đủ thông tin')
            return
        }
        setErrorAlert(null)
        onClose(program)
    }
    return ( isOpen && (
        <div tabindex="-1" className="fixed top-0 left-0 right-0 z-50 p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
            <div className="relative m-auto mt-20 w-full max-w-md max-h-full">
                <div className="relative bg-white rounded-lg shadow-md dark:bg-boxdark">
                    <button onClick={() => {onClose(null)}} type="button" className="absolute top-3 right-2.5 dark:text-white text-black bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600" >
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                        </svg>
                        <span className="sr-only">Close modal</span>
                    </button>
                    <div className="p-6 text-center">
                        <div class="px-4 lg:px-10 py-10 w-full ">
                            <div class="w-full px-4 mx-auto">
                                <div class="relative w-full mb-3">
                                <label class="block uppercase text-gray-200 text-xs font-bold mb-2">
                                    Ngày
                                </label>
                                <input value={program.date} type="date" min={minD} max={maxD} onChange={(e) => {setProgram({...program, date: e.target.value})}}  className="border-0 px-3 py-3 placeholder-bodydark2 text-black dark:bg-bodydark bg-white rounded text-sm shadow-4 focus:outline-none focus:ring w-full ease-linear transition-all duration-150" />
                                </div>
                            </div>
                            <div class="w-full px-4 mx-auto">
                                <div class="relative w-full mb-3">
                                <label class="block uppercase text-gray-200 text-xs font-bold mb-2">
                                    Thời gian
                                </label>
                                <input value={program.time} type="time" onChange={(e) => {setProgram({...program, time: e.target.value})}}  className="border-0 px-3 py-3 placeholder-bodydark2 text-black dark:bg-bodydark bg-white rounded text-sm shadow-4 focus:outline-none focus:ring w-full ease-linear transition-all duration-150" />
                                </div>
                            </div>
                            <div class="w-full px-4 mx-auto">
                                <div class="relative w-full mb-3">
                                <label class="block uppercase text-gray-200 text-xs font-bold mb-2">
                                    Diễn ra trong vòng (Tính theo phút)
                                </label>
                                <input value={program.duration} type="number" min={0} onChange={(e) => {setProgram({...program, duration: e.target.value})}}  className="border-0 px-3 py-3 placeholder-bodydark2 text-black dark:bg-bodydark bg-white rounded text-sm shadow-4 focus:outline-none focus:ring w-full ease-linear transition-all duration-150" />
                                </div>
                            </div>
                            <div class="w-full px-4 mx-auto">
                                <div class="relative w-full mb-3">
                                <label class="block uppercase text-gray-200 text-xs font-bold mb-2">
                                    Hoạt động
                                </label>
                                <input value={program.activity} type="text" placeholder="Hoạt động diễn ra (Thuyết trình, nghỉ giải lao, ...)" onChange={(e) => {setProgram({...program, activity: e.target.value})}}  className="border-0 px-3 py-3 placeholder-bodydark2 text-black dark:bg-bodydark bg-white rounded text-sm shadow-4 focus:outline-none focus:ring w-full ease-linear transition-all duration-150" />
                                </div>
                            </div>
                            <div className="w-full px-4 mx-auto mt-3">
                                <div className="relative w-full mb-3">
                                    <label className="block uppercase text-gray-200 text-xs font-bold mb-5">
                                        Icon
                                    </label>
                                    <ImageDropdown options={icons} selected={program.icon} setSelected={(ic) => setProgram({...program, icon: ic})}/>
                                </div>
                            </div>
                            <div class="w-full px-4 mx-auto">
                                <div class="relative w-full mb-3">
                                <label class="block uppercase text-gray-200 text-xs font-bold mb-2">
                                    Địa điểm diễn ra
                                </label>
                                <input value={program.location} type="text" placeholder="Địa điểm diễn ra" onChange={(e) => {setProgram({...program, location: e.target.value})}}  className="border-0 px-3 py-3 placeholder-bodydark2 text-black dark:bg-bodydark bg-white rounded text-sm shadow-4 focus:outline-none focus:ring w-full ease-linear transition-all duration-150" />
                                </div>
                            </div>
                            <div class="w-full px-4 mx-auto">
                                <div class="relative w-full mb-3">
                                <label class="block uppercase text-gray-200 text-xs font-bold mb-2">
                                    Nội dung chính
                                </label>
                                <input value={program.mainContent} type="text" placeholder="Nội dung chính" onChange={(e) => {setProgram({...program, mainContent: e.target.value})}}  className="border-0 px-3 py-3 placeholder-bodydark2 text-black dark:bg-bodydark bg-white rounded text-sm shadow-4 focus:outline-none focus:ring w-full ease-linear transition-all duration-150" />
                                </div>
                            </div>
                            <div class="w-full px-4 mx-auto">
                                <div class="relative w-full mb-3">
                                <label class="block uppercase text-gray-200 text-xs font-bold mb-2">
                                    Chi tiết
                                </label>
                                <input value={program.description} type="text" placeholder="Chi tiết" onChange={(e) => {setProgram({...program, description: e.target.value})}}  className="border-0 px-3 py-3 placeholder-bodydark2 text-black dark:bg-bodydark bg-white rounded text-sm shadow-4 focus:outline-none focus:ring w-full ease-linear transition-all duration-150" />
                                </div>
                            </div>
                            <div>
                                <button className="bg-black text-white dark:bg-white dark:text-black rounded-md px-4 py-2" onClick={(e) => handleSubmit(e)}>Xác nhận</button>
                            </div>
                            {errorAlert ? (
                                <div className="text-white mt-3 bg-red rounded-lg px-3 py-2">
                                    {errorAlert}
                                </div>
                            ) : (
                                <></>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
        

    )
}

export default ModalAddProgram