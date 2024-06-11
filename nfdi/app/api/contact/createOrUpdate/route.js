import prisma from "@/db/prisma";

export const POST = async (req) => {
    let Contact = {
        gender: "",
        title: "",
        firstName: "",
        lastName: "",
        email: "",
        researchArea: "",
        messages: "",
        status: false
    }
    const formData = await req.formData();
    const idValue = formData.get('id');
    const id = idValue ? parseInt(idValue, 10) : null;
    Contact.gender = formData.get('gender')
    Contact.title = formData.get('title');
    Contact.firstName = formData.get('firstName');
    Contact.lastName = formData.get('lastName');
    Contact.email = formData.get('email');
    Contact.researchArea = formData.get('researchArea');
    Contact.messages = formData.get('messages');
    Contact.status = formData.get('status') === 'true';

    try {
        let newContact;
        if (id && !isNaN(id)) {
            newContact  = await prisma.Contact.update({ where: { id: id }, data: Contact});
        }
        else {
            newContact = await prisma.Contact.create({ data: Contact });
        }
        return new Response(JSON.stringify(newContact), { status: 200 })
    }
    catch (error) {
        console.log(error)
        return new Response(error, {status: 500})
    }
}