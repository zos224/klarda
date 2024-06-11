export async function generateMetadata() {
    const response = await fetch(process.env.APP_URL + "/api/settingseo/link", {next: {revalidate: 3600}})
    const data = await response.json()
    const metadata = data.link
    if (metadata) {
        return {
            title: metadata.title,
            description: metadata.description,
        }
    }
    return {
        title: "Liên kết",
        description: "Liên kết",
    }
}

const LinkLayout = ({children}) => {
    return (
        <>
           {children} 
        </>
    );
}

export default LinkLayout;