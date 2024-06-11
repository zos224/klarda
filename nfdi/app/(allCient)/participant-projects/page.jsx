"use client"
import ImageText from "@/components/client/ImageText";
import LinkNav from "@/components/client/LinkNav";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react"
import slugify from 'slugify'
export const dynamic = 'force-dynamic'
async function getPP() {
    const res = await fetch('/api/participant-project/approved')
    if (res.ok) {
        const data = await res.json()
        return data
    }
}

async function getData() {
    const response = await fetch("/api/settingseo/pp")
    const data = await response.json()
    if (data.pp) {
        return data.pp
    }
    return {
        title: "Dự án",
        description: "Dự án",
    }
}

async function getTypes() {
    const res = await fetch('/api/topic/all')
    if (res.ok) {
        const data = await res.json()
        return data
    }

}

const ParticipantProjects = () => {
    const searchParams = useSearchParams()

    const [data, setData] = useState([])
    const [showData, setShowData] = useState([])
    const [content, setContent] = useState({})
    const [type, setType] = useState([])
    const [currentType, setCurrentType] = useState("all")
    useEffect(() => {
        const fetchData = async () => {
            const data = await getPP()
            setData(data)
            const content = await getData()
            setContent(content)
            const types = await getTypes()
            setType(types)
        }
        fetchData()
    }, [])

    useEffect(() => {
        if (currentType == "all") {
            setShowData(data)
        } else {          
            setShowData(data.filter(item => 
                item.topicPPs.some(topicPP => topicPP.idTopic == currentType)
            ))
        }
    }, [currentType, data])

    useEffect(() => {
        if (searchParams.get("topic") && type.length > 0) {
            const topic = searchParams.get("topic")
            for (let i = 0; i < type.length; i++) {
                const item = type[i];
                const slug = slugify(item.name, { lower: true })
                if (slug == topic) {
                    setCurrentType(item.id)
                    break;
                }
            }
        }
    }, [searchParams, type])
    return (
        <div>
            <LinkNav />
            <h1 className="font-extrabold md:text-5xl text-2xl mt-15">{content.title}</h1>
            <div className="md:text-2xl text-sm mt-10">
            {content.description}
            </div>
            <div className="flex justify-end">
                <select value={currentType} onChange={(e) => setCurrentType(e.target.value)} className="p-2 border rounded-md">
                    <option value="all">Tất cả</option>
                    {type.map((type, index) => (
                        <option value={type.id} key={index}>{type.name}</option>
                    ))}
                </select>
            </div>
            <div className="grid xl:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-20 mt-10">
                {showData.map((item, index) => (
                    <div className="mx-auto">
                        <ImageText key={index} image={item.image} text={item.code} subText={item.title} url={"/participant-projects/" + item.code.toLowerCase() + "-" + item.slug} newTab="false"/>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ParticipantProjects;