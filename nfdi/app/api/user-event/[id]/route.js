import prisma from "@/db/prisma"

export const GET = async (req, {params}) => {
    try {
        let userEvents
        const url = new URL(req.url)
        const type = url.searchParams.get("type")
        if (type) {
            if (type == "user") {
                userEvents = await prisma.userEvent.findMany({where: {idUser: parseInt(params.id)}, include: {event: true}})
            }
            else if (type == "event") {
                userEvents = await prisma.userEvent.findMany({where: {idEvent: parseInt(params.id)}, include: {user: true}})
                return new Response(JSON.stringify(userEvents.length), {status: 200})
            }
            else {
                userEvents = await prisma.userEvent.findMany({where: {id: parseInt(params.id)}})
            }
        } else {
            userEvents = await prisma.userEvent.findMany()
        }
        return new Response(JSON.stringify(userEvents), { status: 200 })
    } catch (error) {
        return new Response("Error", { status: 500 })
    }
}

export const POST = async (req) => {
    try {
        const {userId, eventId} = await req.json()
        const check = await prisma.userEvent.findMany({where: {idUser: parseInt(userId), idEvent: parseInt(eventId)}})
        if (check.length > 0) {
            return new Response("Joined", {status: 200})
        }
        return new Response("No", {status: 201})
    }
    catch (error) {
        return new Response("Error", { status: 500 })
    }
}

export const DELETE = async (req, {params}) => {
    try {
        const userEvent = await prisma.userEvent.delete({where: {id: parseInt(params.id)}})
        return new Response(JSON.stringify(userEvent), { status: 200 })
    } catch (error) {
        return new Response("Error", { status: 500 })
    }
}