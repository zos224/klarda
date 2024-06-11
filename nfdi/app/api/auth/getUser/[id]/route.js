import prisma from "@/db/prisma"

export const GET = async (request, {params}) => {
    const user = await prisma.User.findUnique({where: {id: parseInt(params.id)}})
    if (user) {
        return new Response(JSON.stringify(user), {status: 200})
    }
    return new Response("Not found!", {status: 404})
}