import prisma from "@/db/prisma"

export const POST = async (req) => {
    const data = await req.json()
    const currentContent = await prisma.Content.findFirst()
    let dataNew 
    if (currentContent) {
        dataNew = await prisma.Content.update({
            where: {
                id: currentContent.id
            },
            data: {
                ...data
            }
        })
    } else {
        dataNew = await prisma.Content.create({
            data: {
                ...data
            }
        })
    }
    return new Response(JSON.stringify(dataNew), { status: 200 })
}