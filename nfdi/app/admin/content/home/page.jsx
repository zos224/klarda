"use client"
import Alert from "@/components/admin/Alert";
import CKEditorCustom from "@/components/admin/CKEditor";
import UploadImage from "@/components/admin/UploadImage";
import { useEffect, useState } from 'react'

const ContentHomePage = () => {
    const [data, setData] = useState(null)
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('/api/content/home')
            const result = await response.json()
            if (result != null && JSON.stringify(result.home) !== "{}") {
                setData(result.home)
            }
            else {
                setData({
                    image: "",
                    content: "",
                    aims: {
                        title: "",
                        description: ""
                    },
                    consortium: {
                        title: "",
                        description: ""
                    },
                    pp: {
                        title: "",
                        description: ""
                    },
                    uc: {
                        title: "",
                        description: ""
                    }
                })
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
            body: JSON.stringify({ home: data})
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
    return (
        data && <div>
            <Alert alertInput={alert} />
            <div className="uppercase text-gray-200 font-bold mb-2">
                Nội dung trang chủ
            </div>
            <CKEditorCustom initData={data.content} setData={(value) => setData({...data, content: value})} />
            <UploadImage thumb={data.image} label={"Banner"} returnValue={(value) => setData({...data, image: value})} />
            <div className="uppercase text-gray-200 font-bold mb-2">
                Những thứ bạn cần biết về Klarda
            </div>
            <div class="w-full px-4 mx-auto">
                <div class="relative w-full mb-3">
                <label class="block uppercase text-gray-200 text-xs font-bold mb-2">
                    Tiêu đề mục tiêu
                </label>
                <input value={data.aims.title} type="text" placeholder="Tiêu đề" onChange={(e) => setData({...data, aims: {...data.aims, title: e.target.value}})} class="border-0 px-3 py-3 placeholder-graydark text-black dark:bg-bodydark bg-white rounded text-sm shadow-4 focus:outline-none focus:ring w-full ease-linear transition-all duration-150" required />
                </div>
            </div>
            <div class="w-full px-4 mx-auto">
                <div class="relative w-full mb-3">
                <label class="block uppercase text-gray-200 text-xs font-bold mb-2">
                    Mô tả mục tiêu
                </label>
                <input value={data.aims.description} type="text" placeholder="Mô tả" onChange={(e) => setData({...data, aims: {...data.aims, description: e.target.value}})} class="border-0 px-3 py-3 placeholder-graydark text-black dark:bg-bodydark bg-white rounded text-sm shadow-4 focus:outline-none focus:ring w-full ease-linear transition-all duration-150" required />
                </div>
            </div>
            <div class="w-full px-4 mx-auto mt-10">
                <div class="relative w-full mb-3">
                <label class="block uppercase text-gray-200 text-xs font-bold mb-2">
                    Tiêu đề thành viên
                </label>
                <input value={data.consortium.title} type="text" placeholder="Tiêu đề" onChange={(e) => setData({...data, consortium: {...data.consortium, title: e.target.value}})} class="border-0 px-3 py-3 placeholder-graydark text-black dark:bg-bodydark bg-white rounded text-sm shadow-4 focus:outline-none focus:ring w-full ease-linear transition-all duration-150" required />
                </div>
            </div>
            <div class="w-full px-4 mx-auto">
                <div class="relative w-full mb-3">
                <label class="block uppercase text-gray-200 text-xs font-bold mb-2">
                    Mô tả thành viên
                </label>
                <input value={data.consortium.description} type="text" placeholder="Mô tả" onChange={(e) => setData({...data, consortium: {...data.consortium, description: e.target.value}})} class="border-0 px-3 py-3 placeholder-graydark text-black dark:bg-bodydark bg-white rounded text-sm shadow-4 focus:outline-none focus:ring w-full ease-linear transition-all duration-150" required />
                </div>
            </div>
            <div class="w-full px-4 mx-auto mt-10">
                <div class="relative w-full mb-3">
                <label class="block uppercase text-gray-200 text-xs font-bold mb-2">
                    Tiêu đề dự án
                </label>
                <input value={data.pp.title} type="text" placeholder="Tiêu đề" onChange={(e) => setData({...data, pp: {...data.pp, title: e.target.value}})} class="border-0 px-3 py-3 placeholder-graydark text-black dark:bg-bodydark bg-white rounded text-sm shadow-4 focus:outline-none focus:ring w-full ease-linear transition-all duration-150" required />
                </div>
            </div>
            <div class="w-full px-4 mx-auto">
                <div class="relative w-full mb-3">
                <label class="block uppercase text-gray-200 text-xs font-bold mb-2">
                    Mô tả dự án
                </label>
                <input value={data.pp.description} type="text" placeholder="Mô tả" onChange={(e) => setData({...data, pp: {...data.pp, description: e.target.value}})} class="border-0 px-3 py-3 placeholder-graydark text-black dark:bg-bodydark bg-white rounded text-sm shadow-4 focus:outline-none focus:ring w-full ease-linear transition-all duration-150" required />
                </div>
            </div>
            <div class="w-full px-4 mx-auto mt-10">
                <div class="relative w-full mb-3">
                <label class="block uppercase text-gray-200 text-xs font-bold mb-2">
                    Tiêu đề sử dụng
                </label>
                <input value={data.uc.title} type="text" placeholder="Tiêu đề" onChange={(e) => setData({...data, uc: {...data.uc, title: e.target.value}})} class="border-0 px-3 py-3 placeholder-graydark text-black dark:bg-bodydark bg-white rounded text-sm shadow-4 focus:outline-none focus:ring w-full ease-linear transition-all duration-150" required />
                </div>
            </div>
            <div class="w-full px-4 mx-auto">
                <div class="relative w-full mb-3">
                <label class="block uppercase text-gray-200 text-xs font-bold mb-2">
                    Mô tả sử dụng
                </label>
                <input value={data.uc.description} type="text" placeholder="Mô tả" onChange={(e) => setData({...data, uc: {...data.uc, description: e.target.value}})} class="border-0 px-3 py-3 placeholder-graydark text-black dark:bg-bodydark bg-white rounded text-sm shadow-4 focus:outline-none focus:ring w-full ease-linear transition-all duration-150" required />
                </div>
            </div>
            <div className="text-center my-5">
                <button onClick={handleSubmit} className="bg-black dark:bg-white text-white dark:text-black px-4 py-2 rounded-md">Xác nhận</button>
            </div>
        </div>
    );
}

export default ContentHomePage;