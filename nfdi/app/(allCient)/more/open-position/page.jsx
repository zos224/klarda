import LinkNav from "@/components/client/LinkNav";
import moment from "moment-timezone";
import "@/styles/ck.css"
export const dynamic = 'force-dynamic'
async function getOPs() {
    const res = await fetch(process.env.APP_URL + '/api/open-position/all', {next: {revalidate: 3600}})
    if (res.ok) {
        const data = await res.json()
        return data
    }
}

async function getData() {
    const response = await fetch(process.env.APP_URL + "/api/settingseo/openPosition", {next: {revalidate: 3600}})
    const data = await response.json()
    if (data.openPosition) {
        return data.openPosition
    }
    return {
        title: "Tuyển dụng",
        description: "Tuyển dụng",
    }
}


const OpenPositionPage = async () => {
    const data = await getOPs()
    const content = await getData()
    return (
        <div>
            <LinkNav />
            <h1 className="font-extrabold md:text-5xl text-2xl mt-15">{content.title}</h1>
            <div className="md:text-2xl text-sm mt-10">
                {content.description}
            </div>
            <div className="rounded-lg shadow-md mt-10 overflow-auto">
                <table className="text-left w-full min-w-230">
                    <thead className="">
                        <tr className="bg-whiten">
                            <th className="px-4 py-3">Công ty</th>
                            <th className="px-4 py-3">Mô tả công việc</th>
                            <th className="px-4 py-3">Lĩnh vực</th>
                            <th className="px-4 py-3">Hạn chót</th>
                            <th className="px-4 py-3">Liên hệ</th>
                        </tr>
                    </thead>
                    <tbody className="text-left text-sm">
                        {
                            data.map((item, index) => (
                                <tr key={index}>
                                    <td className="px-4 py-3 border-t border-bodydark1 font-semibold">{item.company}</td>
                                    <td className="px-4 py-3 border-t border-bodydark1">{item.jobDes}</td>
                                    <td className="px-4 py-3 border-t border-bodydark1">{item.category}</td>
                                    <td className="px-4 py-3 border-t border-bodydark1">{moment.tz(item.onlineSince, "Asia/Ho_Chi_Minh").format("HH:mm DD/MM/YYYY")}</td>
                                    <td className="px-4 py-3 border-t border-bodydark1">
                                        <div className="prose ck-content" style={{ maxWidth: "none" }} dangerouslySetInnerHTML={{ __html: item.contact }}></div>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default OpenPositionPage;