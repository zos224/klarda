import prisma from "@/db/prisma"
import bcrypt from 'bcrypt';
export const PATCH = async (req) => {
    try {
        const formData = await req.formData()
        const id = parseInt(formData.get("id"))
        const data = {
            email: formData.get("email"),
            role: formData.get("role"),
            academicTitle: formData.get("academicTitle"),
            organization: formData.get("organization"),
            department: formData.get("department"),
            type: formData.get("type"),
            password: formData.get("password"),
            name: formData.get("name"),
            gender: formData.get("gender")
        }
        const salt = await bcrypt.genSalt(10)
        data.password = await bcrypt.hash(data.password, salt) 
        const user = await prisma.User.update({where: {id: id}, data: data})
        return new Response(JSON.stringify(user), { status: 200 })
    } catch (error) {
        return new Response("Error", { status: 500 })
    }
}