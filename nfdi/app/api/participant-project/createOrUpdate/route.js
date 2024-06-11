import prisma from '@/db/prisma'
import slugify from 'slugify'
export const POST = async (req) => {
    let pp = {
        title: '',
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        company: '',
        street: '',
        city: '',
        zipCode: '',
        country: '',
        description: '',
        abstract: '',
        status: 0,
        code: '',
        acronym: '',
        website: '',
        contact: '',
        dfgclassification: '',
        material: '',
        engagement: '',
        image: '',
    }

    const formData = await req.formData();
    const id = parseInt(formData.get('id'))
    if (formData.get('idUser') && formData.get('idUser') != 0) {
        pp.idUser = parseInt(formData.get('idUser'))
    }
    pp.title = formData.get('title')
    pp.firstName = formData.get('firstName')
    pp.lastName = formData.get('lastName')
    pp.email = formData.get('email')
    pp.phone = formData.get('phone')
    pp.company = formData.get('company')
    pp.street = formData.get('street')
    pp.city = formData.get('city')
    pp.zipCode = formData.get('zipCode')
    pp.country = formData.get('country')
    pp.description = formData.get('description')
    if (formData.get('abstract') instanceof File) { 
        const formData1 = new FormData()
        formData1.append('upload', formData.get('abstract'))
        const response = await fetch(process.env.UPLOAD_URL, {
            method: 'POST',
            body: formData1
        })
        const data = await response.json()
        pp.abstract = data.url
    }
    else {
        pp.abstract = formData.get('abstract')
    }
    pp.status = formData.get('status') == "true" ? true : false
    pp.acronym = formData.get('acronym')
    pp.website = formData.get('website')
    pp.contact = formData.get('contact')
    pp.dfgclassification = formData.get('dfgclassification')
    pp.material = formData.get('material')
    pp.engagement = formData.get('engagement')
    pp.image = formData.get('image')
    pp.code = formData.get('code')
    const imageUpload = formData.get('image-upload')
    const topics = JSON.parse(formData.get('topicPPs'))
    pp.slug = slugify(pp.title, {
        locale: 'vi',
        lower: true
    })

    try {
        if (imageUpload instanceof File) {
            if (pp.image !== '' && pp.image !== null && pp.image !== undefined) {
                const fileName = pp.image.split('/').pop()
    
                await fetch(process.env.UPLOAD_URL, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ fileName: fileName })
                })
            }
            const formData = new FormData()
            formData.append('upload', imageUpload)
            const response = await fetch(process.env.UPLOAD_URL, {
                method: 'POST',
                body: formData
            })
            const data = await response.json()
            pp.image = data.url
        }
        if (pp.status) {
            if (pp.code == "") {
                const maxCode = await prisma.ParticipantProject.findFirst({orderBy: {code: 'desc'}})
                if (maxCode && maxCode.code != "") {
                    const code = parseInt(maxCode.code.slice(2)) + 1
                    pp.code = 'PP' + code.toString().padStart(2, '0')
                }
                else {
                    pp.code = 'PP01'
                }
            }
        }
        else {
            pp.code = ''
        }
        if (id) {
            const updatedpp = await prisma.ParticipantProject.update({ where: { id: id }, data: pp })
            await prisma.TopicPP.deleteMany({where: {idPP: id}})
            for (let i = 0; i < topics.length; i++) {
                const newTopicPP = await prisma.TopicPP.create({ data: { idTopic: parseInt(topics[i].idTopic), idPP: id } })
            }
            if (updatedpp) {
                return new Response("OK", {status: 200})
            }
            else {
                return new Response("Không tìm thấy dự án", {status: 500})
            }
        }
        else {
            const newpp = await prisma.ParticipantProject.create({ data: pp })
            if (topics) {
                for (let i = 0; i < topics.length; i++) {
                    const newTopicPP = await prisma.TopicPP.create({ data: { idTopic: parseInt(topics[i].idTopic), idPP: newpp.id } })
                }
            }
            if (newpp) {
                return new Response("OK", {status: 200})
            }
        }
    }
    catch (error) {
        console.log(error)
        return new Response(error, {status: 500})
    }
}