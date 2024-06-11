import prisma from "@/db/prisma"

export const GET = async(request, {params}) => {
    try {
        let Contacts
        if (params.id == "all") {
            Contacts = await prisma.Contact.findMany({})
        }
        else if (params.id == "approved") {
            Contacts = await prisma.Contact.findMany({where: {status: true}})
        }
        else if (params.id == "unapproved") {
            Contacts = await prisma.Contact.findMany({where: {status: false}})
        }
        else {
            Contacts = await prisma.Contact.findUnique({where: {id: parseInt(params.id)}})
        }
        
        if (Contacts) {
            return new Response(JSON.stringify(Contacts), {status: 200})
        }
        else {
            return new Response("Error", {status: 500})
        }
    }
    catch (error) {
        return new Response(error, {status: 500})
    }
}

export const PATCH = async (request, {params}) => {
    try {
        const response = await prisma.Contact.update({where: {id: parseInt(params.id)}, data: {status: true}})
        if (response) {
            return new Response(JSON.stringify(response), {status: 200})
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
        const response = await prisma.Contact.delete({where: {id: parseInt(params.id)}})
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