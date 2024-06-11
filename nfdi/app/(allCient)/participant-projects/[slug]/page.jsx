import LinkNav from "@/components/client/LinkNav"
import MemberPP from "@/components/client/MemberPP"
import Image from "next/image"
import Link from "next/link"
import slugify from "slugify"
async function getPP(code) {
    const res = await fetch(process.env.APP_URL + '/api/participant-project/' + code, {next: {revalidate: 3600}})
    if (res.ok) {
        const data = await res.json()
        return data
    }
}

async function getUCRelated(listIdTopic) {
    const res = await fetch(process.env.APP_URL + '/api/use-case/related', {next: {revalidate: 3600}, method: "POST", body: JSON.stringify(listIdTopic)})
    if (res.ok) {
        const data = await res.json()
        return data
    }
}
const ViewPP = async ({params}) => {
    const code = params.slug.split("-")[0]
    const pp = await getPP(code)
    const ucs = await getUCRelated(pp.topicPPs.map(topic => topic.idTopic))
    return (
        <div>
            <LinkNav />
            <div>
                <h1 className="font-extrabold text-xl mt-15">{pp.code + " " + pp.title}</h1>
                <div className="mt-5 ">     
                    {pp.user && (
                        <div>
                            <p className="text-sm font-bold">Thành viên đóng góp:</p>
                            <MemberPP key={index} member={pp.user} /> 
                        </div>
                    )
                    }
                    <p className="text-sm font-bold mt-10">Chủ đề</p>
                    <div className="flex gap-3 mt-3 flex-wrap">
                        {
                            pp.topicPPs.map((topic, index) => (
                                <Link href={`/participant-projects?topic=${slugify(topic.topic.name, { lower: true })}`} key={index} className="border border-bodydark px-4 py-2 rounded-md w-fit text-sm font-semibold cursor-pointer">{topic.topic.name}</Link>
                            )) 
                        }
                    </div>
                    <div className="bg-white p-3 rounded-md shadow-lg mt-10">
                        <p>
                            {pp.description}
                        </p>
                        <div className="mt-10 text-sm">
                            <div className="flex mt-2 gap-3 pb-2 border-b border-bodydark">
                                <div className="font-semibold w-1/4">Viết tắt:</div>
                                <div className="w-3/4">
                                    {pp.acronym}
                                </div>
                            </div>
                            <div className="flex mt-2 gap-3 pb-2 border-b border-bodydark">
                                <div className="font-semibold w-1/4">Website:</div>
                                <div className="w-3/4">
                                    <Link target="_blank" className="underline" href={pp.website}>{pp.website}</Link>
                                </div>
                            </div>
                            <div className="flex mt-2 gap-3 pb-2 border-b border-bodydark">
                                <div className="font-semibold w-1/4">Liên hệ:</div>
                                <div className="w-3/4">
                                    {pp.contact}
                                </div>
                            </div>
                            <div className="flex mt-2 gap-3 pb-2 border-b border-bodydark">
                                <div className="font-semibold w-1/4">Phân loại:</div>
                                <div className="w-3/4">
                                    {pp.dfgclassification}
                                </div>
                            </div>
                            <div className="flex mt-2 gap-3 pb-2 border-b border-bodydark">
                                <div className="font-semibold w-1/4">Nguyên liệu / Phương pháp:</div>
                                <div className="w-3/4">
                                    {pp.material}
                                </div>
                            </div>
                            <div className="flex mt-2 gap-3 pb-2 ">
                                <div className="font-semibold w-1/4">Thành tựu:</div>
                                <div className="w-3/4">
                                    {pp.engagement}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-8 flex gap-10 lg:flex-row-reverse flex-col">
                        <div className="lg:w-7/12 w-full">
                            <Image className="rounded-md w-full" src={pp.image} width={1000} height={800}></Image>
                        </div>
                        <div className="lg:w-5/12 w-full">
                            <p className="text-lg">Các trường hợp sử dụng liên quan</p>
                            <ul className="list-disc ms-5 lg:text-lg text-base mt-5">
                                {ucs.map((uc, index) => (
                                    <li key={index} className="underline underline-offset-4 decoration-primary-500 decoration-4  mt-5 font-medium"><Link href={"/infrastructure-use-cases/" + uc.uc.code + "-" + uc.uc.slug}>{uc.uc.code + ": " + uc.uc.title}</Link></li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewPP