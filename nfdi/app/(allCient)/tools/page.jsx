import Link from "next/link"

const { default: LinkNav } = require("@/components/client/LinkNav")
export const dynamic = 'force-dynamic'
export async function generateMetadata() {
    const response = await fetch(process.env.APP_URL + "/api/settingseo/tool", {next: {revalidate: 3600}})
    const data = await response.json()
    const metadata = data.tool
    if (metadata) {
        return {
            title: metadata.title,
            description: metadata.description,
        }
    }
    return {
        title: "Công cụ",
        description: "Công cụ",
    }
}

async function getTools() {
    const res = await fetch(process.env.APP_URL + '/api/tool-type/full', {next: {revalidate: 3600}})
    if (res.ok) {
        const data = await res.json()
        return data
    }
}

const ToolsPage = async () => {
    const data = await getTools()
    return (
        <div>
            <LinkNav />
            {
                data.map((item, index) => (
                    <div key={index}>
                        <h1 className="font-extrabold md:text-5xl text-2xl mt-15">{item.name}</h1>
                        <div className="rounded-lg shadow-md mt-10 overflow-auto">           
                            <table className="text-left w-full min-w-230 table-fixed">
                                <thead className="">
                                    <tr className="bg-whiten">
                                        <th className="px-4 py-3">Tên công cụ</th>
                                        <th className="px-4 py-3">Mô tả</th>
                                        <th className="px-4 py-3">Nguồn</th>
                                        <th className="px-4 py-3">Tags</th>
                                        <th className="px-4 py-3">Liên kết</th>
                                    </tr>
                                </thead>
                                <tbody className="text-left text-sm">
                                    {
                                        item.tools.map((tool, index) => (
                                            <tr key={index}>
                                                <td className="px-4 py-3 border-t border-bodydark1 font-semibold break-words">{tool.name}</td>
                                                <td className="px-4 py-3 border-t border-bodydark1 break-words">{tool.description}</td>
                                                <td className="px-4 py-3 border-t border-bodydark1 break-words">{tool.affilations}</td>
                                                <td className="px-4 py-3 border-t border-bodydark1 break-words">{tool.tags}</td>
                                                <td className="px-4 py-3 border-t border-bodydark1 break-words"><Link target="_blank" href={tool.link} className="text-primary-500 font-semibold">Link</Link></td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default ToolsPage