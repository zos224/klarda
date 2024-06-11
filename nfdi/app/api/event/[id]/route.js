import prisma from "@/db/prisma";

export const GET = async(request, {params}) => {
    try {
        let Event;
        if (params.id == "all") {
            Event = await prisma.Event.findMany({})
        }
        else if (params.id == "approved") { 
            Event = await prisma.Event.findMany({where: {status: true}, include: {eventType: true, eEventTopics: {include: {eventTopic: true}}}})
        }
        else if (params.id == "unapproved") {
            Event = await prisma.Event.findMany({where: {status: false}, include: {eventType: true, eEventTopics: {include: {eventTopic: true}}}})
        }
        else if (params.id == "upcoming") {
            Event = await prisma.Event.findMany({where: {startDateTime: {gte: new Date()}, status: true}, include: {eventType: true, eEventTopics: {include: {eventTopic: true}}, userEvents: true}})
        }
        else if (params.id == "ordertime") {
            Event = await prisma.Event.findMany({where: {status: true}, orderBy: {startDateTime: 'desc'}, include: {eventType: true, eEventTopics: {include: {eventTopic: true}}, userEvents: true}})
        }
        else if (params.id == "byuser") {
            const url = new URL(request.url)
            const user = url.searchParams.get("user")
            Event = await prisma.Event.findMany({where: {idUser: parseInt(user)}})
        }
        else {
            Event = await prisma.Event.findFirst({where: {slug: params.id}, include: {eventType: true, eEventTopics: {include: {eventTopic: true}}, eventPersons: true, programs: {include: {icon: true}}}})
            if (!Event) {
                Event = await prisma.Event.findUnique({where: {id: parseInt(params.id)}, include: {eventType: true, eEventTopics: {include: {eventTopic: true}}, eventPersons: true, programs: {include: {icon: true}}}})
            } 
        }
        
        if (Event) {
            return new Response(JSON.stringify(Event), {status: 200})
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

export const DELETE = async(request, {params}) => {
    try {
        const programs = await prisma.Program.findMany({where: {idEvent: parseInt(params.id)}})
        for (let program of programs) {
            const fileName = program.icon.split('/').pop()
            await fetch(process.env.UPLOAD_URL, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ fileName: fileName })
            })
        }
        const response = await prisma.Event.delete({where: {id: parseInt(params.id)}})
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