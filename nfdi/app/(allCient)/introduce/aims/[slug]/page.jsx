"use client"
import LinkNav from "@/components/client/LinkNav";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import '@/styles/ck.css'

const CoopAims = () => {
    const [content, setContent] = useState(null)
    const path = usePathname()
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch("/api/content/aims")
            const data = await response.json()
            const content = data.aims.subContent.find(item => item.slug === path.split("/").pop())
            setContent(content)
        }
        fetchData()
    }, [path])
    return (
        content && 
        <div>
            <LinkNav />
            <div className="mt-10">
                <div className="font-extrabold text-4xl mt-5">
                    {content.title}
                </div>
                <div className="mt-15">
                    <div style={{ maxWidth: "none" }} className="prose ck-content" dangerouslySetInnerHTML={{ __html: content.content }}>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CoopAims;