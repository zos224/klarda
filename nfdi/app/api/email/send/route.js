import nodemailer from 'nodemailer'
import prisma from '@/db/prisma'
export const POST = async (request) => {
    const {title, content} = await request.json()
    const res = await prisma.EmailSend.findFirst()
    const emails = res.listEmail
    try {
        emails.forEach(async (email) => {
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.SMTP_EMAIL,
                    pass: process.env.SMTP_PASSWORD,
                }, 
            })
            const mailOptions = {
                from: process.env.SMTP_EMAIL,
                to: email,
                subject: title,
                html: content,
            }
            transporter.sendMail(mailOptions)
        })

        return new Response("Success!", {status: 200})
    }
    catch (error) {
        return new Response("Error!", {status: 500})
    }
}