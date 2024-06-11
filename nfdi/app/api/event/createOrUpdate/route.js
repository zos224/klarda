import prisma from "@/db/prisma";
import slugify from "slugify";

export const POST = async (req) => {
    let Event = {
        title: '',
        location: '',
        language: '',
        idEventType: 0,
        overview: '',
        goals: '',
        matter: '',
        startDateTime: '',
        endDateTime: '',
        link: '',
        platform: '',
        max: 0,
        ageLimit: 0,
        status: false
    }
    const formData = await req.formData();
    const idValue = formData.get('id');
    const id = idValue ? parseInt(idValue, 10) : null;
    Event.title = formData.get('title');
    Event.location = formData.get('location');
    Event.language = formData.get('language');
    Event.idEventType = parseInt(formData.get('idEventType'));
    Event.overview = formData.get('overview');
    Event.goals = formData.get('goals');
    Event.matter = formData.get('matter');
    Event.startDateTime = new Date(formData.get('startDateTime'));
    Event.endDateTime = new Date(formData.get('endDateTime'));
    Event.link = formData.get('link');
    Event.platform = formData.get('platform');
    Event.max = parseInt(formData.get('max'));
    Event.ageLimit = parseInt(formData.get('ageLimit'));
    Event.slug = slugify(Event.title, {
        locale: 'vi',
        lower: true
    })
    formData.get('idUser') ? Event.idUser = parseInt(formData.get('idUser')) : null;
    Event.status = formData.get('status') === 'true' ? true : false;
    const topics = JSON.parse(formData.get('eEventTopics'));
    const programs = JSON.parse(formData.get('programs'));
    const people = JSON.parse(formData.get('eventPersons'));
    try {
        let newEvent;
        if (id && !isNaN(id)) {
            newEvent  = await prisma.Event.update({ where: { id: id }, data: Event});
            await prisma.Event_EventTopic.deleteMany({where: {idEvent: id}})
            await prisma.Program.deleteMany({where: {idEvent: id}})
            await prisma.EventPerson.deleteMany({where: {idEvent: id}})
            for (let i = 0; i < topics.length; i++) {
                const newEventTopic = await prisma.Event_EventTopic.create({ data: { idEvent: newEvent.id, idEventTopic: parseInt(topics[i]) } })
            }
            for (let i = 0; i < programs.length; i++) {
                const program = {
                    idEvent: newEvent.id,
                    idIcon: programs[i].icon.id,
                    date: new Date(programs[i].date),
                    time: programs[i].time,
                    duration: parseInt(programs[i].duration),
                    activity: programs[i].activity,
                    location: programs[i].location,
                    mainContent: programs[i].mainContent,
                    description: programs[i].description
                }
                const newEventProgram = await prisma.Program.create({ data: program })
            }
            for (let i = 0; i < people.length; i++) {
                const person = people[i];
                const avatarUpload = formData.get(`eventPersons${i}`)
                if (avatarUpload instanceof File) {
    
                    if (person.avatar !== '') {
                        const fileName = person.avatar.split('/').pop()
            
                        await fetch(process.env.UPLOAD_URL, {
                            method: 'DELETE',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({ fileName: fileName })
                        })
                    }
                    const formData = new FormData()
                    formData.append('upload', avatarUpload)
                    try {
                        const response = await fetch(process.env.UPLOAD_URL, {
                            method: 'POST',
                            body: formData
                        })
                        const data = await response.json()
                        person.avatar = data.url
                    }
                    catch (error) {
                        console.log(error)
                    }
                }
    
                const truePerson = {
                    name: person.name,
                    avatar: person.avatar,
                    role: person.role,
                    company: person.company,
                    academicTitle: person.academicTitle,
                    idEvent: newEvent.id
                }
                const newEventPerson = await prisma.EventPerson.create({ data: truePerson })
            }
        }
        else {
            newEvent = await prisma.Event.create({ data: Event });
            for (let i = 0; i < topics.length; i++) {
                const newEventTopic = await prisma.Event_EventTopic.create({ data: { idEvent: newEvent.id, idEventTopic: parseInt(topics[i]) } })
            }
            for (let i = 0; i < programs.length; i++) {
                const program = {
                    idEvent: newEvent.id,
                    idIcon: programs[i].icon.id,
                    date: new Date(programs[i].date),
                    time: programs[i].time,
                    duration: parseInt(programs[i].duration),
                    activity: programs[i].activity,
                    location: programs[i].location,
                    mainContent: programs[i].mainContent,
                    description: programs[i].description
                }
                const newEventProgram = await prisma.Program.create({ data: program })
            }
            for (let i = 0; i < people.length; i++) {
                const person = people[i];
                const avatarUpload = formData.get(`eventPersons${i}`)
                if (avatarUpload instanceof File) {
    
                    if (person.avatar !== '') {
                        const fileName = person.avatar.split('/').pop()
            
                        await fetch(process.env.UPLOAD_URL, {
                            method: 'DELETE',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({ fileName: fileName })
                        })
                    }
                    const formData = new FormData()
                    formData.append('upload', avatarUpload)
                    try {
                        const response = await fetch(process.env.UPLOAD_URL, {
                            method: 'POST',
                            body: formData
                        })
                        const data = await response.json()
                        person.avatar = data.url
                    }
                    catch (error) {
                        console.log(error)
                    }
                }
    
                const truePerson = {
                    name: person.name,
                    avatar: person.avatar,
                    role: person.role,
                    company: person.company,
                    academicTitle: person.academicTitle,
                    idEvent: newEvent.id
                }
                const newEventPerson = await prisma.EventPerson.create({ data: truePerson })
            }
        }
        return new Response("OK", { status: 200 })
    }
    catch (error) {
        console.log(error)
        return new Response(error, {status: 500})
    }
}