import prisma from "@/db/prisma"

export const GET = async(request, {params}) => {
    try {
        let Links
        if (params.id == "all") {
            Links = await prisma.Link.findMany({})
        }
        else {
            Links = await prisma.Link.findUnique({where: {id: parseInt(params.id)}})
        }
        
        if (Links) {
            return new Response(JSON.stringify(Links), {status: 200})
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
        const response = await prisma.Link.delete({where: {id: parseInt(params.id)}})
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