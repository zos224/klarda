"use client"
import { useEffect, useState } from "react";

const SEO = ({data, name, returnValue}) => {
    const [currentData, setCurrentData] = useState({
        title: "",
        description: ""
    })
    useEffect(() => {
        setCurrentData(data)
    }, [data])

    const returnCurrentValue = () => {
        returnValue(currentData)
    }
    return (
        <div onBlur={returnCurrentValue} className="mt-7">
            <div className="uppercase text-gray-200 font-bold mb-2">
                Cài đặt SEO {name}
            </div>
            <div class="w-full px-4 mx-auto">
                <div class="relative w-full mb-3">
                <label class="block text-gray-200 font-bold mb-2">
                    Tiêu đề 
                </label>
                <input value={currentData.title} type="text" placeholder="Tiêu đề" onChange={(e) => setCurrentData({...currentData, title: e.target.value})} class="border-0 px-3 py-3 placeholder-graydark text-black dark:bg-bodydark bg-white rounded text-sm shadow-4 focus:outline-none focus:ring w-full ease-linear transition-all duration-150" required />
                </div>
            </div>
            <div class="w-full px-4 mx-auto">
                <div class="relative w-full mb-3">
                <label class="block text-gray-200 font-bold mb-2">
                    Mô tả
                </label>
                <textarea value={currentData.description} placeholder="Mô tả" rows={3} onChange={(e) => setCurrentData({...currentData, description: e.target.value})} class="border-0 px-3 py-3 placeholder-graydark text-black dark:bg-bodydark bg-white rounded text-sm shadow-4 focus:outline-none focus:ring w-full ease-linear transition-all duration-150" required></textarea>
                </div>
            </div>
        </div>
    );
}

export default SEO;