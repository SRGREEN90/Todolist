import React from 'react'
import {v1} from "uuid";
import {TaskType} from "../components/Todolist";
import {FilterValuesType, TodolistType} from "../App";

export const todolistId1 = v1();
export const todolistId2 = v1();
let initialState: Array<TodolistType> = [
    {id: todolistId1, title: "What to learn", filter: "all"},
    {id: todolistId2, title: "What to buy", filter: "all"}
]

export const TodolistReducer = (state=initialState, action: mainTypeAC): Array<TodolistType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.payload.todolistId)
        }
        case 'ADD-TODOLIST': {
           return  [...state, {id: action.payload.todolistId, title: action.payload.title, filter: "all"}]

        }
        case 'CHANGE-FILTER': {
           return state.map(tl => tl.id === action.payload.todolistId ? {...tl, filter : action.payload.value} : tl)
            }
        default:
            return state
    }
}
type mainTypeAC = removeTodolistACType | addTodolistACType | changeFilterACType
type removeTodolistACType = ReturnType<typeof removeTodolistAC>
type addTodolistACType = ReturnType<typeof addTodolistAC>
type changeFilterACType = ReturnType<typeof changeFilterAC>

export const removeTodolistAC = (id: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        payload: {
            todolistId: id
        }

    } as const
}
export const addTodolistAC = (title: string, newID: string) => {
    return {
        type: 'ADD-TODOLIST',
        payload: {
            title,
            todolistId: newID
        }
    } as const
}
export const changeFilterAC = (value: FilterValuesType, id: string) => {
    return {
        type: 'CHANGE-FILTER',
        payload: {
            todolistId: id,
            value: value
        }
    } as const
}
export default TodolistReducer
