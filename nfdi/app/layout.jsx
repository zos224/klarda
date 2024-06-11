import Socket from "@/components/client/Socket"
import "@/styles/globals.css"

export async function generateMetadata() {
    const response = await fetch(process.env.APP_URL + "/api/setting", {next: {revalidate: 3600}})
    const data = await response.json()
    if (data) {
        return {
            title: data.title,
            description: data.description,
            icons: {
                icon: [
                    {
                        url: data.favicon ? data.favicon : "",
                        href: data.favicon ? data.favicon : "",
                    }
                ]
            }
        }
    }
    else {
        return {
            title: "Klarda"
        }
    }
    
}

const viewed = async () => {
    const response = await fetch(process.env.APP_URL + "/api/setting/", {
        method: "PUT"
    })
}

const RootLayout = async ({ children }) => {
    viewed()
    return (
        <html lang="en">
            <body>
                <Socket>
                    {children}
                </Socket>
            </body>
        </html>
    )
}

export default RootLayout