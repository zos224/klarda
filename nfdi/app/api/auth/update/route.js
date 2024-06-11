import prisma from "@/db/prisma"
import bcrypt from 'bcrypt';
import moment from "moment-timezone";

export const POST = async (request) => {
    const contentType = request.headers.get('Content-Type')
    if (contentType.includes('application/json')) {
        const data = await request.json()
        const { id, ...dataUpdate } = data
        if (dataUpdate.password) {
            const salt = await bcrypt.genSalt(10)
            const hashPassword = await bcrypt.hash(dataUpdate.password, salt)
            dataUpdate.password = hashPassword
        }
        if (dataUpdate.birthday) {
            dataUpdate.birthday = moment.tz(dataUpdate.birthday, "Asia/Ho_Chi_Minh").format("MM-DD-YYYY")
        }
        try {
            const user = await prisma.User.update({
                where: {id: id},
                data: dataUpdate
            })
            return new Response(JSON.stringify(user), {status: 200})
        }
        catch (error) {
            console.log(error)
            return new Response("Đã xảy ra lỗi! Vui lòng thử lại.", {status: 500})
        }
    }
    else if (contentType.includes('multipart/form-data')) {
        const formData = await request.formData()
        const id = formData.get('id')
        const avatar = formData.get('avatar')
        const user = await prisma.User.findUnique({where: {id: parseInt(id)}})
        if (avatar instanceof File) {
            if (user.avatar !== null) {
                const fileName = user.avatar.split('/').pop()
    
                await fetch(process.env.UPLOAD_URL, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ fileName: fileName })
                })
            }
            const formData1 = new FormData()
            formData1.append('upload', avatar)
            const response = await fetch(process.env.UPLOAD_URL, {
                method: 'POST',
                body: formData1
            })
            const data = await response.json()
            const update = await prisma.User.update({where: {id: parseInt(id)}, data: {avatar: data.url}})
            return new Response(JSON.stringify(update), {status: 200})
        }
    }
    else {
        console.log(contentType)
        return new Response("Đã xảy ra lỗi! Vui lòng thử lại.", {status: 500})
    }
}