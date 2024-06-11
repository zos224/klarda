export const dynamic = 'force-dynamic'
export async function generateMetadata() {
    const response = await fetch(process.env.APP_URL + "/api/settingseo/contact", {next: {revalidate: 3600}})
    const data = await response.json()
    const metadata = data.contact
    if (metadata) {
        return {
            title: metadata.title,
            description: metadata.description,
        }
    }
    return {
        title: "Liên hệ",
        description: "Liên hệ",
    }
}

const ContactLayout = ({children}) => {
    return (
        <>
           {children} 
        </>
    );
}

export default ContactLayout;