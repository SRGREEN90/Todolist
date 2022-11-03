import {Dispatch} from "redux"
import {authAPI} from "../api/todolists-api"
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {setIsLoggedIn} from "../features/login/auth-reducer";

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type InitialStateType = {
    status: RequestStatusType
    error: string | null
    isInitialized: boolean
}


export const initializeAppTC = createAsyncThunk('app/initializeApp', async (param, {dispatch}) => {
   const res = await authAPI.me()
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedIn({value: true}));
        } else {
        }

})


const slice = createSlice({
    name: 'app',
    initialState: {
        status: 'idle',
        error: null,
        isInitialized: false
    } as InitialStateType,
    reducers: {
        setAppStatus(state, action: PayloadAction<{ status: RequestStatusType }>){
            state.status = action.payload.status
        },
        setAppError(state, action: PayloadAction<{ error: string | null }>) {
            state.error = action.payload.error
        }
    },
    extraReducers: builder => {
        builder.addCase(initializeAppTC.fulfilled, (state)=>{
            state.isInitialized = true
        })
    }
})
export const appReducer = slice.reducer
export const {setAppStatus, setAppError} = slice.actions



export type SetAppErrorActionType = ReturnType<typeof setAppError>
export type SetAppStatusActionType = ReturnType<typeof setAppStatus>
//export type SetAppInitializedActionType = ReturnType<typeof setInitialized>


// export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
//     switch (action.type) {
//         case 'APP/SET-STATUS':
//             return {...state, status: action.status}
//         case 'APP/SET-ERROR':
//             return {...state, error: action.error}
//         case 'APP/SET-INITIALIZED':
//             return {...state, isInitialized: action.isInitialized}
//         default:
//             return {...state}
//     }
// }
//
//
//
// export const setAppErrorAC = (error: string | null) => ({type: 'APP/SET-ERROR', error} as const)
// export const setAppStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const)
// export const setInitializedAC = (isInitialized: boolean) => ({type: 'APP/SET-INITIALIZED', isInitialized} as const)
//

//
// type ActionsType =
//     | SetAppErrorActionType
//     | SetAppStatusActionType
//     |SetAppInitializedActionType

// export const initializeAppTC_ = () => (dispatch: Dispatch) => {
//     dispatch(setAppStatus({status: 'loading'}))
//     authAPI.me().then(res => {
//         if (res.data.resultCode === 0) {
//             dispatch(setAppStatus({status:'succeeded'}))
//             dispatch(setIsLoggedIn({value: true}));
//         } else {
//             handleServerAppError(res.data, dispatch);
//         }
//     })
//         .catch((error) => {
//             handleServerNetworkError(error, dispatch)
//
//         })
//         .finally(()=>{
//             dispatch(setInitialized({isInitialized: true}))
//
//         })
// }