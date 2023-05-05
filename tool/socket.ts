import { DefaultEventsMap } from "@socket.io/component-emitter";
import { Socket, io } from "socket.io-client"
import { SOCKET_URL } from "~/api";
// import { Socket } from 'socket.io'


let ws: WebSocket | null = null

let socketIO: Socket<DefaultEventsMap, DefaultEventsMap> | null = null;


const createIO = () => {
    if (!socketIO) {
        socketIO = io(SOCKET_URL, {
            autoConnect: true
        })
    }

    return socketIO
}
export default {
    createIO,
}


