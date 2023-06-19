export interface Todo {
    id: number
    description: string
    userId: number
    done: boolean
    room: string
}

export interface TodoRequest {
    description: string
    userId: number
    done: boolean
    room: string
}