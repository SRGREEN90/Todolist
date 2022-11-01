import {
    TaskPriorities,
    TaskStatuses,
    TaskType,
    todolistsAPI,
    UpdateTaskModelType
} from '../../api/todolists-api'
import { Dispatch } from 'redux'
import { AppRootStateType } from '../../app/store'
import {setAppStatus } from '../../app/app-reducer'

import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {handleServerAppError, handleServerNetworkError} from "../../Utils/Error-utils";
import {addTodoList, removeTodoList, setTodoLists} from './todolists-reducer';

const initialState: TasksStateType = {}

export const fetchTasksTC = createAsyncThunk('tasksReducer/fetchTasks', async (todoListId: string, thunkApi) => {
    thunkApi.dispatch(setAppStatus({status:'loading'}))
    const res = await todolistsAPI.getTasks(todoListId) //he will return another promise, when the last one is mentioned
            const tasks = res.data.items
            thunkApi.dispatch(setAppStatus({status:'succeeded'}))
            return {tasks, todoListId}
})

export const removeTaskTC = createAsyncThunk('tasksReducer/removeTask', async (param: {taskId: string, todoListId: string}, thunkApi) => {
   await todolistsAPI.deleteTask(param.todoListId, param.taskId)
        return {taskId: param.taskId, todoListId: param.todoListId}
})

export const addTaskTC = (title: string, todolistId: string) => (dispatch: Dispatch) => {
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
    (dispatch: Dispatch, getState: () => AppRootStateType) => {
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

const slice = createSlice({
    name: 'tasksReducer',
    initialState: initialState,
    reducers: {
        addTask(state, action: PayloadAction<{task: TaskType}>) {
            state[action.payload.task.todoListId].unshift(action.payload.task)
       },
        updateTask(state, action: PayloadAction<{todoListId: string, taskId: string, model: UpdateDomainTaskModelType}>){
            const tasks = state[action.payload.todoListId]
            const index = tasks.findIndex(t=>t.id===action.payload.taskId)
            if(index > -1) {
                tasks[index] = {...tasks[index], ...action.payload.model}
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(addTodoList,(state, action ) => {
            state[action.payload.todolist.id] = []
        });
        builder.addCase(removeTodoList,(state, action ) => {
            delete state[action.payload.id]
        });
        builder.addCase(setTodoLists,(state, action ) => {
            action.payload.todoLists.forEach((tl: any) => {
                state[tl.id] = []
            })
        });
        builder.addCase(fetchTasksTC.fulfilled,(state, action ) => {
            state[action.payload.todoListId] = action.payload.tasks
        });
        builder.addCase(removeTaskTC.fulfilled,(state, action ) => {
            const tasks = state[action.payload.todoListId]
            const index = tasks.findIndex(t=>t.id===action.payload.taskId)
            if(index > -1) {
                tasks.splice(index, 1)
            }
        });
    }
})
export const tasksReducer = slice.reducer
export const { addTask, updateTask} = slice.actions

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
// type ActionsType =
//     | ReturnType<typeof removeTask>
//     | ReturnType<typeof addTask>
//     | ReturnType<typeof updateTask>
//     | ReturnType<typeof setTodoLists>
//     | ReturnType<typeof removeTodoList>
//     | ReturnType<typeof addTodoList>
//     | ReturnType<typeof setTasks>
//type ThunkDispatch = Dispatch<ActionsType | SetAppStatusActionType | SetAppErrorActionType>
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