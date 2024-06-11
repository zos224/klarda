import prisma from "@/db/prisma"
export const POST = async (request) => {
    const setting = await request.json()
    try {
        const currentSetting = await prisma.Setting.findFirst()
        setting.view = currentSetting ? parseInt(currentSetting.view) : 0
        await prisma.Setting.deleteMany()
        const response = await prisma.Setting.create({data: setting})
        return new Response(JSON.stringify(response), {status: 200})
    }
    catch (error) {
        console.log(error)
        return new Response("Error", {status: 500})
    }
}

export const GET = async (request) => {
    try {
        const settings = await prisma.Setting.findFirst()
        return new Response(JSON.stringify(settings), {status: 200})
    }
    catch (error) {
        return new Response("Error", {status: 500})
    }
}

export const PUT = async (request) => {
    try {
        const setting = await prisma.Setting.findFirst()
        const data = {
            view: parseInt(parseInt(setting.view) + 1),
        }
        const response = await prisma.Setting.update({where: {id: setting.id}, data: data})
        return new Response("OK", {status: 200})
    }
    catch (error) {
        return new Response("Error", {status: 500})
    }
}