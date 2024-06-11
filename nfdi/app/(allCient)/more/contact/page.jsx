"use client"
import LinkNav from "@/components/client/LinkNav";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import "@/styles/ck.css"
const ContactPage = () => {
    const [step1, setStep1] = useState(true)
    const [content, setContent] = useState("")
    const [data, setData] = useState(null)
    useEffect(() => {
        const fetchContent = async () => {
            const response = await fetch('/api/content/contact')
            const result = await response.json()
            if (result) {
                setContent(result.contact)
            }
            else {
                setContent("")
            }
        }
        const fetchData = async () => {
            const response = await fetch('/api/setting')
            const result = await response.json()
            if (result) {
                setData(result)
            }
            else {
                setData(null)
            }
        }
        fetchData()
        fetchContent()
    }, [])
    const [contact, setContact] = useState({
        gender: 'Nam',
        title: '',
        firstName: '',
        lastName: '',
        email: '',
        researchArea: '',
        messages: '',
        status: false
    })
    const [success, setSuccess] = useState(false)
    const [errorAlert, setErrorAlert] = useState("")
    const ppRef = useRef(null)
    const handleStep1 = (e) => {
        e.preventDefault()
        if (contact.firstName == "" || contact.lastName == "" || contact.email == "" || contact.messages == "" || contact.researchArea == "") {
            setErrorAlert("Vui lòng điền đầy đủ thông tin")
            return
        }
        if (ppRef.current.checked == false) {
            setErrorAlert("Vui lòng đồng ý với chính sách bảo mật")
            return
        }
        setStep1(false)
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('gender', contact.gender)
        formData.append('title', contact.title)
        formData.append('firstName', contact.firstName)
        formData.append('lastName', contact.lastName)
        formData.append('email', contact.email)
        formData.append('researchArea', contact.researchArea)
        formData.append('messages', contact.messages)
        formData.append('status', contact.status)
        const response = await fetch('/api/contact/createOrUpdate', {
            method: 'POST',
            body: formData
        })

        if (response.ok) {
            setSuccess(true)
            setErrorAlert("")
        }
        else {
            setErrorAlert("Có lỗi xảy ra, vui lòng thử lại sau")
        }
    }
    return (
        <div>
            <LinkNav />
            <div className="mt-10">
                <div className="prose ck-content" style={{ maxWidth: "none" }} dangerouslySetInnerHTML={{ __html: content }}></div>
                <div className="mt-10 rounded-md shadow-lg px-5 py-8">
                    {success ? (
                        <div className="text-primary-600 font-semibold mt-10 text-center min-h-96">Klarda cảm ơn đóng góp của bạn! <br></br> Chúng tôi sẽ sớm xử lý yêu cầu của bạn</div> 
                    ) : (
                        step1 ? (
                            <div>
                                <p className="font-bold text-lg">Vui lòng điền đầy đủ các thông tin dưới đây</p>
                                <form>
                                    <div>
                                        <div className="flex md:flex-row flex-col gap-8 mt-5">
                                            <div className="md:w-1/2 w-full">
                                                <label className="font-medium">Giới tính *</label>
                                                <select value={contact.gender} onChange={(e) => setContact({...contact, gender: e.target.value})} className="border p-2 w-full rounded-md"> 
                                                    <option value={"Nam"}>Nam</option>
                                                    <option value={"Nữ"}>Nữ</option>
                                                    <option value={"LGBT"}>LGBT</option>
                                                </select>
                                            </div>
                                            <div className="md:w-1/2 w-full">
                                                <label className="font-medium">Tiêu đề</label>
                                                <input value={contact.title} onChange={(e) => setContact({...contact, title: e.target.value})} className="w-full border p-2 rounded-md focus:border-primary-600 focus:border-2 outline-none" type="text"></input>
                                            </div>
                                        </div>
                                        <div className="flex md:flex-row flex-col gap-8 mt-5">
                                            <div className="md:w-1/2 w-full">
                                                <label className="font-medium">Họ *</label>
                                                <input value={contact.firstName} onChange={(e) => setContact({...contact, firstName: e.target.value})} className="w-full border p-2 rounded-md focus:border-primary-600 focus:border-2 outline-none" type="text" required></input>
                                            </div>
                                            <div className="md:w-1/2 w-full">
                                                <label className="font-medium">Tên *</label>
                                                <input value={contact.lastName} onChange={(e) => setContact({...contact, lastName: e.target.value})} className="w-full border p-2 rounded-md focus:border-primary-600 focus:border-2 outline-none" type="text" required></input>
                                            </div>
                                        </div>
                                        <div className="mt-5">
                                            <div>
                                                <label className="font-medium">Email *</label>
                                                <input value={contact.email} onChange={(e) => setContact({...contact, email: e.target.value})} className="w-full border p-2 rounded-md focus:border-primary-600 focus:border-2 outline-none" type="email" required></input>
                                            </div>
                                        </div>
                                        <div className="mt-5">
                                            <div>
                                                <label className="font-medium">Lĩnh vực nghiên cứu *</label>
                                                <input value={contact.researchArea} onChange={(e) => setContact({...contact, researchArea: e.target.value})} className="w-full border p-2 rounded-md focus:border-primary-600 focus:border-2 outline-none" type="text" required></input>
                                            </div>
                                        </div>
                                        <div className="mt-5">
                                            <label className="font-medium">Lời nhắn của bạn *</label> 
                                            <textarea value={contact.messages} onChange={(e) => setContact({...contact, messages: e.target.value})} className="w-full border p-2 rounded-md focus:border-primary-600 focus:border-2 outline-none" rows={4} type="text" required></textarea>
                                        </div>
                                        <div className="mt-4">
                                            <input ref={ppRef} id="pp" type="checkbox" required />
                                            <label htmlFor="pp" className="font-medium mx-5">Tôi đồng ý với chính sách bảo mật *</label>
                                        </div>
                                        <div className="mt-5">
                                            <button onClick={handleStep1} className="bg-primary-500 text-white py-2 px-5 rounded-md font-semibold">Gửi</button>
                                        </div>
                                    </div>
                                </form>
                            </div>    
                        ) : (
                            <div>
                                <h3 className="text-xl font-bold mt-5">Vui lòng xác nhận thông tin:</h3>
                                <div className="mt-7">
                                    <div className="flex mt-2 gap-3">
                                        <div className="w-1/4">Giới tính</div>
                                        <div className="w-3/4">{contact.gender}</div>
                                    </div>
                                    <div className="flex mt-2 gap-3">
                                        <div className="w-1/4">Tiêu đề</div>
                                        <div className="w-3/4">{contact.title}</div>
                                    </div>
                                    <div className="flex mt-2 gap-3">
                                        <div className="w-1/4">Họ</div>
                                        <div className="w-3/4">{contact.firstName}</div>
                                    </div>
                                    <div className="flex mt-2 gap-3">
                                        <div className="w-1/4">Tên</div>
                                        <div className="w-3/4">{contact.lastName}</div>
                                    </div>
                                    <div className="flex mt-2 gap-3">
                                        <div className="w-1/4">Email</div>
                                        <div className="w-3/4">{contact.email}</div>
                                    </div>
                                    <div className="flex mt-2 gap-3">
                                        <div className="w-1/4">Lĩnh vực nghiên cứu</div>
                                        <div className="w-3/4">{contact.researchArea}</div>
                                    </div>
                                </div>
                                <div className="flex mt-2 gap-3">
                                    <div className="w-1/4">Lời nhắn của bạn</div>
                                    <div className="w-3/4">{contact.messages}</div>
                                </div>
                                <div className="mt-5">
                                    <button onClick={(e) => {e.preventDefault(); setStep1(true)}} className="px-3 py-2 text-primary-600 border-primary-600 border-2 rounded-md">Điều chỉnh thông tin</button>
                                    <button onClick={handleSubmit} className="px-3 py-2 ms-5 bg-primary-500 hover:bg-primary-600 rounded-md">Xác nhận</button>
                                </div>
                            </div>
                        )
                    ) 
                }
                {
                    errorAlert != "" && <div className="text-red mt-4">{errorAlert}</div>
                } 
                </div>
                { data && <div className="text-center mt-10 text-lg">
                    <div>
                        <Link className="underline font-semibold underline-offset-4 decoration-primary-500 decoration-4" target="_blank" href={data.term}>Điều khoản và điều kiện</Link>
                    </div>
                    <div className="mt-4">
                        <Link className="underline font-semibold underline-offset-4 decoration-primary-500 decoration-4" target="_blank" href={data.privacy}>Chính sách bảo mật</Link>
                    </div>
                </div>
            }
            </div>
        </div>
    )
}

export default ContactPage;