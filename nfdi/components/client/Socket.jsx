"use client"
import { useEffect, useState } from 'react'
import io from "socket.io-client"
const Socket = ({children}) => {
    const [socket, setSocket] = useState(null)
    useEffect(() => {
        const socketInitialize = async () => {  
            const socket = io(undefined, {
                path: '/api/socket',
            })
            setSocket(socket)
        }
        socketInitialize()
    }, [])
    useEffect(() => {
        if (socket) {
            socket.emit('online', null)
        }
    }, [socket])

    return (
        <div>
            {children}
        </div>
    )
}
export default Socket