"use client"
import Alert from "@/components/admin/Alert";
import ModalMail from "@/components/admin/Modal/ModelCreateUpdateMail";
import { useEffect, useState } from "react";
import Link from 'next/link'
const SendEmailPage = () => {
    const [alert, setAlert] = useState({
        status: false,
        message: ""
    })
    const [mailSents, setMailSents] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('/api/email/getAll')
            const result = await response.json()
            if (result) {
                setMailSents(result)
            }
            else {
                setMailSents([])
            }
        }
        fetchData()
    }, [])
    const [currentMail, setCurrentMail] = useState(null)
    const [showModal, setShowModal] = useState(false)
    const [action, setAction] = useState(null)
    useEffect(() => {
        if (currentMail) {
            setShowModal(true)
        }
    }, [currentMail])

    const sendMail = async (mail) => {
        const response = await fetch('/api/email/send', {
            method: "POST",
            body: JSON.stringify(mail),
        })
        if (response.ok) {
            setAlert({
                status: true,
                message: "Gửi mail thành công"
            })
        }
        else {
            setAlert({
                status: false,
                message: "Gửi mail thất bại"
            })
        }
    }

    const closeData = (data) => {
        if (data === "success") {
            setAlert({
                status: true,
                message: "Gửi mail thành công"
            })
        }
        else if (data) {
            setMailSents([data, ...mailSents])
            setAlert({
                status: true,
                message: "Gửi mail thành công"
            })
        }
        setShowModal(false)
        setCurrentMail(null)
    }
    return (
        <div className="w-full">
            <Alert alertInput={alert}/>
            <div className="flex justify-between">
                <h2 className="font-bold text-xl">Gửi tin tức mới</h2>
                <div className="flex gap-5">
                    <Link href={"/admin/send-mail/subscribe-mail"} className="bg-black dark:bg-white text-white dark:text-black px-4 py-2 rounded-md">Các mail đã đăng ký</Link>
                    <button onClick={() => {setCurrentMail({id: "000", title: "", content: ""}), setAction("create")}} className="bg-black dark:bg-white text-white dark:text-black px-4 py-2 rounded-md">Gửi mail mới</button>
                </div>
            </div>
            <div className="mt-5">
                <div className="font-semibold text-xl">Các mail đã gửi</div>
                <table className="w-full text-sm text-center text-gray-500 dark:text-white mt-10">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-500 dark:text-white">
                        <tr>
                            <th scope="col" className="px-6 py-3 font-medium">#</th>
                            <th scope="col" className="px-6 py-3 font-medium">
                                Tiêu đề
                            </th>
                            <th scope="col" className="px-6 py-3 font-medium">
                                Nội dung
                            </th>
                            <th scope="col" colSpan={2} className="px-6 py-3 font-medium">
                                Hành động
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {mailSents.map((mail, index) => (
                            <tr key={mail.id} className={`bg-white ${index == mailSents.length - 1 ? "" : "border-b"} dark:bg-bodydark text-black border-body`}>
                                <td className="px-6 py-4">
                                    {index + 1}
                                </td>
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                    {mail.title}
                                </th>
                                <td className="px-6 py-4 truncate max-h-40">
                                    <div dangerouslySetInnerHTML={{ __html: mail.content }}></div>
                                </td>
                                <td className="px-6 py-4">
                                    <button onClick={() => {setCurrentMail(mail); setAction("view")}} className="hover:text-boxdark-2 hover:font-bold">Xem</button>
                                </td>
                                <td className="px-6 py-4">
                                    <button onClick={() => sendMail(mail)} className="hover:text-boxdark-2 hover:font-bold">Gửi lại</button>
                                </td>
                            </tr>
                                                    
                        ))}
                    </tbody>
                </table>
                <ModalMail action={action} data={currentMail} isOpen={showModal} onClose={(data) => closeData(data)}/>
            </div>
        </div>
    )
}

export default SendEmailPage;