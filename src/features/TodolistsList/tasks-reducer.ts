import {
    TaskPriorities,
    TaskStatuses,
    TaskType,
    todolistsAPI,
    UpdateTaskModelType
} from '../../api/todolists-api'
import {AppRootStateType} from '../../app/store'
import {setAppStatus} from '../../app/app-reducer'
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {handleServerAppError} from "../../Utils/Error-utils";
import {addTodolistTC, fetchTodoListsTC, removeTodolistTC} from './todolists-reducer';

const initialState: TasksStateType = {}

export const fetchTasksTC = createAsyncThunk('tasksReducer/fetchTasks', async (todoListId: string, thunkApi) => {
    thunkApi.dispatch(setAppStatus({status: 'loading'}))
    const res = await todolistsAPI.getTasks(todoListId) //he will return another promise, when the last one is mentioned
    const tasks = res.data.items
    thunkApi.dispatch(setAppStatus({status: 'succeeded'}))
    return {tasks, todoListId}
})

export const removeTaskTC = createAsyncThunk('tasksReducer/removeTask', async (param: { taskId: string, todoListId: string }, thunkApi) => {
    const res = await todolistsAPI.deleteTask(param.todoListId, param.taskId)
    return {taskId: param.taskId, todoListId: param.todoListId}
})

export const addTaskTC = createAsyncThunk('tasksReducer/addTask', async (param: { title: string, todolistId: string }, {dispatch, rejectWithValue}) => {
    dispatch(setAppStatus({status: 'loading'}))
    try {
        const res = await todolistsAPI.createTask(param.todolistId, param.title)
        if (res.data.resultCode === 0) {
            dispatch(setAppStatus({status: 'succeeded'}))
            return res.data.data.item
        } else {
            handleServerAppError(res.data, dispatch);
           return  rejectWithValue(null)
        }
    } catch (error) {
       //   handleServerNetworkError(error, dispatch)
        return rejectWithValue(null)
    }
})

export const updateTaskTC = createAsyncThunk('tasksReducer/updateTasks',async (param:{taskId: string, domainModel: UpdateDomainTaskModelType, todoListId: string }, {dispatch, rejectWithValue, getState}) => {
        const state = getState() as AppRootStateType
        const task = state.tasks[param.todoListId].find(t => t.id === param.taskId)
        if (!task) {
            return rejectWithValue('task not found in the state')
        }
        const apiModel: UpdateTaskModelType = {
            deadline: task.deadline,
            description: task.description,
            priority: task.priority,
            startDate: task.startDate,
            title: task.title,
            status: task.status,
            ...param.domainModel
        }
    const res = await todolistsAPI.updateTask(param.todoListId, param.taskId, apiModel)
        try{

            if (res.data.resultCode === 0) {
                const params = {todoListId: param.todoListId, taskId: param.taskId, model: apiModel}
                return params
            } else {
                handleServerAppError(res.data, dispatch);
                return rejectWithValue(null)
            }

        } catch(error){
            return rejectWithValue(null)
          //  handleServerNetworkError(error, dispatch);
        }
})


//======================================= SLICE ======================================
const slice = createSlice({
    name: 'tasksReducer',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(addTodolistTC.fulfilled, (state, action) => {
            state[action.payload.todolist.id] = []
        });
        builder.addCase(removeTodolistTC.fulfilled, (state, action) => {
            delete state[action.payload.id]
        });
        builder.addCase(fetchTodoListsTC.fulfilled, (state, action) => {
            action.payload.todoLists.forEach((tl: any) => {
                state[tl.id] = []
            })
        });
        builder.addCase(fetchTasksTC.fulfilled, (state, action) => {
            state[action.payload.todoListId] = action.payload.tasks
        });
        builder.addCase(removeTaskTC.fulfilled, (state, action) => {
            const tasks = state[action.payload.todoListId]
            const index = tasks.findIndex(t => t.id === action.payload.taskId)
            if (index > -1) {
                tasks.splice(index, 1)
            }
        });
        builder.addCase(addTaskTC.fulfilled, (state, action) => {
            state[action.payload.todoListId].unshift(action.payload)
        });
        builder.addCase(updateTaskTC.fulfilled, (state, action) => {
            const tasks = state[action.payload.todoListId]
            const index = tasks.findIndex(t => t.id === action.payload.taskId)
            if (index > -1) {
                tasks[index] = {...tasks[index], ...action.payload.model}
            }
        });
    }
})
export const tasksReducer = slice.reducer

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

// export const addTaskTC_ = (title: string, todolistId: string) => (dispatch: Dispatch) => {
//     dispatch(setAppStatus({status:'loading'}))
//     todolistsAPI.createTask(todolistId, title)
//         .then(res => {
//             if (res.data.resultCode === 0) {
//                 const task = res.data.data.item
//                 const action = addTask({task})
//                 dispatch(action)
//                 dispatch(setAppStatus({status:'succeeded'}))
//             } else {
//                 handleServerAppError(res.data, dispatch);
//             }
//         })
//         .catch((error) => {
//             handleServerNetworkError(error, dispatch)
//         })
// }