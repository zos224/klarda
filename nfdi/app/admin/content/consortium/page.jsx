"use client"
import Alert from "@/components/admin/Alert";
import ModalAddMemberConsortium from "@/components/admin/Modal/ModalAddMemberConsortium";
import Person from "@/components/admin/Person";
import { useEffect, useState } from 'react'
import Image from 'next/image'

const ContentConsortiumPage = () => {
    const [data, setData] = useState(null)
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('/api/content/consortium')
            const result = await response.json()
            if (result != null && JSON.stringify(result.consortium) !== "{}") {
                setData(result.consortium)
            }
            else {
                setData([])
            }
        }
        fetchData()
    }, [])

    const [alert, setAlert] = useState({
        status: false,
        message: ""
    })
    const handleSubmit = async () => {
        const res = await fetch('/api/content/update', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ consortium: data})
        })
        if (res.ok) {
            setAlert({
                status: true,
                message: "Cập nhật thành công"
            })
        }
        else {
            setAlert({
                status: false,
                message: "Cập nhật thất bại"
            })
        }
    }

    const [showModalAddRole, setShowModalAddRole] = useState(false)
    const [inputRole, setInputRole] = useState("")
    const [showModal, setShowModal] = useState(false)
    const [currentPerson, setCurrentPerson] = useState(null)
    const [action, setAction] = useState(null)
    useEffect(() => {
        if (currentPerson) {
            setShowModal(true)
        }
        
    }, [currentPerson])

    const addRole = () => {
        if (inputRole === "") {
            return
        }
        const newData = [
            ...data,
            {
                role: inputRole,
                members: []
            }
        ]
        setData(newData)
        setShowModalAddRole(false)
        setInputRole("")
    }

    const generateTempId = () => {
        const time = new Date().getTime()
        return time.toString().slice(0, 6)
    }

    const addMember = (person) => {
        if (action === "add") {
            const newData = data.map((role) => {
                if (role.role === person.role) {
                    return {
                        ...role,
                        members: [
                            ...role.members,
                            person
                        ]
                    }
                }
                return role
            }
            )
            setData(newData)
        }
        else {
            const newData = data.map((role) => {
                return {
                    ...role,
                    members: role.members.map((p) => {
                        if (p.id === person.id) {
                            return person
                        }
                        return p
                    })
                }
            })
            setData(newData)
        }
    }

    const removePerson = (id) => {
        const newData = data.map((role) => {
            return {
                ...role,
                members: role.members.filter((p) => p.id !== id)
            }
        }
        )
        setData(newData)
    }
    return (
        data &&
        <div>
            <Alert alertInput={alert} />
            {
                showModalAddRole && (
                    <div tabindex="-1" className="fixed top-0 left-0 right-0 z-50 p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-screen max-h-full">
                    <div className="relative m-auto mt-20 w-full max-w-xl max-h-full">
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
                                            <label className="font-medium">
                                                Vai trò
                                            </label>
                                            <input type="text" onChange={(e) => setInputRole(e.target.value)} className="w-full text-black rounded-md border border-bodydark px-2 py-1 focus:outline-primary-500 mt-1" />
                                        </div>
                                    </div>
                                    <div className="">
                                        <button onClick={addRole} className="bg-black dark:bg-white text-white dark:text-black px-4 py-2 rounded-md mx-auto">Thêm</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                )
            }
            <div className="flex justify-between items-center mt-5">
                <div>
                    <button onClick={() => setShowModalAddRole(true)} className="bg-black dark:bg-white text-white dark:text-black px-4 py-2 rounded-md">Thêm vai trò</button>
                </div>
                <div>
                    <button onClick={() => {setCurrentPerson({id: generateTempId,
                                                            name: '',
                                                            academicTitle: '',
                                                            avatar: '',
                                                            workAt: '',
                                                            role: null,
                                                            website: ''}); setAction("add")}}
                    className="bg-black dark:bg-white text-white dark:text-black px-4 py-2 rounded-md">Thêm thành viên</button>
                </div>
            </div>
            <div>
                {data.map((role, index) => (
                    <div key={index} className={`my-5 pb-5 dark:border-white border-dark ${index == data.length - 1 ? "" : " border-b"}`}>
                        <div className="uppercase text-gray-200 font-bold mb-2">
                            Vai trò
                        </div>
                        <input type="text" value={role.role} onChange={(e) => {
                            const newData = data.map((item, i) =>
                                i === index ? { ...item, role: e.target.value } : item
                            )
                            setData(newData)
                        }} className="w-full text-black border-2 border-gray-200 dark:border-gray-600 rounded-md p-2" />
                        <div className="uppercase text-gray-200 font-bold mt-3">
                            Thành viên
                        </div>
                        <div className="flex lg:flex-row flex-col items-stretch gap-10 mt-4">                                        
                        {
                            role.members.map((p, i) => (
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
                ))}
            </div>
            <ModalAddMemberConsortium isOpen={showModal} data={currentPerson} onClose={(data) => {setShowModal(false); if (data) addMember(data) }} role={data.map((role) => role.role)} />
            <div className="text-center my-5">
                <button onClick={handleSubmit} className="bg-black dark:bg-white text-white dark:text-black px-4 py-2 rounded-md">Xác nhận</button>
            </div>
        </div>
    );
}

export default ContentConsortiumPage;