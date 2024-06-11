"use client"
import { useEffect, useState } from "react";
const SubcribeEmailPage = () => {
    const [mails, setMails] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('/api/newletter/getAll')
            const result = await response.json()
            if (result) {
                setMails(result)
            }
            else {
                setMails([])
            }
        }
        fetchData()
    }, [])
    
    return (
        <div className="w-full">
            <div className="mt-5">
                <div className="font-semibold text-xl">Các mail đã đăng ký</div>
                <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-5 mt-10">
                    {mails.map((mail, index) => (
                        <div key={index} className="">
                            {mail}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default SubcribeEmailPage;