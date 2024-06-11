import prisma from "@/db/prisma"

export const GET = async(request, {params}) => {
    try {
        let pocs = await prisma.EventTopic.findMany({where: {idEventType: parseInt(params.id)}})
        
        if (pocs) {
            return new Response(JSON.stringify(pocs), {status: 200})
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
        const response = await prisma.EventTopic.delete({where: {id: parseInt(params.id)}})
        if (response) {
            return new Response("Deleted", {status: 200})
        }
        else {
            return new Response("Error", {status: 500})
        }

    }
    catch (error) {
        return new Response(error, {status: 500})
    }
}