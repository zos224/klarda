import prisma from '@/db/prisma'
import bcrypt from 'bcrypt'
export const POST = async (request) => {
    const {email, password} = await request.json()
    try {
        const user = await prisma.User.findUnique({where: {email: email}})
        if (user) {
            const checkPass = await bcrypt.compare(password, user.password)
            if (checkPass)
            {
                return new Response(JSON.stringify(user), {status: 200})
            }
            else
            {
                return new Response("Wrong password!", {status: 500})
            }   
        }
        else
        {
            return new Response("Wrong email and password!", {status: 500})
        }
    }
    catch (error) {
        console.log(error)
        return new Response("Error! Please try again!", {status: 500})
    }
}