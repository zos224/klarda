import prisma from "@/db/prisma"
export const GET = async (req) => {
    const emails = await prisma.Email.findMany({orderBy: {id: "desc"}})
    return new Response(JSON.stringify(emails), { status: 200 })
}