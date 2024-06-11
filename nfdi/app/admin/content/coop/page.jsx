"use client";
import Alert from "@/components/admin/Alert";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from 'react'
import UploadImage from "@/components/admin/UploadImage";
export const dynamic = 'force-dynamic'
const CoopContentPage = () => {
    const [data, setData] = useState(null)
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('/api/content/coop')
            const result = await response.json()
            if (JSON.stringify(result.coop) !== "{}") {
                setData(result.coop)
            }
            else {
                setData([])
            }
        }
        fetchData()
    }, [])

    const addDoitac = () => {
        setData([...data, {name: "", website: "", acronym: "", image: ""}])
    }
    
    const handleUploadImage = (value, index) => {
        setData(data.map((item, i) =>
            i === index ? { ...item, image: value } : item
        ))
    }

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
            body: JSON.stringify({ coop: data})
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
        data && <div class="w-full px-4 mx-auto">
            <Alert alertInput={alert} />
            <div class="relative w-full mb-3">
                <div className="mt-3">
                    <div className="flex justify-between items-center">
                        <div className="text-gray-200 font-semibold uppercase">Danh sách đối tác</div>
                        <div>
                            <button onClick={addDoitac} className="bg-black dark:bg-white text-white dark:text-black px-4 py-2 rounded-md">Thêm đối tác</button>
                        </div>
                    </div>
                    <div className="mt-3">
                        {
                            data.map((item, index) => (
                                <div key={index} className="my-5 relative border p-4 rounded-md dark:border-white border-black">
                                    <div className="absolute top-0 right-0 bg-red text-white p-1 rounded-md cursor-pointer" onClick={(e) => {e.currentTarget.parentNode.remove()}}>
                                        <XMarkIcon className="w-6 h-6" />
                                    </div>
                                    <div className="">
                                        <input value={item.name} onChange={(e) => {
                                            setData(data.map((item, i) =>
                                                i === index ? { ...item, name: e.target.value } : item
                                            ))
                                        }} type="text" placeholder="Tên đối tác" class="border-0 px-3 py-3 placeholder-graydark text-black dark:bg-bodydark bg-white rounded text-sm shadow-4 focus:outline-none focus:ring w-full ease-linear transition-all duration-150" />
                                        <input value={item.website} onChange={(e) => {
                                            setData(data.map((item, i) =>
                                                i === index ? { ...item, website: e.target.value } : item
                                            ))
                                        }} type="text" placeholder="Website đối tác" class="mt-3 border-0 px-3 py-3 placeholder-graydark text-black dark:bg-bodydark bg-white rounded text-sm shadow-4 focus:outline-none focus:ring w-full ease-linear transition-all duration-150" />
                                        <input value={item.acronym} onChange={(e) => {
                                            setData(data.map((item, i) =>
                                                i === index ? { ...item, acronym: e.target.value } : item
                                            ))
                                        }} type="text" placeholder="Viết tắt tên" class="mt-3 border-0 px-3 py-3 placeholder-graydark text-black dark:bg-bodydark bg-white rounded text-sm shadow-4 focus:outline-none focus:ring w-full ease-linear transition-all duration-150" />
                                        <UploadImage label={"Hình ảnh " + index} thumb={item.image} returnValue={(value) => handleUploadImage(value, index)}/>
                                    </div>
                                </div>
                            )
                        )}
                    </div>
                    <div className="text-center my-5">
                        <button onClick={handleSubmit} className="bg-black dark:bg-white text-white dark:text-black px-4 py-2 rounded-md">Xác nhận</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CoopContentPage;

