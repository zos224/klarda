import prisma from "@/db/prisma"

export const GET = async(request, {params}) => {
    try {
        let openPositions
        if (params.id == "all") {
            openPositions = await prisma.openPosition.findMany({})
        }
        else {
            openPositions = await prisma.openPosition.findUnique({where: {id: parseInt(params.id)}})
        }
        
        if (openPositions) {
            return new Response(JSON.stringify(openPositions), {status: 200})
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
        const response = await prisma.openPosition.delete({where: {id: parseInt(params.id)}})
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