export async function generateMetadata({params}) {
    const response = await fetch(process.env.APP_URL + "/api/blog/" + params.slug, {next: {revalidate: 3600}})
    const uc = await response.json()
    return {
        title: uc.title,
        description: uc.description,
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