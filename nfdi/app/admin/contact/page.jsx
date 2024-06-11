"use client";
import Modal from "@/components/admin/Modal/Modal";
import ViewContact from "@/components/admin/Modal/ViewContact";
import { useEffect, useState } from "react";
const linkPage = () => {
    const [contactModal, setcontactModal] = useState(false)
    const [deleteLink, setDeleteLink] = useState('')
    const [contacts, setcontacts] = useState([])
    const [loading, setLoading] = useState(false)
    const [filter, setFilter] = useState('all')
    const [openViewModal, setOpenViewModal] = useState(false)
    const [currentContact, setCurrentContact] = useState(null)
    useEffect(() => {
        const fetchlink = async () => {
            const res = await fetch('/api/contact/' + filter)
            if (res.ok) {
                const data = await res.json()
                setcontacts(data)
                setLoading(false)
            }
            else {
                alert("Something went wrong while fetching data!")
            }
        }

        fetchlink()
    }, [filter])

    const onDeleted = (deleted) => {
        if (deleted) {
            const lastSlash = deleteLink.lastIndexOf('/')
            const id = deleteLink.substring(lastSlash+1)
            const newcontacts = contacts.filter((e) => e.id != id)
            setcontacts(newcontacts)
        }
    }

    useEffect(() => {
        if (currentContact) {
            setOpenViewModal(true)
        }
        else {
            setOpenViewModal(false)
        }
    }, [currentContact])

    const updateData = (data) => {
        if (data) {
            if (filter == "unapproved") {
                const newcontacts = contacts.filter((contact) => contact.id !== data.id)
                setcontacts(newcontacts)
            }
            else {
                const newcontacts = contacts.map((contact) => {
                    if (contact.id == data.id) {
                        return data
                    }
                    return contact
                })
                setcontacts(newcontacts)
            }
        }
        setCurrentContact(null)
    }
    return (
        <div className="w-full">
            <div className="flex justify-between">
                <h2 className="font-bold text-xl">Quản lý liên hệ</h2>
                <div>
                    <div className="text-end">Hiển thị</div>
                    <select onChange={(e) => setFilter(e.target.value)} className="p-2 rounded-md text-black dark:bg-bodydark bg-white border">
                        <option value={"all"}>Tất cả</option>
                        <option value={"approved"}>Đã xử lý</option>
                        <option value={"unapproved"}>Chưa xử lý</option>
                    </select>
                </div>
            </div>
            {!loading ? (
                <div className="mt-10 w-full relative overflow-x-auto shadow-md sm:rounded-lg ">
                {
                    contacts.length > 0 ? (
                        <table className="w-full text-sm text-center text-gray-500 dark:text-white">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-500 dark:text-white">
                            <tr>
                                <th sccontacte="col" className="px-6 py-3 font-medium">#</th>
                                <th sccontacte="col" className="px-6 py-3 font-medium">
                                    Tiêu đề
                                </th>
                                <th sccontacte="col" className="px-6 py-3 font-medium">
                                    Họ tên
                                </th>
                                <th sccontacte="col" className="px-6 py-3 font-medium">
                                    Trạng thái
                                </th>
                                <th sccontacte="col" colSpan={2} className="px-6 py-3 font-medium">
                                    Hành động
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {contacts.map((c, index) => (
                                <tr key={c.id} className={`bg-white ${index == contacts.length - 1 ? "" : "border-b"} dark:bg-bodydark text-black border-body`}>
                                    <td className="px-6 py-4">
                                        {index + 1}
                                    </td>
                                    <th sccontacte="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                        {c.title}
                                    </th>
                                    <td className="px-6 py-4">
                                        {c.firstName + " " + c.lastName}
                                    </td>
                                    <td className="px-6 py-4">
                                        {c.status == true ? "Đã xử lý" : "Chưa xử lý"}
                                    </td>
                                    <td className="px-6 py-4">
                                        <button className="hover:text-boxdark-2 hover:font-bold" onClick={() => setCurrentContact(c)}>Xem chi tiết</button>
                                    </td>
                                    <td className="px-6 py-4">
                                        <button onClick={() => {setcontactModal(!contactModal); setDeleteLink("/api/contact/" + c.id)}} className="hover:text-boxdark-2 hover:font-bold">Xóa</button>
                                    </td>
                                </tr>
                                                        
                            ))}
                        </tbody>
                        </table>
                    ) : (
                        <div className="text-center">Không có dữ liệu!</div>
                    )
                } 
                <Modal onDeleted={onDeleted} deleteLink={deleteLink} iscontacten={contactModal} onClose={() => setcontactModal(false)}></Modal>
                <ViewContact isOpen={openViewModal} onClose={(data) => updateData(data)} data={currentContact}></ViewContact>
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

export default linkPage


