import prisma from "@/db/prisma";

export const POST = async (req) => {
    let Icon = {
        name: '',
        icon: '',
    }
    const formData = await req.formData();
    const idValue = formData.get('id');
    const id = idValue ? parseInt(idValue, 10) : null;
    Icon.name = formData.get('name');
    Icon.icon = formData.get('icon');
    const imageUpload = formData.get('image-upload')
    try {
        if (imageUpload instanceof File) {
            if (Icon.icon !== '') {
                const fileName = Icon.icon.split('/').pop()
    
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
            Icon.icon = data.url
        }
        let newIcon;
        if (id && !isNaN(id)) {
            newIcon  = await prisma.Icon.update({ where: { id: id }, data: Icon});
        }
        else {
            newIcon = await prisma.Icon.create({ data: Icon });
        }
        return new Response(JSON.stringify(newIcon), { status: 200 })
    }
    catch (error) {
        return new Response(error, {status: 500})
    }
}