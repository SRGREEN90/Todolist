import { Dispatch } from 'redux'
import {authAPI, LoginParamsType} from "../../api/todolists-api";
import {handleServerAppError, handleServerNetworkError} from "../../Utils/Error-utils";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {SetAppErrorActionType, setAppStatus, SetAppStatusActionType} from '../../app/app-reducer';
import {addTodoList} from "../TodolistsList/todolists-reducer";
import {fetchTasksTC} from "../TodolistsList/tasks-reducer";


export const loginTC = createAsyncThunk('auth/login', async (param: LoginParamsType, thunkApi) => {
    thunkApi.dispatch(setAppStatus({status: 'loading'}))
         try {
             const res =  await authAPI.login(param)
             if (res.data.resultCode === 0) {

                 thunkApi.dispatch(setAppStatus({status:'succeeded'}))
                 return {isLoggedIn: true}
             } else {
                 handleServerAppError(res.data, thunkApi.dispatch);
             }
         } catch(error)  {
        }
})

// export const loginTC_ = (data: LoginParamsType) => (dispatch: Dispatch<ActionsType>) => {
//     dispatch(setAppStatus({status: 'loading'}))
//     authAPI.login(data)
//         .then(res => {
//             if (res.data.resultCode === 0) {
//                 dispatch(setIsLoggedIn({value: true}))
//                 dispatch(setAppStatus({status:'succeeded'}))
//             } else {
//                 handleServerAppError(res.data, dispatch);
//             }
//         })
//         .catch((error) => {
//             handleServerNetworkError(error, dispatch)
//         })
// }

const slice = createSlice({
    name: 'auth',
    initialState: {isLoggedIn: false},
    reducers: {
        // setIsLoggedIn(state, action: PayloadAction<{ value: boolean }>) {
        //     state.isLoggedIn = action.payload.value
        // }

    },
    extraReducers: (builder) => {
        builder.addCase(loginTC.fulfilled,(state, action ) => {
            if(action.payload){
                state.isLoggedIn = action.payload.isLoggedIn
            }
        });
    }
})
export const authReducer = slice.reducer
export const {setIsLoggedIn} = slice.actions
// export const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
//     switch (action.type) {
//         case 'login/SET-IS-LOGGED-IN':
//             return {...state, isLoggedIn: action.value}
//         default:
//             return state
//     }
// }
// // actions
// export const setIsLoggedInAC = (value: boolean) => ({type: 'login/SET-IS-LOGGED-IN', value} as const)

// thunks


export const logoutTC = () => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatus({status: 'loading'}))
    authAPI.logout()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedIn({value: false}))
                dispatch(setAppStatus({status:'succeeded'}))
            } else {
                handleServerAppError(res.data, dispatch);
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}


// types
//type ActionsType = ReturnType<typeof setIsLoggedInAC> | SetAppStatusActionType | SetAppErrorActionType
type ActionsType = ReturnType<typeof setIsLoggedIn> | SetAppStatusActionType | SetAppErrorActionType