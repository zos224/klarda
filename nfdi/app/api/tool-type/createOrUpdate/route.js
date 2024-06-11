import prisma from "@/db/prisma";

export const POST = async (req) => {
    let ToolType = {
        name: '',
    }
    const formData = await req.formData();
    const idValue = formData.get('id');
    const id = idValue ? parseInt(idValue, 10) : null;
    ToolType.name = formData.get('name');
    try {
        let newToolType;
        if (id && !isNaN(id)) {
            newToolType  = await prisma.ToolType.update({ where: { id: id }, data: ToolType});
        }
        else {
            newToolType = await prisma.ToolType.create({ data: ToolType });
        }
        return new Response(JSON.stringify(newToolType), { status: 200 })
    }
    catch (error) {
        return new Response(error, {status: 500})
    }
}