import prisma from "@/db/prisma";

export const GET = async(request, {params}) => {
    try {
        let icons = await prisma.Icon.findMany({})
        
        if (icons) {
            return new Response(JSON.stringify(icons), {status: 200})
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
        const Icon = await prisma.Icon.findUnique({where: {id: parseInt(params.id)}})
        const fileName = Icon.icon.split('/').pop()
        await fetch(process.env.UPLOAD_URL, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ fileName: fileName })
        })
        const response = await prisma.Icon.delete({where: {id: parseInt(params.id)}})
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