export async function generateMetadata() {
    const response = await fetch(process.env.APP_URL + "/api/settingseo/pp", {next: {revalidate: 3600}})
    const data = await response.json()
    const metadata = data.pp
    if (metadata) {
        return {
            title: metadata.title,
            description: metadata.description,
        }
    }
    return {
        title: "Dự án",
        description: "Dự án",
    }
}

const PPLayout = ({children}) => {
    return (
        <>
           {children} 
        </>
    );
}

export default PPLayout;