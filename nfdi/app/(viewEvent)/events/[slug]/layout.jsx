import Provider from "@/components/client/Provider"
import "@/styles/globals.css"

export async function generateMetadata({params}) {
    const response = await fetch(process.env.APP_URL + "/api/event/" + params.slug, {next: {revalidate: 3600}})
    const event = await response.json()
    return {
        title: event.title,
        description: event.description,
    }
}

const ViewEventLayout  = ({children}) => {
    return (
        <Provider>
            {children}
        </Provider>
    )
}

export default ViewEventLayout