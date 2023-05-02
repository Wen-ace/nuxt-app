
export type Session = {
    id: string | number,
    title: string,
    create_time: number,
}

export type IChat = {
    create_time: number
    direction: number
    id: string
    message: string
    nickname: string
    session_id: string
}

declare module '*.vue';