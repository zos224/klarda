import prisma from "@/db/prisma";

export const POST = async (req) => {
    let Link = {
        name: '',
        link: '',
    }
    const formData = await req.formData();
    const idValue = formData.get('id');
    const id = idValue ? parseInt(idValue, 10) : null;
    Link.name = formData.get('name');
    Link.link = formData.get('link');
    try {
        let newLink;
        if (id && !isNaN(id)) {
            newLink  = await prisma.Link.update({ where: { id: id }, data: Link});
        }
        else {
            newLink = await prisma.Link.create({ data: Link });
        }
        return new Response(JSON.stringify(newLink), { status: 200 })
    }
    catch (error) {
        return new Response(error, {status: 500})
    }
}