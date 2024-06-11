import prisma from "@/db/prisma";
import fs from "fs";
export const POST = async (req) => {
    let teaching = {
        name: '',
        description: "",
        thumb: '',
        link: '',
    }
    const formData = await req.formData();
    const idValue = formData.get('id');
    const id = idValue ? parseInt(idValue, 10) : null;
    teaching.name = formData.get('name');
    teaching.description = formData.get('description');
    teaching.thumb = formData.get('thumb');
    teaching.link = formData.get('link');
    const imageUpload = formData.get('image-upload')
    try {
        if (imageUpload instanceof File) {
            if (teaching.thumb !== '') {
                const fileName = blog.thumb.split('/').pop()
    
                await fetch(process.env.UPLOAD_URL, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ fileName: fileName })
                })
            }
            const formData = new FormData()
            formData.append('upload', imageUpload)
            const response = await fetch(process.env.UPLOAD_URL, {
                method: 'POST',
                body: formData
            })
            const data = await response.json()
            teaching.thumb = data.url
        }
        let newteaching;
        if (id && !isNaN(id)) {
            newteaching  = await prisma.Teaching.update({ where: { id: id }, data: teaching});
        }
        else {
            newteaching = await prisma.Teaching.create({ data: teaching });
        }
        return new Response(JSON.stringify(newteaching), { status: 200 })
    }
    catch (error) {
        return new Response(error, {status: 500})
    }
}