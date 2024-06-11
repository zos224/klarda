import LinkNav from "@/components/client/LinkNav";
import Link from "next/link";
export const dynamic = 'force-dynamic'
async function getUCs() {
    const res = await fetch(process.env.APP_URL + '/api/use-case/all', {next: {revalidate: 3600}})
    if (res.ok) {
        const data = await res.json()
        return data
    }
}

async function getData() {
    const response = await fetch(process.env.APP_URL + "/api/settingseo/uc", {next: {revalidate: 3600}})
    const data = await response.json()
    if (data.uc) {
        return data.uc
    }
    return {
        title: "Sử dụng cơ sở hạ tầng",
        description: "Sử dụng cơ sở hạ tầng",
    }
}

const IUCPage = async () => {
    const data = await getUCs()
    const content = await getData()
    return (
        <div>
            <LinkNav />
            <h1 className="font-extrabold md:text-5xl text-2xl mt-15">{content.title}</h1>
            <div className="md:text-2xl text-base mt-10">
                {content.description}
            </div>
            <div className="md:text-xl text-base mt-10 flex flex-col gap-10">
                {data.map((item, index) => (
                    <Link key={index} className="underline underline-offset-8 decoration-primary-500 decoration-4 font-medium" href={"/infrastructure-use-cases/" + item.code + "-" + item.slug}>{item.code + " " + item.title}</Link>
                ))}
            </div>
        </div>
    )
}

export default IUCPage;