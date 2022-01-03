import {combineReducers, createStore} from "redux";
import taskReducer from "../Reducers/TaskReducer";
import todolistReducer from "../Reducers/TodolistReducer";


export const rootReducer = combineReducers({
    tasks: taskReducer,
    todolists: todolistReducer
})

export type rootReducerType = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer)