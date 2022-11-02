import {tasksReducer} from '../features/TodolistsList/tasks-reducer';
import {todoListReducer} from '../features/TodolistsList/todolists-reducer';
import { combineReducers} from 'redux'
import thunkMiddleware from 'redux-thunk'
import {appReducer} from './app-reducer'
import {configureStore} from "@reduxjs/toolkit";
import {authReducer} from "../features/login/auth-reducer";
import {useDispatch} from "react-redux";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todoLists: todoListReducer,
    app: appReducer,
    auth: authReducer
})
export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().prepend(thunkMiddleware,)
});
export type AppRootStateType = ReturnType<typeof rootReducer>


// @ts-ignore
window.store = store;
// непосредственно создаём store
//export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));
// определить автоматически тип всего объекта состояния

// создаем store toolkit

type AppDispatchType = typeof store.dispatch //создаем обертку над диспатчем
export const useAppDispatch = () => useDispatch<AppDispatchType>()