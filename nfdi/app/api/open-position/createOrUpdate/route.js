import prisma from "@/db/prisma";

export const POST = async (req) => {
    let openPosition = {
        company: '',
        jobDes: "",
        category: "",
        onlineSince: "",
        contact: "",
    }
    const formData = await req.formData();
    const idValue = formData.get('id');
    const id = idValue ? parseInt(idValue, 10) : null;
    openPosition.company = formData.get('company');
    openPosition.jobDes = formData.get('jobDes');
    openPosition.category = formData.get('category');
    openPosition.onlineSince = new Date(formData.get('onlineSince'));
    openPosition.contact = formData.get('contact');

    try {
        let newopenPosition;
        if (id && !isNaN(id)) {
            newopenPosition  = await prisma.openPosition.update({ where: { id: id }, data: openPosition});
        }
        else {
            newopenPosition = await prisma.openPosition.create({ data: openPosition });
        }
        return new Response(JSON.stringify(newopenPosition), { status: 200 })
    }
    catch (error) {
        return new Response(error, {status: 500})
    }
}