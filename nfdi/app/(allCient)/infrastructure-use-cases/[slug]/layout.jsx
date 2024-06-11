export async function generateMetadata({params}) {
    const code = params.slug.split("-")[0]
    const response = await fetch(process.env.APP_URL + "/api/use-case/" + code, {next: {revalidate: 3600}})
    const uc = await response.json()
    return {
        title: uc.code + " - " + uc.title,
        description: uc.description,
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