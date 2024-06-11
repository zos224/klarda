"use client"
import Alert from "@/components/admin/Alert";
import CKEditorCustom from "@/components/admin/CKEditor";
import { useEffect, useState } from 'react'
const ContentTaskAreaPage = () => {
    const [data, setData] = useState("")
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('/api/content/taskArea')
            const result = await response.json()
            if (result) {
                setData(result.taskArea)
            }
            else {
                setData("")
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
            body: JSON.stringify({ taskArea: data})
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
        <div>
            <Alert alertInput={alert} />
            <div className="uppercase text-gray-200 font-bold mb-2">
                Nội dung trang nhiệm vụ
            </div>
            <CKEditorCustom initData={data} setData={(value) => setData(value)} />
            <div className="text-center my-5">
                <button onClick={handleSubmit} className="bg-black dark:bg-white text-white dark:text-black px-4 py-2 rounded-md">Xác nhận</button>
            </div>
        </div>
    );
}

export default ContentTaskAreaPage;