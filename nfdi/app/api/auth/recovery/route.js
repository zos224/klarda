import prisma from "@/db/prisma"
import bcrypt from 'bcrypt'
export const PATCH = async (request) => {
    try {
        const formData = await request.formData()
        const email = formData.get('email')
        const password = formData.get('password')
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, salt)  
        const user = await prisma.User.update({where: {email: email}, data: {password: hashPassword}})
        return new Response("Change password successfully!", {status: 200})
    }
    catch {
        return new Response("Error! Please try again!", {status: 500})
    }
}