import prisma from "@/db/prisma"

export const GET = async(request, {params}) => {
    try {
        let ToolTypes
        if (params.id == 'full') {
            ToolTypes = await prisma.ToolType.findMany({include: {tools: true}})
        }
        else {
            ToolTypes = await prisma.ToolType.findMany({})
        }
        
        if (ToolTypes) {
            return new Response(JSON.stringify(ToolTypes), {status: 200})
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
        const response = await prisma.ToolType.delete({where: {id: parseInt(params.id)}})
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