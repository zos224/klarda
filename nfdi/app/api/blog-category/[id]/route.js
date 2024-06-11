import prisma from "@/db/prisma"

export const GET = async(request, {params}) => {
    try {
        let BlogCategories = await prisma.BlogCategory.findMany({})
        
        
        if (BlogCategories) {
            return new Response(JSON.stringify(BlogCategories), {status: 200})
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
        const response = await prisma.BlogCategory.delete({where: {id: parseInt(params.id)}})
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