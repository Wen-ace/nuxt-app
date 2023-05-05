type Iid = string | number

export type Session = {
    id: Iid,
    title: string,
    create_time: number,
}

export type IChat = {
    create_time: number
    direction: number
    id: Iid
    message: string
    nickname: string
    session_id: Iid
}

declare module '*.vue';