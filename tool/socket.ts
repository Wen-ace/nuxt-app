import { DefaultEventsMap } from "@socket.io/component-emitter";
import { Socket, io } from "socket.io-client"
// import { Socket } from 'socket.io'

const base_url = 'wss://172.245.5.165:5110'
const io_url = 'http://172.245.5.165:5110'
// const io_url = undefined

let ws: WebSocket | null = null

let socketIO: Socket<DefaultEventsMap, DefaultEventsMap> | null = null;

const createWS = () => {
    if (!ws) {
        ws = new WebSocket(base_url)
    }
    return ws
}
const createIO = () => {
    if (!socketIO) {
        socketIO = io({
            autoConnect: true,
            host: base_url
        })
    }

    return socketIO
}
export default {
    createWS,
    createIO,
}


