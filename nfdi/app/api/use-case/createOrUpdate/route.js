import prisma from '@/db/prisma'
import slugify from 'slugify'

export const POST = async (req) => {
    let uc = {
        title: '',
        description: '',
        mainReq: '',
        mainRelated: '',
        otherRelated: '',
        possibleConn: '',
        material: '',
        mainSuccess: '',
        addedValue: '',
        code: ''
    }

    const formData = await req.formData();
    const id = parseInt(formData.get('id'))
    uc.title = formData.get('title')
    uc.description = formData.get('description')
    uc.mainReq = formData.get('mainReq')
    uc.mainRelated = formData.get('mainRelated')
    uc.otherRelated = formData.get('otherRelated')
    uc.possibleConn = formData.get('possibleConn')
    uc.material = formData.get('material')
    uc.mainSuccess = formData.get('mainSuccess')
    uc.addedValue = formData.get('addedValue')
    uc.code = formData.get('code')
    const topics = JSON.parse(formData.get('topicUCs'))
    uc.slug = slugify(uc.title, {
        locale: 'vi',
        lower: true
    })

    try {
        if (uc.code == "") {
            const maxCode = await prisma.UseCase.findFirst({orderBy: {code: 'desc'}})
            if (maxCode && maxCode.code != "") {
                const code = parseInt(maxCode.code.slice(3)) + 1
                uc.code = 'IUC' + code.toString().padStart(2, '0')
            }
            else {
                uc.code = 'IUC01'
            }
        }
        if (id) {
            const updateduc = await prisma.UseCase.update({ where: { id: id }, data: uc })
            await prisma.TopicUC.deleteMany({where: {idUC: id}})
            for (let i = 0; i < topics.length; i++) {
                const newTopicuc = await prisma.TopicUC.create({ data: { idTopic: parseInt(topics[i].idTopic), idUC: id } })
            }
            if (updateduc) {
                return new Response("OK", {status: 200})
            }
            else {
                return new Response("Không tìm thấy dự án", {status: 500})
            }
        }
        else {
            const newuc = await prisma.UseCase.create({ data: uc })
            for (let i = 0; i < topics.length; i++) {
                const newTopicuc = await prisma.TopicUC.create({ data: { idTopic: parseInt(topics[i].idTopic), idUC: newuc.id } })
            }
            if (newuc) {
                return new Response("OK", {status: 200})
            }
        }
    }
    catch (error) {
        return new Response(error, {status: 500})
    }
}