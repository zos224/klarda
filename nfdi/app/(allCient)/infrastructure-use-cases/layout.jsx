export async function generateMetadata() {
    const response = await fetch(process.env.APP_URL + "/api/settingseo/uc", {next: {revalidate: 3600}})
    const data = await response.json()
    const metadata = data.uc
    if (metadata) {
        return {
            title: metadata.title,
            description: metadata.description,
        }
    }
    return {
        title: "Trường hợp sử dụng cơ sở hạ tầng",
        description: "Trường hợp sử dụng cơ sở hạ tầng",
    }
}

const IUCLayout = ({children}) => {
    return (
        <>
           {children} 
        </>
    );
}

export default IUCLayout;