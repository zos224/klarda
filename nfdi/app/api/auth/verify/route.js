import prisma from "@/db/prisma"
import bcrypt from 'bcrypt';
export const POST = async (request) => {
    const data = await request.json()
    const {id, currentPassword} = data
    const user = await prisma.User.findUnique({where: {id: id}})
    if (user) {
        const checkPassword = await bcrypt.compare(currentPassword, user.password)
        if (checkPassword) {
            return new Response("OK", {status: 200})
        }
        return new Response("Mật khẩu không đúng!", {status: 500})
    }
}