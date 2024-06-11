"use client"
import Alert from '@/components/admin/Alert'
import SEO from '@/components/admin/SEO'
import { useEffect, useState } from 'react'
const settingSEOPage = () => {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('/api/settingseo/all')
            const result = await response.json()
            if (result) {
                setData(result)
            }
            else {
                setData({
                    about: {
                        title: "",
                        description: ""
                    },
                    aims: {
                        title: "",
                        description: ""
                    },
                    consortium: {
                        title: "",
                        description: ""
                    },
                    taskArea: {
                        title: "",
                        description: ""
                    },
                    coop: {
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
                    },
                    tool: {
                        title: "",
                        description: ""
                    },
                    event: {
                        title: "",
                        description: ""
                    },
                    teaching: {
                        title: "",
                        description: ""
                    },
                    link: {
                        title: "",
                        description: ""
                    },
                    blog: {
                        title: "",
                        description: ""
                    },
                    contact: {
                        title: "",
                        description: ""
                    },
                    openPosition: {
                        title: "",
                        description: ""
                    },
                    newPP: {
                        title: "",
                        description: ""
                    }
                })
            }
            setLoading(false)
        }
        fetchData()

    }, [])

    const [alert, setAlert] = useState({
        status: false,
        message: ""
    })

    const handleSubmit = async () => {
        const response = await fetch('/api/settingseo/update', {
            method: 'POST',
            body: JSON.stringify(data)
        })
        const result = await response.json()
        if (result) {
            setAlert({
                status: true,
                message: "Cập nhật thành công"
            })
            setData(result)
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
            <h2 className="font-bold text-xl">Cài đặt SEO</h2>
            <Alert alertInput={alert} />
        </div>
        {!loading ? (
            <div className="mt-10 w-full relative overflow-x-auto shadow-md sm:rounded-lg ">
                <SEO data={data.about} name="Giới thiệu" returnValue={(value) => setData({...data, about: value})} />
                <SEO data={data.aims} name="Mục tiêu" returnValue={(value) => setData({...data, aims: value})} />
                <SEO data={data.consortium} name="Tập đoàn" returnValue={(value) => setData({...data, consortium: value})} />
                <SEO data={data.taskArea} name="Lĩnh vực nghiên cứu" returnValue={(value) => setData({...data, taskArea: value})} />
                <SEO data={data.coop} name="Đối tác" returnValue={(value) => setData({...data, coop: value})} />
                <SEO data={data.pp} name="Dự án" returnValue={(value) => setData({...data, pp: value})} />
                <SEO data={data.newPP} name="Dự án mới" returnValue={(value) => setData({...data, newPP: value})} />
                <SEO data={data.uc} name="Trường hợp sử dụng" returnValue={(value) => setData({...data, uc: value})} />
                <SEO data={data.tool} name="Công cụ" returnValue={(value) => setData({...data, tool: value})} />
                <SEO data={data.event} name="Sự kiện" returnValue={(value) => setData({...data, event: value})} />
                <SEO data={data.teaching} name="Giảng dạy" returnValue={(value) => setData({...data, teaching: value})} />
                <SEO data={data.link} name="Liên kết hữu ích" returnValue={(value) => setData({...data, link: value})} />
                <SEO data={data.blog} name="Blog" returnValue={(value) => setData({...data, blog: value})} />
                <SEO data={data.contact} name="Liên hệ" returnValue={(value) => setData({...data, contact: value})} />
                <SEO data={data.openPosition} name="Tuyển dụng" returnValue={(value) => setData({...data, openPosition: value})} />
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
    )
}

export default settingSEOPage