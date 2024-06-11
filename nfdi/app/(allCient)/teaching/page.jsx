import ImageText from "@/components/client/ImageText";
import LinkNav from "@/components/client/LinkNav";
export const dynamic = 'force-dynamic'
async function getTeachings() {
    const res = await fetch(process.env.APP_URL + '/api/teaching/all', {next: {revalidate: 3600}})
    if (res.ok) {
        const data = await res.json()
        return data
    }
}

async function getData() {
    const response = await fetch(process.env.APP_URL + "/api/settingseo/teaching", {next: {revalidate: 3600}})
    const data = await response.json()
    if (data.teaching) {
        return data.teaching
    }
    return {
        title: "Giảng dạy",
        description: "Giảng dạy",
    }
}


const TeachingPage = async () => {
    const data = await getTeachings()
    const content = await getData()
    return (
        <div>
            <LinkNav />
            <h1 className="font-extrabold md:text-5xl text-2xl mt-15">{content.title}</h1>
            <div className="md:text-2xl text-sm mt-10">
                {content.description}
            </div>
            <div className="grid xl:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-20 mt-10">
                {data.map((item, index) => (
                    <div className="mx-auto">
                        <ImageText key={index} image={item.thumb} text={item.name} subText={item.description} url={item.link} newTab="true" />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default TeachingPage;