import prisma from "@/db/prisma";

export const GET = async(request, {params}) => {
    try {
        let EventTypes;
        if (params.id == "all") {
            EventTypes = await prisma.EventType.findMany({include: {eventTopics: true}})
        }
        else {
            EventTypes = await prisma.EventType.findUnique({where: {id: parseInt(params.id)}})
        }
        
        if (EventTypes) {
            return new Response(JSON.stringify(EventTypes), {status: 200})
        }
        else {
            return new Response("Error", {status: 500})
        }
    }
    catch (error) {
        return new Response(error, {status: 500})
    }
}

export const DELETE = async(request, {params}) => {
    try {
        const EventType = await prisma.EventType.findUnique({where: {id: parseInt(params.id)}})
        const fileName = EventType.icon.split('/').pop()
        await fetch(process.env.UPLOAD_URL, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ fileName: fileName })
        })
        const response = await prisma.EventType.delete({where: {id: parseInt(params.id)}})
        if (response) {
            return new Response("Deleted", {status: 200})
        }
        else {
            return new Response("Error", {status: 500})
        }

    }
    catch (error) {
        console.log(error)
        return new Response(error, {status: 500})
    }
}