import prisma from "@/db/prisma";

export const GET = async(request, {params}) => {
    try {
        let teachings;
        if (params.id == "all") {
            teachings = await prisma.Teaching.findMany({})
        }
        else {
            teachings = await prisma.Teaching.findUnique({where: {id: parseInt(params.id)}})
        }
        if (teachings) {
            return new Response(JSON.stringify(teachings), {status: 200})
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
        const teaching = await prisma.Teaching.findUnique({where: {id: parseInt(params.id)}})
        const fileName = teaching.thumb.split('/').pop()
        await fetch(process.env.UPLOAD_URL, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ fileName: fileName })
        })
        const response = await prisma.Teaching.delete({where: {id: parseInt(params.id)}})
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