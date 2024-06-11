import prisma from "@/db/prisma"

export const GET = async(request, {params}) => {
    try {
        let Tools
        if (params.id == "all") {
            Tools = await prisma.Tool.findMany({include: {toolType: true}})
        }
        else {
            Tools = await prisma.Tool.findUnique({where: {id: parseInt(params.id)}, include: {toolType: true}})
        }
        
        if (Tools) {
            return new Response(JSON.stringify(Tools), {status: 200})
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
        const response = await prisma.Tool.delete({where: {id: parseInt(params.id)}})
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