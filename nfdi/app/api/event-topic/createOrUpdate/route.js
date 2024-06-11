import prisma from "@/db/prisma";

export const POST = async (req) => {
    let evt = {
        name: '',
        idEventType: 0
    }
    const formData = await req.formData();
    const idValue = formData.get('id');
    const id = idValue ? parseInt(idValue, 10) : null;
    evt.name = formData.get('name');
    evt.idEventType = parseInt(formData.get('idParent'));
    try {
        let newevt;
        if (id && !isNaN(id)) {
            newevt  = await prisma.EventTopic.update({ where: { id: id }, data: evt});
        }
        else {
            newevt = await prisma.EventTopic.create({ data: evt });
        }
        return new Response(JSON.stringify(newevt), { status: 200 })
    }
    catch (error) {
        console.log(error)
        return new Response(error, {status: 500})
    }
}