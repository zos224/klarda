import prisma from "@/db/prisma"

export const POST = async (req) => {
    const {title, content} = await req.json()
    const mail = await prisma.Email.create({
        data: {
            title: title,
            content: content
        }
    })
    return new Response(JSON.stringify(mail), { status: 200 })
}