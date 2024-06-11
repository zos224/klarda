import LinkNav from "@/components/client/LinkNav";
import Member from "@/components/client/Member";
export const dynamic = 'force-dynamic'
export async function generateMetadata() {
    const response = await fetch(process.env.APP_URL + "/api/settingseo/consortium", {next: {revalidate: 3600}})
    const data = await response.json()
    const metadata = data.consortium
    if (metadata) {
        return {
            title: metadata.title,
            description: metadata.description,
        }
    }
    return {
        title: "Tập đoàn",
        description: "Tập đoàn",
    }
}

async function getConsortium() {
    const response = await fetch(process.env.APP_URL + "/api/content/consortium", {next: {revalidate: 3600}})
    const data = await response.json()
    return data.consortium
}

async function getMetadata() {
    const response = await fetch(process.env.APP_URL + "/api/settingseo/consortium", {next: {revalidate: 3600}})
    const data = await response.json()
    const metadata = data.consortium
    if (metadata) {
        return {
            title: metadata.title,
        }
    }
    return {
        title: "Tập đoàn",
    }
}

const Consortium = async () => {
    const data = await getConsortium()
    const title = await getMetadata()
    return (
        <div>
            <LinkNav />
            <h1 className="font-extrabold md:text-5xl text-2xl mt-15">{title.title}</h1>
            {
                data.map((item, index) => (
                    <div key={index}>
                        <h2 className="font-bold text-3xl mt-10">{item.role}</h2>
                        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 mt-7">
                            {item.members.map((member, index) => {
                                return (
                                    <Member key={index} member={member} />
                                )
                            })}
                        </div>
                    </div>
                ))
            }
        </div>
    );
}

export default Consortium;