"use client"
import LinkNav from "@/components/client/LinkNav"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import "@/styles/ck.css"
async function getUC(code) {
    const res = await fetch('/api/use-case/' + code, {next: {revalidate: 3600}})
    if (res.ok) {
        const data = await res.json()
        return data
    }
}

async function getPPRelated(listIdTopic) {
    const res = await fetch('/api/participant-project/related', {next: {revalidate: 3600}, method: "POST", body: JSON.stringify(listIdTopic)})
    if (res.ok) {
        const data = await res.json()
        return data
    }
}
const ViewIUCPage = () => {
    const [uc, setUC] = useState(null)
    const [pps, setPPs] = useState(null)
    const [loading, setLoading] = useState(true)
    const params = useParams()
    useEffect(() => {
        if (params.slug) {
            const code = params.slug.split("-")[0]
            const fetchData = async () => {
                const ucData = await getUC(code)
                const pps = await getPPRelated(ucData.topicUCs.map(topic => topic.idTopic))
                setUC(ucData)
                setPPs(pps)
            }
            fetchData()
        }
    }, [params])

    useEffect(() => {
        if (uc && pps) {
            setLoading(false)
        }
    }, [uc, pps])
    return (
         <div>
            <LinkNav />
            {
                loading ? (            
                <div className="flex justify-center mt-10" role="status">
                    <svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                    </svg>
                    <span class="sr-only">Loading...</span>
                </div>
                ) : (
                <div>
                    <h1 className="font-extrabold text-xl mt-15">{uc.code + " " + uc.title}</h1>
                    <p className="text-sm font-bold mt-10">Chủ đề</p>
                    <div className="flex gap-3 mt-3 flex-wrap">
                        {
                            uc.topicUCs.map((topic, index) => (
                                <div key={index} className="border border-bodydark px-4 py-2 rounded-md w-fit text-sm font-semibold">{topic.topic.name}</div>
                            )) 
                        }
                    </div>
                    <div style={{ maxWidth: "none" }} className="bg-white p-3 rounded-md shadow-lg mt-10 prose">
                        <p className="ck-content" dangerouslySetInnerHTML={{ __html: uc.description }}/>
                        <h3 className="text-lg font-bold mt-5">Yêu cầu chính: </h3>
                        <div className="ck-content" dangerouslySetInnerHTML={{ __html: uc.mainReq }}/>
                        <div className="mt-10 text-sm">
                            <div className=" pb-2 border-b border-bodydark">
                                <div className="flex mt-2 gap-3">
                                    <div className="font-semibold w-1/4">Lĩnh vực chính:</div>
                                    <div className="w-3/4">
                                        {uc.mainRelated}
                                    </div>
                                </div>
                                <div className="flex mt-2 gap-3">
                                    <div className="font-semibold w-1/4">Lĩnh vực khác:</div>
                                    <div className="w-3/4">
                                        {uc.otherRelated}
                                    </div>
                                </div>
                            </div>
                            <div className="flex mt-2 gap-3 pb-2 border-b border-bodydark">
                                <div className="font-semibold w-1/4">Liên quan đến: </div>
                                <div className="w-3/4">
                                    {uc.possibleConn}
                                </div>
                            </div>
                            <div className="flex mt-2 gap-3 pb-2 border-b border-bodydark">
                                <div className="font-semibold w-1/4">Tài liệu:</div>
                                <div className="w-3/4">
                                    {uc.material}
                                </div>
                            </div>
                            <div className="flex mt-2 gap-3 pb-2 border-b border-bodydark">
                                <div className="font-semibold w-1/4">Kết quả đạt được:</div>
                                <div className="w-3/4">
                                    {uc.mainSuccess}
                                </div>
                            </div>
                            <div className="flex mt-2 gap-3 pb-2 ">
                                <div className="font-semibold w-1/4">Giá trị bổ sung:</div>
                                <div className="w-3/4">
                                    {uc.addedValue}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full mt-10">
                        <p className="text-lg">Các dự án liên quan</p>
                        <ul className="list-disc ms-5 lg:text-lg text-base mt-5">
                            {pps.map((pp, index) => (
                                <li key={index} className="mt-2">
                                    <Link href={"/participant-projects/" + pp.pp.code + "-" + pp.pp.slug} className="text-primary-500 font-semibold">{pp.pp.code + " " + pp.pp.title}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                )
            }
        </div>
    )
}

export default ViewIUCPage