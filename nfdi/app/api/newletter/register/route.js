import prisma from "@/db/prisma"

export const POST = async (req) => {
    const data = await req.json()
    const currentMail = await prisma.EmailSend.findFirst()
    try {
        if (currentMail) {
            const dataNew = [...currentMail.listEmail, data.email]
            await prisma.EmailSend.update({
                where: {
                    id: currentMail.id
                },
                data: {
                    listEmail: dataNew
                }
            })
        } else {
            await prisma.EmailSend.create({
                data: {
                    listEmail: [data.email]
                }
            })
        }
    }
    catch (error) {
        console.log(error)
        return new Response(JSON.stringify({message: "Đã xảy ra lỗi, vui lòng thử lại sau!"}), { status: 400 })
    }
    return new Response(JSON.stringify({message: "Đăng ký thành công!"}), { status: 200 })
}