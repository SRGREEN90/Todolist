import {authAPI, FieldErrorType, LoginParamsType} from "../../api/todolists-api";
import {handleServerAppError, handleServerNetworkError} from "../../Utils/Error-utils";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {SetAppErrorActionType, setAppStatus, SetAppStatusActionType} from '../../app/app-reducer';
import { AxiosError } from 'axios';




export const loginTC = createAsyncThunk<undefined, LoginParamsType,{ rejectValue: {errors: string[], fieldsErrors?: FieldErrorType[]} }>('auth/login', async (param, thunkApi) => {
    thunkApi.dispatch(setAppStatus({status: 'loading'}))
         try {
             const res =  await authAPI.login(param)
             if (res.data.resultCode === 0) {

                 thunkApi.dispatch(setAppStatus({status:'succeeded'}))
                   return;
             } else {
                 handleServerAppError(res.data, thunkApi.dispatch);
                 return thunkApi.rejectWithValue({errors: res.data.messages, fieldsErrors: res.data.fieldsErrors})
             }
         } catch (err)  {
              //  const error: AxiosError = err
              // handleServerNetworkError(error, thunkApi.dispatch)
             return thunkApi.rejectWithValue({errors: ['error'], fieldsErrors: undefined})
        }
});
export const logoutTC = createAsyncThunk('auth/logout', async (param, thunkApi) => {
    thunkApi.dispatch(setAppStatus({status: 'loading'}))
    try{
        const res = await authAPI.logout()
        if (res.data.resultCode === 0) {
           // thunkApi.dispatch(setIsLoggedIn({value: false}))
            thunkApi.dispatch(setAppStatus({status:'succeeded'}))
            return;
        } else {
            handleServerAppError(res.data, thunkApi.dispatch);
           return  thunkApi.rejectWithValue({})
        }
    } catch(error)  {
        //     handleServerNetworkError(error, thunkApi.dispatch)
        return  thunkApi.rejectWithValue({})
    }
})


const slice = createSlice({
    name: 'auth',
    initialState: {isLoggedIn: false},
    reducers: {
        setIsLoggedIn(state, action: PayloadAction<{ value: boolean }>) {
            state.isLoggedIn = action.payload.value
        }
    },
    extraReducers: (builder) => {
        builder.addCase(loginTC.fulfilled,(state) => {
            state.isLoggedIn = true
        });
        builder.addCase(logoutTC.fulfilled,(state) => {
            state.isLoggedIn = false
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





// export const logoutTC_ = () => (dispatch: Dispatch<ActionsType>) => {
//     dispatch(setAppStatus({status: 'loading'}))
//     authAPI.logout()
//         .then(res => {
//             if (res.data.resultCode === 0) {
//                 dispatch(setIsLoggedIn({value: false}))
//                 dispatch(setAppStatus({status:'succeeded'}))
//             } else {
//                 handleServerAppError(res.data, dispatch);
//             }
//         })
//         .catch((error) => {
//             handleServerNetworkError(error, dispatch)
//         })
// }

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

// types
//type ActionsType = ReturnType<typeof setIsLoggedInAC> | SetAppStatusActionType | SetAppErrorActionType
type ActionsType = ReturnType<typeof setIsLoggedIn> | SetAppStatusActionType | SetAppErrorActionType