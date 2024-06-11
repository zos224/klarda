import { Server } from 'socket.io'

let countOnline = 0

const SocketHandler = (req, res) => {
  if (!res.socket.server.io) {
    const io = new Server(res.socket.server, {
      path: '/api/socket',
      addTrailingSlash: false,
      pingInterval: 60000,
      pingTimeout: 60000,
    })

    io.on('connection', socket => {
        socket.join('admin')
        socket.on('online', () => {
            countOnline++
            io.to('admin').emit('onlineAlert', countOnline)
        })
        
        socket.once('disconnect', (reason) => {
          if (reason == "transport close") {
            countOnline--
            if (countOnline < 0) {
                countOnline = 0
            }
            io.to('admin').emit('onlineAlert', countOnline)
          }
        })

        socket.on('getOnline', () => {
            io.to('admin').emit('onlineAlert', countOnline)
        })
    })

    res.socket.server.io = io
    
  } 
  res.end()
}

export default SocketHandler