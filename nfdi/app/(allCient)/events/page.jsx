"use client"
import Event from "@/components/client/Event"
import LinkNav from "@/components/client/LinkNav"
import { useState, useEffect } from "react"

const EventsPage = () => {
    const [events, setEvents] = useState([])
    useEffect(() => {
        fetch("/api/event/ordertime")
            .then(res => res.json())
            .then(data => setEvents(data))
    }, [])
    const [showEvents, setShowEvents] = useState([])
    const [types, setTypes] = useState([])
    const [topics, setTopics] = useState([])
    useEffect(() => {
        const setType = new Set(events.map(event => event.eventType.name));
        const types = Array.from(setType);
        setTypes(types);
        const setTopic = new Set(events.flatMap(event => event.eEventTopics.map(topic => topic.eventTopic.name)));
        const topics = Array.from(setTopic);
        setTopics(topics);
        setShowEvents(events);
    }, [events])
    
    const filterType = (type) => {
        if (type == "-") {
            setShowEvents(events);
        } else {
            setShowEvents(events.filter(event => event.eventType.name == type));
        }
    }

    const filterTopic = (topic) => {
        if (topic == "-") {
            setShowEvents(events);
        } else {
            setShowEvents(events.filter(event => event.eEventTopics.map(eEventTopic => eEventTopic.eventTopic.name).includes(topic)));
        }
    }
    return (
        <div>
            <LinkNav />
            <h1 className="font-extrabold md:text-5xl text-2xl mt-15">Sự kiện</h1>
            <div className="mt-10 flex gap-10">
                <div className="w-full">
                    <label>Loại sự kiện</label>
                    <select onChange={(e) => filterType(e.target.value)} className="mt-1 w-full border px-3 py-1 rounded-md border-bodydark focus:border-primary-600 focus:border-2 outline-none ">
                        <option value={"-"}>Tất cả sự kiện</option>
                        {types.map((type, index) => (
                            <option value={type} key={index}>{type}</option>
                        ))}
                    </select>
                </div>
                <div className="w-full">
                    <label>Chủ đề</label>
                    <select onChange={(e) => filterTopic(e.target.value)} className="mt-1 w-full border px-3 py-1 rounded-md border-bodydark focus:border-primary-600 focus:border-2 outline-none ">
                        <option value={"-"}>Tất cả chủ đề</option>
                        {topics.map((topic, index) => (
                            <option value={topic} key={index}>{topic}</option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="mt-10 grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-10">
                {showEvents.map((event, index) => (
                    <Event key={index} event={event}></Event>
                ))}
            </div>
        </div>
    )
}

export default EventsPage