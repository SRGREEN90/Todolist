import React from 'react'
import {v1} from "uuid";
import {TaskType} from "../components/Todolist";
import {TasksStateType} from "../App";
import {addTodolistACType, todolistId1, todolistId2} from "./TodolistReducer";

let initialState: TasksStateType = {
    [todolistId1]: [
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true}
    ],
    [todolistId2]: [
        {id: v1(), title: "Milk", isDone: true},
        {id: v1(), title: "React Book", isDone: true}
    ]
}

const TasksReducer = (state = initialState, action: mainType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            let newState = {...state}
            let todolistTasks = newState[action.payload.todolistId];
            let filteredTasks = todolistTasks.filter(t => {
                return t.id !== action.payload.id
            });
            newState[action.payload.todolistId] = filteredTasks
            return newState
        }
        case 'ADD-TASK': {
            let newTask = {id: v1(), title: action.payload.title, isDone: false}
            let todolistTasks = state[action.payload.todolistId];
            state[action.payload.todolistId] = [newTask, ...todolistTasks];
            return {...state}
        }

        case 'CHANGE-STATUS': {
            let todolistTasks = state[action.payload.todolistId];
            let task = todolistTasks.find(t => t.id === action.payload.id);
            if (task) {
                task.isDone = action.payload.isDone;
            }
            return {...state}
        }

        case 'REMOVE-TASK-WITH-TODO': {
            let newState = {...state}
            delete newState[action.payload.todolistId]
            return newState
        }

        case 'ADD-NEW-TASK': {
            return {
                ...state,
                [action.payload.todolistId]: []
            }
        }

        case 'UPDATE-TASK': {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(m => m.id === action.payload.id ? {
                    ...m,
                    title: action.payload.localTitle
                } : m)
            }
        }

        default:
            return state
    }
}
type mainType =
    | removeTaskACType
    | addTaskACType
    | changeStatusACType
    | addNewTaskACType
    | removeTaskWithTodoACType
    | updateTaskACType | addTodolistACType
type removeTaskACType = ReturnType<typeof removeTaskAC>
type addTaskACType = ReturnType<typeof addTaskAC>
type changeStatusACType = ReturnType<typeof changeStatusAC>
type addNewTaskACType = ReturnType<typeof addNewTaskAC>
type removeTaskWithTodoACType = ReturnType<typeof removeTaskWithTodoAC>
type updateTaskACType = ReturnType<typeof updateTaskAC>


export const removeTaskWithTodoAC = (todolistId: string) => {
    return {
        type: 'REMOVE-TASK-WITH-TODO',
        payload: {
            todolistId
        }
    } as const
}

export const removeTaskAC = (id: string, todolistId: string) => {
    return {
        type: 'REMOVE-TASK',
        payload: {
            id,
            todolistId
        }
    } as const
}
export const addTaskAC = (title: string, todolistId: string) => {
    return {
        type: 'ADD-TASK',
        payload: {
            title,
            todolistId
        }
    } as const
}

export const changeStatusAC = (id: string, isDone: boolean, todolistId: string,) => {
    return {
        type: 'CHANGE-STATUS',
        payload: {
            id,
            todolistId,
            isDone
        }
    } as const
}

export const addNewTaskAC = (todolistId: string,) => {
    return {
        type: 'ADD-NEW-TASK',
        payload: {
            todolistId
        }
    } as const
}

export const updateTaskAC = (id: string,localTitle: string, todolistId: string,  ) => {
    return {
        type: 'UPDATE-TASK',
        payload: {
            todolistId,
            id,
            localTitle
        }
    } as const
}


export default TasksReducer
