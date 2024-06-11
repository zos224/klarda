import prisma from "@/db/prisma";

export const POST = async (req) => {
    let Topic = {
        name: '',
    }
    const formData = await req.formData();
    const idValue = formData.get('id');
    const id = idValue ? parseInt(idValue, 10) : null;
    Topic.name = formData.get('name');
    try {
        let newTopic;
        if (id && !isNaN(id)) {
            newTopic  = await prisma.Topic.update({ where: { id: id }, data: Topic});
        }
        else {
            newTopic = await prisma.Topic.create({ data: Topic });
        }
        return new Response(JSON.stringify(newTopic), { status: 200 })
    }
    catch (error) {
        return new Response(error, {status: 500})
    }
}