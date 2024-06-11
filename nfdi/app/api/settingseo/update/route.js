import prisma from "@/db/prisma"

export const POST = async (req) => {
    const data = await req.json()
    const currentSEO = await prisma.SettingSEO.findFirst()
    let dataNew 
    if (currentSEO) {
        dataNew = await prisma.SettingSEO.update({
            where: {
                id: currentSEO.id
            },
            data: {
                ...data
            }
        })
    } else {
        dataNew = await prisma.SettingSEO.create({
            data: {
                ...data
            }
        })
    }
    return new Response(JSON.stringify(dataNew), { status: 200 })
}