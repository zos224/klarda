import prisma from "@/db/prisma"
export const GET = async (req) => {
    const res = await prisma.EmailSend.findFirst()
    const emails = res.listEmail
    return new Response(JSON.stringify(emails), { status: 200 })
}