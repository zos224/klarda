import prisma from "@/db/prisma";

export const POST = async (req) => {
    let BlogCategory = {
        name: '',
    }
    const formData = await req.formData();
    const idValue = formData.get('id');
    const id = idValue ? parseInt(idValue, 10) : null;
    BlogCategory.name = formData.get('name');
    try {
        let newBlogCategory;
        if (id && !isNaN(id)) {
            newBlogCategory  = await prisma.BlogCategory.update({ where: { id: id }, data: BlogCategory});
        }
        else {
            newBlogCategory = await prisma.BlogCategory.create({ data: BlogCategory });
        }
        return new Response(JSON.stringify(newBlogCategory), { status: 200 })
    }
    catch (error) {
        return new Response(error, {status: 500})
    }
}