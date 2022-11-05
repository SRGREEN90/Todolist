import {todolistsAPI, TodolistType} from '../../api/todolists-api'
import {RequestStatusType, setAppStatus} from '../../app/app-reducer'
import {createAsyncThunk, createSlice, Dispatch, PayloadAction} from "@reduxjs/toolkit";


export const fetchTodoListsTC = createAsyncThunk('todoLists/fetchTodoLists', async (param, {dispatch, rejectWithValue}) => {
    dispatch(setAppStatus({status: 'loading'}))
    const res = await todolistsAPI.getTodolists()
    try {
        dispatch(setAppStatus({status: 'succeeded'}))
        return {todoLists: res.data}
    } catch (error) {
        // return rejectWithValue(null)
        // handleServerNetworkError(error, dispatch);
        return rejectWithValue(null)
    }

})

export const removeTodolistTC = createAsyncThunk('todoLists/removeTodolist', async (todolistId: string, {dispatch}) => {
    dispatch(setAppStatus({status: 'loading'}))
    dispatch(changeTodoListEntityStatus({todoId: todolistId, status: 'loading'}))
    const res = await todolistsAPI.deleteTodolist(todolistId)
    dispatch(setAppStatus({status: 'succeeded'}))
    return {id: todolistId}
})

export const addTodolistTC = createAsyncThunk('todoLists/addTodolist', async (title: string, {dispatch, rejectWithValue}) => {
    dispatch(setAppStatus({status: 'loading'}))
    const res = await todolistsAPI.createTodolist(title)
    dispatch(setAppStatus({status: 'succeeded'}))
    return {todolist: res.data.data.item}

})

export const changeTodolistTitleTC = createAsyncThunk('todoLists/changeTodolistTitle', async (param: {todoId: string, todoTitle: string}, {dispatch, rejectWithValue}) => {
     await  todolistsAPI.updateTodolist(param.todoId, param.todoTitle)
       return {todoId: param.todoId, todoTitle: param.todoTitle}
})

export const changeTodolistFilterTC = (filter: FilterValuesType, todoId: string) => {
    return (dispatch: Dispatch) => {
        todolistsAPI.updateTodolist(todoId, filter)
            .then((res) => {
                dispatch(changeTodoListFilter({todoId, filter}))
            })
    }
}
const slice = createSlice({
    name: 'todoLists',
    initialState: [] as Array<TodolistDomainType>,
    reducers: {
        changeTodoListFilter(state, action: PayloadAction<{ todoId: string, filter: FilterValuesType }>) {
            const index = state.findIndex(tl => tl.id === action.payload.todoId)
            state[index].filter = action.payload.filter
        },
        changeTodoListEntityStatus(state, action: PayloadAction<{ todoId: string, status: RequestStatusType }>) {
            const index = state.findIndex(tl => tl.id === action.payload.todoId)
            state[index].entityStatus = action.payload.status
        },
        setTodoLists(state, action: PayloadAction<{ todoLists: Array<TodolistType> }>) {
            action.payload.todoLists.map(tl => ({...tl, filter: 'all', entityStatus: 'idle'}))
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchTodoListsTC.fulfilled, (state, action) => {
            return action.payload.todoLists.map(tl => ({...tl, filter: 'all', entityStatus: 'idle'}))
        })
        builder.addCase(removeTodolistTC.fulfilled, (state, action) => {
            const index = state.findIndex(tl => tl.id === action.payload.id)
            if (index > -1) {
                state.splice(index, 1)
            }
        })
        builder.addCase(addTodolistTC.fulfilled, (state, action) => {
            state.unshift({...action.payload.todolist, filter: 'all', entityStatus: 'idle'})
        })
        builder.addCase(changeTodolistTitleTC.fulfilled, (state, action) => {
            const index = state.findIndex(tl => tl.id === action.payload.todoId)
            state[index].title = action.payload.todoTitle
        })
    }
})
export const todoListReducer = slice.reducer
export const {
    changeTodoListFilter,
    changeTodoListEntityStatus,
    setTodoLists
} = slice.actions


