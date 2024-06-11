import ImageText from "@/components/client/ImageText";
import LinkNav from "@/components/client/LinkNav";
import Link from "next/link";
import "@/styles/ck.css"
export const dynamic = 'force-dynamic'
export async function generateMetadata() {
    const response = await fetch(process.env.APP_URL + "/api/settingseo/aims", {next: {revalidate: 3600}})
    const data = await response.json()
    const metadata = data ? data.aims : {title: "Nhiệm vụ", description: ""}
    return {
        title: metadata.title ,
        description: metadata.description,
    }
}

async function getContent() {
    const response = await fetch(process.env.APP_URL + "/api/content/aims", {next: {revalidate: 3600}})
    const data = await response.json()
    return data.aims
}

const Aims = async () => {
    const content = await getContent()
    return (
        <div>
            <LinkNav />
            <div className="mt-10">
                <div className="text-primary-500 text-xl font-medium">
                    NỘI DUNG CHÍNH
                </div>
                <div className="font-extrabold text-4xl mt-5">
                    Mục tiêu
                </div>
                <div className="flex md:flex-row flex-col mt-10 gap-20">
                    <div className={`${content.subContent.length > 0 ? "md:w-4/6 w-full" : "w-full"} `}>
                        <div className="ck-content prose" style={{ maxWidth: "none" }} dangerouslySetInnerHTML={{ __html: content.content }}>
                        </div>
                    </div>
                    {
                        content.subContent.length > 0 &&
                        <div className="md:w-2/6 w-full flex flex-col gap-20 items-center">
                            {content.subContent.map((item, index) => (
                                <ImageText key={index} image={item.image} text={item.title} url={"/introduce/aims/" + item.slug} newTab="false"/>
                            ))}
                        </div>
                    }
                </div>
            </div>
        </div>
    );
}

export default Aims;