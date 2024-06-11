import ImageText from "@/components/client/ImageText";
import LinkNav from "@/components/client/LinkNav";
export const dynamic = 'force-dynamic'
export async function generateMetadata() {
    const response = await fetch(process.env.APP_URL + "/api/settingseo/coop", {next: {revalidate: 3600}})
    const data = await response.json()
    const metadata = data.coop
    if (metadata) {
        return {
            title: metadata.title,
            description: metadata.description,
        }
    }
    return {
        title: "Đối tác",
        description: "Đối tác",
    }
}

async function getMetadata() {
    const response = await fetch(process.env.APP_URL + "/api/settingseo/coop", {next: {revalidate: 3600}})
    const data = await response.json()
    return data.coop
}

async function getCoop() {
    const response = await fetch(process.env.APP_URL + "/api/content/coop", {next: {revalidate: 3600}});
    if (response.ok) {
        const data = await response.json();
        return data.coop
    }
    return null
}
const CoopPage = async () => {
    const metadata = await getMetadata()    
    const coop = await getCoop()
    return (
        <div>
            <LinkNav />
            <h1 className="font-extrabold md:text-5xl text-2xl mt-15">{metadata.title}</h1>
            <div className="text-2xl font-semibold mt-10">
                {metadata.description}
            </div>
            <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-20 mt-10">
                {coop.map((item, index) => (
                    <ImageText key={index} image={item.image} text={item.acronym} subText={item.name} url={item.website} newTab="true"/>
                ))}
            </div>
        </div>
    );
}

export default CoopPage;