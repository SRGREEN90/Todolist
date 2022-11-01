import {todolistsAPI, TodolistType} from '../../api/todolists-api'
import {RequestStatusType, SetAppErrorActionType, setAppStatus, SetAppStatusActionType} from '../../app/app-reducer'
import { createSlice, Dispatch, PayloadAction} from "@reduxjs/toolkit";


const initialState: Array<TodolistDomainType> = []

const slice = createSlice({
    name: 'todoList',
    initialState: initialState,
    reducers: {
        removeTodoList(state, action: PayloadAction<{id: string}>){
            const index = state.findIndex(tl => tl.id === action.payload.id)
            if(index > -1) {
                state.splice(index, 1)
            }
        },
        addTodoList(state, action: PayloadAction<{todolist: TodolistType}>){
            state.unshift({...action.payload.todolist, filter: 'all', entityStatus: 'idle'})
        },
        changeTodoListTitle(state, action: PayloadAction<{todoId: string, todoTitle: string}>){
            const index = state.findIndex(tl => tl.id === action.payload.todoId)
            state[index].title = action.payload.todoTitle
        },
        changeTodoListFilter(state, action: PayloadAction<{todoId: string, filter: FilterValuesType}>){
            const index = state.findIndex(tl => tl.id === action.payload.todoId)
            state[index].filter = action.payload.filter
        },
        changeTodoListEntityStatus(state, action: PayloadAction<{todoId: string, status: RequestStatusType}>){
            const index = state.findIndex(tl => tl.id === action.payload.todoId)
            state[index].entityStatus = action.payload.status
        },
        setTodoLists(state, action: PayloadAction<{todoLists: Array<TodolistType>}>){
            action.payload.todoLists.map(tl => ({...tl, filter: 'all', entityStatus: 'idle'}))
        }
    }
})
export const todoListReducer = slice.reducer
export const {
    removeTodoList,
    addTodoList,
    changeTodoListTitle,
    changeTodoListFilter ,
    changeTodoListEntityStatus,
    setTodoLists
} = slice.actions


//thunks
export const fetchTodolistsTC = () => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatus({status:'loading'}))
        todolistsAPI.getTodolists()
            .then((res) => {
                dispatch(setTodoLists({todoLists: res.data}))
                dispatch(setAppStatus({status:'succeeded'}))
            })
    }
}
export const removeTodolistTC = (todolistId: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatus({status:'loading'}))
        dispatch(changeTodoListEntityStatus({todoId: todolistId, status: 'loading'}))
        todolistsAPI.deleteTodolist(todolistId)
            .then((res) => {
                dispatch(removeTodoList({id: todolistId}))
                dispatch(setAppStatus({status:'succeeded'}))
            })
    }
}
export const addTodolistTC = (title: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatus({status: 'loading'}))
        todolistsAPI.createTodolist(title)
            .then((res) => {
                dispatch(addTodoList({todolist: res.data.data.item}))
                dispatch(setAppStatus({status:'succeeded'}))
            })
    }
}
export const changeTodolistTitleTC = (todoId: string, todoTitle: string) => {
    return (dispatch: Dispatch) => {
        todolistsAPI.updateTodolist(todoId, todoTitle)
            .then((res) => {
                dispatch(changeTodoListTitle({todoId, todoTitle}))
            })
    }
}
export const changeTodolistFilterTC = (filter: FilterValuesType, todoId: string) => {
    return (dispatch: Dispatch) => {
        todolistsAPI.updateTodolist(todoId, filter)
            .then((res) => {
                dispatch(changeTodoListFilter({todoId, filter}))
            })
    }
}
//types
export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}

export type TodoThunkTypeDispatch = Dispatch<  SetAppStatusActionType | SetAppErrorActionType>



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