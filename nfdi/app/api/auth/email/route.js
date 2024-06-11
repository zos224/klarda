import nodemailer from 'nodemailer'
export const POST = async (request) => {
    const {email, otp} = await request.json()
    try {
        const transporter = nodemailer.createTransport({
            // host: 'mail.privateemail.com',
            // port: 465,
            // secure: true,
            service: 'gmail',
            auth: {
                user: process.env.SMTP_EMAIL,
                pass: process.env.SMTP_PASSWORD,
            }, 
        })
        const mailOptions = {
            from: process.env.SMTP_EMAIL,
            to: email,
            subject: 'Mã xác nhận Klarda',
            html: "<h1>Xin chào! Để xác nhận tài khoản Klarda của bạn, vui lòng nhập mã OTP bạn nhận được phía dưới.</h1> <br> <p>Mã xác nhận của bạn là: " + otp + "</p> <p>Lưu ý mã chỉ có tác dụng trong 5 phút!</p> <br> <p>Cảm ơn bạn đã sử dụng dịch vụ của Klara!</p>",
        }
        transporter.sendMail(mailOptions)

        return new Response("Success!", {status: 200})
    }
    catch (error) {
        return new Response("Error!", {status: 500})
    }
}