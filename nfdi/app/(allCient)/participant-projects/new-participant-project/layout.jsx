export const dynamic = 'force-dynamic'
export async function generateMetadata() {
    const response = await fetch(process.env.APP_URL + "/api/settingseo/newPP", {next: {revalidate: 3600}})
    const data = await response.json()
    const metadata = data.newPP
    if (metadata) {
        return {
            title: metadata.title,
            description: metadata.description,
        }
    }
    return {
        title: "Dự án mới của người tham gia",
        description: "Dự án mới của người tham gia",
    }
}
const newPPLayout = ({children}) => {
    return (
        <section>
            {children}
        </section>
    )
}

export default newPPLayout;