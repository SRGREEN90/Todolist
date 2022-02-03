import axios from 'axios';

export default {
    title: 'API'
}
const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    headers: {
        'API-KEY': 'a900de3d-69b2-4d80-9701-5045a006cecd'
    },
    withCredentials: true
})

export const todolistApi = {
    getTodos() {
        return instance.get<TodoType[]>('todo-lists')
    },
    createTodo(title: string) {
        return instance.post<BaseResponseType<{item: TodoType}>>('todo-lists', {title})
    },
    deleteTodo(todolistId: string) {
        return instance.delete<BaseResponseType>(`todo-lists/${todolistId}`)
    },
    updateTodoTitle(todolistId: string, title: string) {
        return instance.put<BaseResponseType>(`todo-lists/${todolistId}`, {title})
    }

}

type TodoType = {
    addedDate: string
    id: string
    order: number
    title: string
}

type BaseResponseType<T = {}> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: T
}

