import prisma from '@/db/prisma';
import bcrypt from 'bcrypt';

export const POST = async (request) => {
    let email, firstName, lastName, password, academicTitle, organization, department, type, gender, name, role = '';
    const formData = await request.formData();
    email = formData.get("email")
    firstName = formData.get("firstName")
    lastName = formData.get("lastName")
    password = formData.get("password")
    academicTitle = formData.get("academicTitle")
    organization = formData.get("organization")
    department = formData.get("department")
    type = formData.get("type")
    gender = formData.get("gender")
    role = formData.get("role") ? formData.get("role") : "user"
    if (!firstName && !lastName) {
        name = formData.get("name")
    }
    else {
        name = firstName + ' ' + lastName
    }
    try {
        const checkEmail = await prisma.User.findUnique({ where: {email: email} })
        if (!checkEmail) {
            const salt = await bcrypt.genSalt(10)
            const hashPassword = await bcrypt.hash(password, salt)  
            const user = await prisma.User.create({data: {
                name: name,
                email: email,
                password: hashPassword,
                academicTitle: academicTitle,
                organization: organization,
                department: department,
                type: type,
                gender: gender,
                role: role
            }})
            return new Response("Create new account succesfully!", {status: 200})
        }
        else if (checkEmail) {
            return new Response("Email đã được sử dụng!", {status: 500})
        }
        return new Response("OK", {status: 200})
    }
    catch (error) {
        console.log(error)
        return new Response("Error! Please try again", {status: 500})
    }
}
    