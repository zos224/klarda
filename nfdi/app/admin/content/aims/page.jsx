"use client"
import Alert from "@/components/admin/Alert";
import CKEditorCustom from "@/components/admin/CKEditor";
import UploadImage from "@/components/admin/UploadImage";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from 'react'
import slugify from "slugify";

const ContentAimsPage = () => {
    const [data, setData] = useState(null)
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('/api/content/aims')
            const result = await response.json()
            if (result != null && JSON.stringify(result.aims) !== "{}") {
                setData(result.aims)
            }
            else {
                setData({
                    content: "",
                    subContent: []
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
            body: JSON.stringify({ aims: data})
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

    const addSubContent = () => {
        const newData = {
            ...data,
            subContent: [
                ...data.subContent,
                {
                    title: "",
                    content: "",
                    image: "",
                    slug: ""
                }
            ]
        };
        setData(newData);
    }

    return (
        data &&
        <div>
            <Alert alertInput={alert} />
            <div className="uppercase text-gray-200 font-bold mb-2">
                Nội dung chính trang mục tiêu
            </div>
            <CKEditorCustom initData={data.content} setData={(value) => setData({...data, content: value})} />
            <div className="flex justify-between items-center mt-5">
                <div className="uppercase text-gray-200 font-bold">
                    Nội dung phụ
                </div>
                <div>
                    <button onClick={addSubContent} className="bg-black dark:bg-white text-white dark:text-black px-4 py-2 rounded-md">Thêm nội dung phụ</button>
                </div>
            </div>
            <div>
                {data.subContent.map((item, index) => (
                    <div key={index} className="my-5 relative border p-4 rounded-md dark:border-white border-black">
                        <div className="absolute top-0 right-0 bg-red text-white p-1 rounded-md cursor-pointer" onClick={(e) => {
                            const newData = {
                                ...data,
                                subContent: data.subContent.filter((subItem, subIndex) => subIndex !== index)
                            };
                            setData(newData);}}>
                            <XMarkIcon className="w-6 h-6" />
                        </div>
                        <div className="uppercase text-gray-200 font-bold mb-2">
                            Tiêu đề
                        </div>
                        <input type="text" value={item.title} onChange={(e) => {
                            const newData = {
                                ...data,
                                subContent: data.subContent.map((subItem, subIndex) =>
                                    subIndex === index ? { ...subItem, title: e.target.value, slug: slugify(e.target.value, {
                                        locale: 'vi',
                                        lower: true
                                    }) } : subItem
                                )
                            };
                            setData(newData);
                        }} className="w-full text-black border-2 border-gray-200 dark:border-gray-600 rounded-md p-2" />
                        <div className="uppercase text-gray-200 font-bold mt-2 mb-2">
                            Nội dung
                        </div>
                        <CKEditorCustom initData={item.content} setData={(value) => {
                                const newData = {
                                    ...data,
                                    subContent: data.subContent.map((subItem, subIndex) =>
                                        subIndex === index ? { ...subItem, content: value } : subItem
                                    )
                                };
                                setData(newData);
                            }} />
                        <UploadImage thumb={item.image} label={"Thumbnail" + index} returnValue={(value) => {
                            const newData = {
                                ...data,
                                subContent: data.subContent.map((subItem, subIndex) =>
                                    subIndex === index ? { ...subItem, image: value } : subItem
                                )
                            };
                            setData(newData);
                        }}/>
                    </div>
                ))}
            </div>
            <div className="text-center my-5">
                <button onClick={handleSubmit} className="bg-black dark:bg-white text-white dark:text-black px-4 py-2 rounded-md">Xác nhận</button>
            </div>
        </div>
    );
}

export default ContentAimsPage;