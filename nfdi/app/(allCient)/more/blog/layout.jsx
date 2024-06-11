export const dynamic = 'force-dynamic'
export async function generateMetadata() {
    const response = await fetch(process.env.APP_URL + "/api/settingseo/blog", {next: {revalidate: 3600}})
    const data = await response.json()
    const metadata = data.blog
    if (metadata) {
        return {
            title: metadata.title,
            description: metadata.description,
        }
    }
    return {
        title: "Blog",
        description: "Blog",
    }
}

const BlogLayout = ({children}) => {
    return (
        <>
           {children} 
        </>
    );
}

export default BlogLayout;