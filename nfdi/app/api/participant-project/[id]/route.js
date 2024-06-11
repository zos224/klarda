import prisma from "@/db/prisma";
import fs from "fs";
export const GET = async(request, {params}) => {
    try {
        let pps;
        if (params.id == "all") {
            pps = await prisma.ParticipantProject.findMany({})
        }
        else if (params.id == "approved") {
            pps = await prisma.ParticipantProject.findMany({where: {status: true}, include: {topicPPs: true}})
        }
        else if (params.id == "unapproved") {
            pps = await prisma.ParticipantProject.findMany({where: {status: false}})
        }
        else if (params.id == 'max5') {
            pps = await prisma.ParticipantProject.findMany({where: {status: true}, take: 5, orderBy: {code: 'asc'}})
        }
        else if (params.id == 'count') {
            pps = await prisma.ParticipantProject.findMany({})
            return new Response(pps.length, {status: 200})
        }
        else {
            pps = await prisma.ParticipantProject.findFirst({where: {code: params.id.toUpperCase()}, include: {topicPPs: {include: {topic: true}}, user: true}})
            if (!pps) {
                pps = await prisma.ParticipantProject.findUnique({where: {id: parseInt(params.id)}, include: {topicPPs: {include: {topic: true}}, user: true}})
            }
        }
        if (pps) {
            return new Response(JSON.stringify(pps), {status: 200})
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
            const pps = await prisma.TopicPP.findMany({where: {idTopic: {in: body}}, include: {pp: true}, take: 10})
            return new Response(JSON.stringify(pps), {status: 200})
        }
    }
    catch (error) {
        console.log(error)
        return new Response(error, {status: 500})
    }
}

export const DELETE = async(request, {params}) => {
    try {
        const participantProject = await prisma.ParticipantProject.findUnique({where: {id: parseInt(params.id)}})
        if (participantProject.image) {
            const fileName = participantProject.image.split('/').pop()
            await fetch(process.env.UPLOAD_URL, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ fileName: fileName })
            })
        }
        const response = await prisma.ParticipantProject.delete({where: {id: parseInt(params.id)}})
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