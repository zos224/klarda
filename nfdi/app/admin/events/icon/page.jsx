"use client";
import Modal from "@/components/admin/Modal/Modal";
import ModalParent from "@/components/admin/Modal/ModalParent";
import Image from "next/image";
import { useEffect, useState } from "react";
const IconPage = () => {
    const [openModal, setOpenModal] = useState(false)
    const [deleteLink, setDeleteLink] = useState('')
    const [icons, seticons] = useState([])
    const [loading, setLoading] = useState(false)
    const [openModali, setOpenModali] = useState(false)
    const [action, setAction] = useState('')
    const [currenti, setCurrenti] = useState({
        id: 0,
        name: '',
        icon: ''
    })
    useEffect(() => {
        const fetchicons = async () => {
            const res = await fetch('/api/icon/get')
            if (res.ok) {
                const data = await res.json()
                seticons(data)
                setLoading(false)
            }
            else {
                alert("Something went wrong while fetching data!")
            }
        }

        fetchicons()
    }, [])

    const onDeleted = (deleted) => {
        if (deleted) {
            const lastSlash = deleteLink.lastIndexOf('/')
            const id = deleteLink.substring(lastSlash+1)
            const newicons = icons.filter((e) => e.id != id)
            seticons(newicons)
        }
    }

    const updateOrInsert = (i) => {
        if (action == "create") {
            seticons([...icons, i])
        }
        else {
            const newicons = icons.map((t) => {
                if (t.id == i.id) {
                    return i
                }
                return t
            })
            seticons(newicons)
        }
    }

    return (
        <div className="w-full">
            <div className="flex justify-between mx-4">
                <h3 className="font-bold text-md">Quản lý icon thường dùng</h3>
                <button className="dark:bg-bodydark dark:text-black-2 text-black bg-white rounded-md px-3 py-2 shadow-md" onClick={() => {setCurrenti({id: null, name: '', icon: ""}); setAction("create"); setOpenModali(true)}}>Thêm icon</button>
            </div>
            {!loading ? (
                <div className="mt-10 w-full relative overflow-x-auto shadow-md sm:rounded-lg ">
                <table className="w-full text-sm text-center text-gray-500 dark:text-white">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-500 dark:text-white">
                        <tr>
                            <th scope="col" className="px-6 py-3 font-medium">#</th>
                            <th scope="col" className="px-6 py-3 font-medium">
                                Tên
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
                        {icons.map((i, index) => (
                            <tr key={i.id} className={`bg-white ${index == icons.length - 1 ? "" : "border-b"} dark:bg-bodydark text-black border-body`}>
                                <td className="px-6 py-4">
                                    {index + 1}
                                </td>
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                    {i.name}
                                </th>
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                    <Image className="w-10 h-10 object-cover mx-auto" src={i.icon}  width={30} height={30}/>
                                </th>
                                <td className="px-6 py-4">
                                    <button onClick={() => {setCurrenti({id: i.id, name: i.name, icon: i.icon}), setAction("update"), setOpenModali(true)}} className="hover:text-boxdark-2 hover:font-bold">Cập nhật</button>
                                </td>
                                <td className="px-6 py-4">
                                    <button onClick={() => {setOpenModal(!openModal); setDeleteLink("/api/icon/" + i.id)}} className="hover:text-boxdark-2 hover:font-bold">Xóa</button>
                                </td>
                            </tr>
                                                    
                        ))}
                    </tbody>
                </table>
                <Modal onDeleted={onDeleted} deleteLink={deleteLink} isOpen={openModal} onClose={() => setOpenModal(false)}></Modal>
                <ModalParent action={action} data={currenti} isOpen={openModali} name={"icon"} onClose={(i) => {setOpenModali(false); if (i) updateOrInsert(i)}} vie={"Icon"}></ModalParent>
            </div>
            ) : (
                <div className="flex-center mt-2" role="status">
                    <svg aria-hidden="true" class="w-10 h-10 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                    </svg>
                    <span class="sr-only">Loading...</span>
                </div>
            )}
        </div>
        
        
    )
}

export default IconPage


