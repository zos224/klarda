export const dynamic = 'force-dynamic'
export async function generateMetadata() {
    const response = await fetch(process.env.APP_URL + "/api/settingseo/event", {next: {revalidate: 3600}})
    const data = await response.json()
    const metadata = data.event
    if (metadata) {
        return {
            title: metadata.title,
            description: metadata.description,
        }
    }
    return {
        title: "Sự kiện",
        description: "Sự kiện",
    }
}
const EventsLayout = ({children}) => {
    return (
        <>
           {children} 
        </>
    );
}

export default EventsLayout;