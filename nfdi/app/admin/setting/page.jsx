"use client"
import Alert from "@/components/admin/Alert";
import UploadImage from "@/components/admin/UploadImage";
import { useEffect, useState } from "react";

const SettingPage = () => {
    const [setting, setSetting] = useState({
        logo: '',
        favicon: '',
        title: '',
        description: '',
        view: 0,
        phone: "",
        email: "",
        term: "",
        privacy: ""
    })
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        const fetchSetting = async () => {
            const response = await fetch('/api/setting')
            if (response.ok) {
                const data = await response.json()
                if (data) {
                    setSetting(data)
                }
                else {
                    setSetting({
                        logo: '',
                        favicon: '',
                        title: '',
                        description: '',
                        view: 0,
                        phone: "",
                        email: "",
                        term: "",
                        privacy: ""
                    })
                }
                setLoading(false)
            }
        }
        fetchSetting()
    }, [])

    const [alert, setAlert] = useState({
        status: false,
        message: ""
    })
    const handleSubmit = async () => {
        const response = await fetch('/api/setting', {
            method: "POST",
            body: JSON.stringify(setting),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if (response.ok) {
            const data = await response.json()
            setSetting(data)
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
    return (
        <div className="w-full">
            <div className="flex justify-between">
                <h2 className="font-bold text-xl">Cài đặt trang web</h2>
                <Alert alertInput={alert}/>
            </div>
            {!loading ? (
                <div className="mt-10 w-full relative overflow-x-auto shadow-md sm:rounded-lg ">
                    <UploadImage label={"Logo"} thumb={setting.logo } returnValue={(value) => setSetting({...setting, logo: value})}/>
                    <UploadImage label={"Favicon"} thumb={setting.favicon } returnValue={(value) => setSetting({...setting, favicon: value})}/>
                    <div class="w-full px-4 mx-auto">
                        <div class="relative w-full mb-3">
                        <label class="block uppercase text-gray-200 text-xs font-bold mb-2">
                            Tiêu đề Website
                        </label>
                        <input value={setting.title} type="text" placeholder="Tiêu đề" onChange={(e) => setSetting({...setting, title: e.target.value})} class="border-0 px-3 py-3 placeholder-graydark text-black dark:bg-bodydark bg-white rounded text-sm shadow-4 focus:outline-none focus:ring w-full ease-linear transition-all duration-150" required />
                        </div>
                    </div>
                    <div class="w-full px-4 mx-auto">
                        <div class="relative w-full mb-3">
                        <label class="block uppercase text-gray-200 text-xs font-bold mb-2">
                            Mô tả Website
                        </label>
                        <textarea value={setting.description} placeholder="Mô tả" rows={3} onChange={(e) => setSetting({...setting, description: e.target.value})} class="border-0 px-3 py-3 placeholder-graydark text-black dark:bg-bodydark bg-white rounded text-sm shadow-4 focus:outline-none focus:ring w-full ease-linear transition-all duration-150" required></textarea>
                        </div>
                    </div>
                    <div class="w-full px-4 mx-auto">
                        <div class="relative w-full mb-3">
                        <label class="block uppercase text-gray-200 text-xs font-bold mb-2">
                            Số điện thoại
                        </label>
                        <input value={setting.phone} type="text" placeholder="Số điện thoại" onChange={(e) => setSetting({...setting, phone: e.target.value})} class="border-0 px-3 py-3 placeholder-graydark text-black dark:bg-bodydark bg-white rounded text-sm shadow-4 focus:outline-none focus:ring w-full ease-linear transition-all duration-150" required />
                        </div>
                    </div>
                    <div class="w-full px-4 mx-auto">
                        <div class="relative w-full mb-3">
                        <label class="block uppercase text-gray-200 text-xs font-bold mb-2">
                            Email
                        </label>
                        <input value={setting.email} type="text" placeholder="Email" onChange={(e) => setSetting({...setting, email: e.target.value})} class="border-0 px-3 py-3 placeholder-graydark text-black dark:bg-bodydark bg-white rounded text-sm shadow-4 focus:outline-none focus:ring w-full ease-linear transition-all duration-150" required />
                        </div>
                    </div>
                    <div class="w-full px-4 mx-auto">
                        <div class="relative w-full mb-3">
                            <label class="block uppercase text-gray-200 text-xs font-bold mb-2">
                                Tài liệu về điều khoản và điều kiện
                             </label>
                             <input value={setting.term} type="text" placeholder="Link tài liệu về điều khoản và điều kiện" onChange={(e) => setSetting({...setting, term: e.target.value})} class="border-0 px-3 py-3 placeholder-graydark text-black dark:bg-bodydark bg-white rounded text-sm shadow-4 focus:outline-none focus:ring w-full ease-linear transition-all duration-150" required />
                        </div>
                    </div>
                    <div class="w-full px-4 mx-auto">
                        <div class="relative w-full mb-3">
                            <label class="block uppercase text-gray-200 text-xs font-bold mb-2">
                                Tài liệu về chính sách bảo mật
                            </label>
                            <input value={setting.privacy} type="text" placeholder="Link tài liệu về chính sách bảo mật" onChange={(e) => setSetting({...setting, privacy: e.target.value})} class="border-0 px-3 py-3 placeholder-graydark text-black dark:bg-bodydark bg-white rounded text-sm shadow-4 focus:outline-none focus:ring w-full ease-linear transition-all duration-150" required />
                        </div>
                    </div>
                    <div className="text-center my-5">
                        <button onClick={handleSubmit} className="bg-black dark:bg-white text-white dark:text-black px-4 py-2 rounded-md">Xác nhận</button>
                    </div>
                </div>
            ) : (
                <div className="flex justify-center mt-4" role="status">
                    <svg aria-hidden="true" class="w-10 h-10 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                    </svg>
                    <span class="sr-only">Loading...</span>
                </div>
            )}
        </div>
    );
}

export default SettingPage;