import { DefaultEventsMap } from "@socket.io/component-emitter";
import { Socket, io } from "socket.io-client"

const base_url = 'wss://172.245.5.165:5000'
// const io_url = 'http://172.245.5.165:5000'
const io_url = undefined

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
        socketIO = io(io_url)
    }
    return socketIO
}
export default {
    createWS,
    createIO,
}


