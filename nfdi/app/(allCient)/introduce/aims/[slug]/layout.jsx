export async function generateMetadata({params}) {
    const response = await fetch(process.env.APP_URL + "/api/content/aims", {next: {revalidate: 3600}})
    const res = await response.json()
    const data = res.aims
    const content = data.subContent.find(item => item.slug === params.slug)
    return {
        title: content.title,
        description: content.content,
    }
}

const AimsSubContentLayout = ({children}) => {
    return (
        <>
           {children} 
        </>
    );
}

export default AimsSubContentLayout;