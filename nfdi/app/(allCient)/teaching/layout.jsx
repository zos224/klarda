export async function generateMetadata() {
    const response = await fetch(process.env.APP_URL + "/api/settingseo/teaching", {next: {revalidate: 3600}})
    const data = await response.json()
    const metadata = data.teaching
    if (metadata) {
        return {
            title: metadata.title,
            description: metadata.description,
        }
    }
    return {
        title: "Giảng dạy",
        description: "Giảng dạy",
    }
}

const TeachingLayout = ({children}) => {
    return (
        <>
           {children} 
        </>
    );
}

export default TeachingLayout;