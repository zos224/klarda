import prisma from "@/db/prisma"

export const GET = async (req, {params}) => {
    if (params.id == "all") {
        const users = await prisma.User.findMany({})
        return new Response(JSON.stringify(users), { status: 200 })
    }
    else {
        const user = await prisma.User.findUnique({where: {id: parseInt(params.id)}})
        user.password = ''
        return new Response(JSON.stringify(user), { status: 200 })
    }
}