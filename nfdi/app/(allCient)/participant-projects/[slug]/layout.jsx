export async function generateMetadata({params}) {
    const code = params.slug.split("-")[0]
    const response = await fetch(process.env.APP_URL + "/api/participant-project/" + code, {next: {revalidate: 3600}})
    const pp = await response.json()
    return {
        title: pp.code + " - " + pp.title,
        description: pp.description,
    }
}

const PPViewLayout = ({children}) => {
    return (
        <>
           {children} 
        </>
    );
}

export default PPViewLayout;