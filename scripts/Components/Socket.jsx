import * as SocketIO from 'socket.io-client'

const socket = SocketIO.connect('http://localhost:8080/')

export default socket