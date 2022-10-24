import { AddTodolistActionType, RemoveTodolistActionType, SetTodolistsActionType } from './todolists-reducer'
import { TaskPriorities, TaskStatuses, TaskType, todolistsAPI, UpdateTaskModelType } from '../../api/todolists-api'
import { Dispatch } from 'redux'
import { AppRootStateType } from '../../app/store'
import { SetAppErrorActionType, setAppStatus, SetAppStatusActionType } from '../../app/app-reducer'

import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {handleServerAppError, handleServerNetworkError} from "../../Utils/Error-utils";

const initialState: TasksStateType = {}

const slice = createSlice({
    name: 'tasksReducer',
    initialState: initialState,
    reducers: {
        addTask(state, action: PayloadAction<{task: TaskType}>) {
           state[action.payload.task.todoListId]= [action.payload.task, ...state[action.payload.task.todoListId]]
       },
        updateTask(state, action: PayloadAction<{todoListId: string, taskId: string, model: UpdateDomainTaskModelType}>){
        state[action.payload.todoListId]= state[action.payload.todoListId].map(t => t.id === action.payload.taskId ? {...t, ...action.payload.model} : t)
        },
        removeTask(state, action: PayloadAction<{todoListId: string, taskId: string}>) {
           state[action.payload.todoListId] = state[action.payload.todoListId].filter(t => t.id !== action.payload.taskId)
        },
        setTasks(state, action: PayloadAction<{tasks: TaskType[], todoListId: string}>){
            state[action.payload.todoListId] = action.payload.tasks
        },
        // extraReducers: (builder)=>{
        //     builder.addCase(AddTl, (state, action)=>{
        //         state[action.payload.tlId] = []
        //     })
        //     builder.addCase(RemoveTL, (state, action)=>{
        //         delete state[action.payload.tlID]
        //     })
        //     builder.addCase(SetTodos, (state, action)=>{
        //         action.payload.todos.forEach((tl: any)=>{
        //             state[tl.id] = []
        //         })
        //     })
    }
})
export const tasksReducer = slice.reducer
export const { addTask, setTasks, removeTask, updateTask } = slice.actions


// export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
//     switch (action.type) {
//         case 'REMOVE-TASK':
//             return {...state, [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)}
//         case 'ADD-TASK':
//             return {...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]}
//         case 'UPDATE-TASK':
//             return {
//                 ...state,
//                 [action.todolistId]: state[action.todolistId]
//                     .map(t => t.id === action.taskId ? {...t, ...action.model} : t)
//             }
//         case 'ADD-TODOLIST':
//             return {...state, [action.todolist.id]: []}
//         case 'REMOVE-TODOLIST':
//             const copyState = {...state}
//             delete copyState[action.id]
//             return copyState
//         case 'SET-TODOLISTS': {
//             const copyState = {...state}
//             action.todolists.forEach(tl => {
//                 copyState[tl.id] = []
//             })
//             return copyState
//         }
//         case 'SET-TASKS':
//             return {...state, [action.todolistId]: action.tasks}
//         default:
//             return state
//     }
// }
// // actions
// export const removeTaskAC = (taskId: string, todolistId: string) => ({type: 'REMOVE-TASK', taskId, todolistId} as const)
// export const addTaskAC = (task: TaskType) => ({type: 'ADD-TASK', task} as const)
// export const updateTaskAC = (taskId: string, model: UpdateDomainTaskModelType, todolistId: string) => ({
//     type: 'UPDATE-TASK',
//     model,
//     todolistId,
//     taskId
// } as const)
// export const setTasksAC = (tasks: Array<TaskType>, todolistId: string) => ({
//     type: 'SET-TASKS',
//     tasks,
//     todolistId
// } as const)

// thunks
export const fetchTasksTC = (todoListId: string) => (dispatch: Dispatch<ActionsType | SetAppStatusActionType>) => {
    dispatch(setAppStatus({status:'loading'}))
    todolistsAPI.getTasks(todoListId)
        .then((res) => {
            const tasks = res.data.items
            dispatch(setTasks({tasks, todoListId: todoListId}))
            dispatch(setAppStatus({status:'succeeded'}))
        })
}
export const removeTaskTC = (taskId: string, todoListId: string) => (dispatch: Dispatch<ActionsType>) => {
    todolistsAPI.deleteTask(todoListId, taskId)
        .then((res) => {
            const action = removeTask({taskId: taskId, todoListId: todoListId})
            dispatch(action)
        })
}
export const addTaskTC = (title: string, todolistId: string) => (dispatch: Dispatch<ActionsType | SetAppErrorActionType | SetAppStatusActionType>) => {
    dispatch(setAppStatus({status:'loading'}))
    todolistsAPI.createTask(todolistId, title)
        .then(res => {
            if (res.data.resultCode === 0) {
                const task = res.data.data.item
                const action = addTask({task})
                dispatch(action)
                dispatch(setAppStatus({status:'succeeded'}))
            } else {
                handleServerAppError(res.data, dispatch);
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}
export const updateTaskTC = (taskId: string, domainModel: UpdateDomainTaskModelType, todoListId: string) =>
    (dispatch: ThunkDispatch, getState: () => AppRootStateType) => {
        const state = getState()
        const task = state.tasks[todoListId].find(t => t.id === taskId)
        if (!task) {
            console.warn('task not found in the state')
            return
        }

        const apiModel: UpdateTaskModelType = {
            deadline: task.deadline,
            description: task.description,
            priority: task.priority,
            startDate: task.startDate,
            title: task.title,
            status: task.status,
            ...domainModel
        }

        todolistsAPI.updateTask(todoListId, taskId, apiModel)
            .then(res => {
                if (res.data.resultCode === 0) {
                    const action = updateTask({todoListId: todoListId, taskId: taskId, model: apiModel})
                    dispatch(action)
                } else {
                    handleServerAppError(res.data, dispatch);
                }
            })
            .catch((error) => {
                handleServerNetworkError(error, dispatch);
            })
    }

// types
export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}
export type TasksStateType = {
    [key: string]: Array<TaskType>
}
type ActionsType =
    | ReturnType<typeof removeTask>
    | ReturnType<typeof addTask>
    | ReturnType<typeof updateTask>
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTodolistsActionType
    | ReturnType<typeof setTasks>

type ThunkDispatch = Dispatch<ActionsType | SetAppStatusActionType | SetAppErrorActionType>