//types
export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}

//export type TodoThunkTypeDispatch = Dispatch<SetAppStatusActionType | SetAppErrorActionType>

// type ActionsType =
//     | ReturnType<typeof changeTodoListTitle>
//     | ReturnType<typeof changeTodoListFilter>
//     | ReturnType<typeof setTodoLists>
//     | ReturnType<typeof changeTodoListEntityStatus>
//     | ReturnType<typeof removeTodoList>
//     | ReturnType<typeof addTodoList>
//actions
// export const removeTodolistAC = (id: string) => ({type: 'REMOVE-TODOLIST', id} as const)
// export const addTodolistAC = (todolist: TodolistType) => ({type: 'ADD-TODOLIST', todolist} as const)
// export const changeTodolistTitleAC = (id: string, title: string) => ({
//     type: 'CHANGE-TODOLIST-TITLE',
//     id,
//     title
// } as const)
// export const changeTodolistFilterAC = (id: string, filter: FilterValuesType) => ({
//     type: 'CHANGE-TODOLIST-FILTER',
//     id,
//     filter
// } as const)
// export const changeTodolistEntityStatusAC = (id: string, status: RequestStatusType) => ({
//     type: 'CHANGE-TODOLIST-ENTITY-STATUS', id, status } as const)
// export const setTodolistsAC = (todolists: Array<TodolistType>) => ({type: 'SET-TODOLISTS', todolists} as const)

// export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionsType): Array<TodolistDomainType> => {
//     switch (action.type) {
//         case 'REMOVE-TODOLIST':
//             return state.filter(tl => tl.id !== action.id)
//         case 'ADD-TODOLIST':
//             return [{...action.todolist, filter: 'all', entityStatus: 'idle'}, ...state]
//
//         case 'CHANGE-TODOLIST-TITLE':
//             return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
//         case 'CHANGE-TODOLIST-FILTER':
//             return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
//         case 'CHANGE-TODOLIST-ENTITY-STATUS':
//             return state.map(tl => tl.id === action.id ? {...tl, entityStatus: action.status} : tl)
//         case 'SET-TODOLISTS':
//             return action.todolists.map(tl => ({...tl, filter: 'all', entityStatus: 'idle'}))
//         default:
//             return state
//     }
// }

//export const fetchTodolistsTC_ = () => {
//     return (dispatch: Dispatch) => {
//         dispatch(setAppStatus({status:'loading'}))
//         todolistsAPI.getTodolists()
//             .then((res) => {
//                 dispatch(setTodoLists({todoLists: res.data}))
//                 dispatch(setAppStatus({status:'succeeded'}))
//             })
//             .catch(error=>{
//            // return rejectWithValue(null)
//               handleServerNetworkError(error, dispatch);
//         })
//     }
// }

//export const removeTodolistTC_ = (todolistId: string) => {
//     return (dispatch: Dispatch) => {
//         dispatch(setAppStatus({status: 'loading'}))
//         dispatch(changeTodoListEntityStatus({todoId: todolistId, status: 'loading'}))
//         todolistsAPI.deleteTodolist(todolistId)
//             .then((res) => {
//                 dispatch(removeTodoList({id: todolistId}))
//                 dispatch(setAppStatus({status: 'succeeded'}))
//             })
//     }
// }

// export const addTodolistTC_ = (title: string) => {
//     return (dispatch: Dispatch) => {
//         dispatch(setAppStatus({status: 'loading'}))
//         todolistsAPI.createTodolist(title)
//             .then((res) => {
//                 dispatch(addTodoList({todolist: res.data.data.item}))
//                 dispatch(setAppStatus({status: 'succeeded'}))
//             })
//     }
// }

// export const changeTodolistTitleTC_ = (todoId: string, todoTitle: string) => {
//     return (dispatch: Dispatch) => {
//         todolistsAPI.updateTodolist(todoId, todoTitle)
//             .then((res) => {
//                 dispatch(changeTodoListTitle({todoId, todoTitle}))
//             })
//     }
// }