import prisma from "@/db/prisma"

export const POST = async (req) => {
    try {
        const data = await req.json()
        const userEvent = await prisma.userEvent.create({data: data})
        return new Response(JSON.stringify(userEvent), { status: 200 })
    } catch (error) {
        return new Response("Error", { status: 500 })
    }
}