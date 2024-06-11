import prisma from "@/db/prisma";

export const POST = async (req) => {
    let EventType = {
        name: '',
        icon: '',
    }
    const formData = await req.formData();
    const idValue = formData.get('id');
    const id = idValue ? parseInt(idValue, 10) : null;
    EventType.name = formData.get('name');
    EventType.icon = formData.get('icon');
    const imageUpload = formData.get('image-upload')
    try {
        if (imageUpload instanceof File) {
            if (EventType.icon !== '') {
                const fileName = EventType.icon.split('/').pop()
    
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
            EventType.icon = data.url
        }
        let newEventType;
        if (id && !isNaN(id)) {
            newEventType  = await prisma.EventType.update({ where: { id: id }, data: EventType, include: {eventTopics: true}});
        }
        else {
            newEventType = await prisma.EventType.create({ data: EventType });
        }
        return new Response(JSON.stringify(newEventType), { status: 200 })
    }
    catch (error) {
        return new Response(error, {status: 500})
    }
}