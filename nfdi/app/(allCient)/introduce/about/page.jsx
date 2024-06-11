import LinkNav from "@/components/client/LinkNav";
import "@/styles/ck.css"
export const dynamic = 'force-dynamic'
export async function generateMetadata() {
    const response = await fetch(process.env.APP_URL + "/api/settingseo/about", {next: {revalidate: 3600}})
    const data = await response.json()
    const metadata = data.about
    if (metadata) {
        return {
            title: metadata.title,
            description: metadata.description,
        }
    }
    return {
        title: "Giới thiệu",
        description: "Giới thiệu",
    }
}

async function getContent() {
    const response = await fetch(process.env.APP_URL + "/api/content/about", {next: {revalidate: 3600}})
    const data = await response.json()
    return data.about
}

const About = async () => {
    const content = await getContent()
    return (
        <div>
            <LinkNav />
            <div style={{ maxWidth: "none" }} dangerouslySetInnerHTML={{ __html: content }} className="mt-20 prose ck-content">
            </div>
        </div>
    );
}

export default About;