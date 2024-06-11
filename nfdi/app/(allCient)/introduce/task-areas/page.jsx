import LinkNav from "@/components/client/LinkNav";
import "@/styles/ck.css"
export const dynamic = 'force-dynamic'
export async function generateMetadata() {
    const response = await fetch(process.env.APP_URL + "/api/settingseo/taskArea", {next: {revalidate: 3600}})
    const data = await response.json()
    const metadata = data.taskArea
    if (metadata) {
        return {
            title: metadata.title,
            description: metadata.description,
        }
    }
    return {
        title: "Nhiệm vụ",
        description: "Nhiệm vụ",
    }
}

async function getTaskArea() {
    const response = await fetch(process.env.APP_URL + "/api/content/taskArea", {next: {revalidate: 3600}})
    const data = await response.json()
    return data.taskArea
}

async function getMetadata() {
    const response = await fetch(process.env.APP_URL + "/api/settingseo/taskArea", {next: {revalidate: 3600}})
    const data = await response.json()
    const metadata = data.taskArea
    if (metadata) {
        return {
            title: metadata.title,
        }
    }
    return {
        title: "Nhiệm vụ",
    }
}



const TaskAreasPage = async () => {
    const data = await getTaskArea()
    const title = await getMetadata()
    return (
        <div>
            <LinkNav />
            <h1 className="font-extrabold md:text-5xl text-2xl mt-15">{title.title}</h1>
            <div style={{ maxWidth: "none" }} className="prose">
                <div className="ck-content" dangerouslySetInnerHTML={{ __html: data }}></div>
            </div>
        </div>
    );
}

export default TaskAreasPage;