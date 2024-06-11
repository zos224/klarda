import prisma from "@/db/prisma";

export const POST = async (req) => {
    let tool = {
        name: '',
        description: "",
        affilations: '',
        tags: '',
        link: '',
        idToolType: 0
    }
    const formData = await req.formData();
    const idValue = formData.get('id');
    const id = idValue ? parseInt(idValue, 10) : null;
    tool.name = formData.get('name');
    tool.description = formData.get('description');
    tool.affilations = formData.get('affilations');
    tool.tags = formData.get('tags');
    tool.link = formData.get('link');
    tool.idToolType = parseInt(formData.get('idToolType'));
    try {
        let newtool;
        if (id && !isNaN(id)) {
            newtool  = await prisma.Tool.update({ where: { id: id }, data: tool});
        }
        else {
            newtool = await prisma.Tool.create({ data: tool });
        }
        return new Response(JSON.stringify(newtool), { status: 200 })
    }
    catch (error) {
        return new Response(error, {status: 500})
    }
}