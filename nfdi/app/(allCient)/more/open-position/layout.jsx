export async function generateMetadata() {
    const response = await fetch(process.env.APP_URL + "/api/settingseo/openPosition", {next: {revalidate: 3600}})
    const data = await response.json()
    const metadata = data.openPosition
    if (metadata) {
        return {
            title: metadata.title,
            description: metadata.description,
        }
    }
    return {
        title: "Vị trí tuyển dụng",
        description: "Vị trí tuyển dụng",
    }
}
const OpenPositionLayout = ({children}) => {
    return (
        <>
           {children} 
        </>
    );
}

export default OpenPositionLayout;