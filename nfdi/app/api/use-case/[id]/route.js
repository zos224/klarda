import prisma from "@/db/prisma";

export const GET = async(request, {params}) => {
    try {
        let ucs;
        if (params.id == "all") {
            ucs = await prisma.UseCase.findMany({})
        }
        else if (params.id == 'max5') {
            ucs = await prisma.UseCase.findMany({take: 5, orderBy: {code: 'asc'}})
        }
        else if (params.id == 'count') {
            ucs = await prisma.UseCase.findMany({})
            return new Response(ucs.length, {status: 200})
        }
        else {
            ucs = await prisma.UseCase.findUnique({where: {code: params.id.toUpperCase()}, include: {topicUCs: {include: {topic: true}}}})
            if (!ucs) {
                ucs = await prisma.UseCase.findUnique({where: {id: parseInt(params.id)}, include: {topicUCs: {include: {topic: true}}}})
            }
        }
        if (ucs) {
            return new Response(JSON.stringify(ucs), {status: 200})
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

export const POST = async(request, {params}) => {
    try {
        if (params.id == "related") {
            const body = await request.json()
            body.map(id => parseInt(id))
            const ucs = await prisma.TopicUC.findMany({where: {idTopic: {in: body}}, include: {uc: true}, take: 10})
            return new Response(JSON.stringify(ucs), {status: 200})
        }
    }
    catch (error) {
        console.log(error)
        return new Response(error, {status: 500})
    }
}

export const DELETE = async(request, {params}) => {
    try {
        const response = await prisma.UseCase.delete({where: {id: parseInt(params.id)}})
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