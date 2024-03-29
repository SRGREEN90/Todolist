import React, {useEffect} from 'react'
import './App.css'
import { TodoListsList } from '../features/TodolistsList/TodoListsList'
import {useDispatch, useSelector} from 'react-redux'
import {AppRootStateType} from './store'
import {initializeAppTC, RequestStatusType} from './app-reducer'
import {ErrorSnackbar} from '../components/ErrorSnackbar/ErrorSnackbar'
import {AppBar, Button, CircularProgress, Container, IconButton, LinearProgress, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {Navigate, Route, Routes} from "react-router-dom";
import {Login} from "../features/login/Login";
import { logoutTC } from '../features/login/auth-reducer'



type PropsType = {
    demo?: boolean
}

const App = ({demo = false}: PropsType) => {
    const dispatch = useDispatch()
    const status = useSelector<AppRootStateType, RequestStatusType>((state) => state.app.status)
    const isInitialized = useSelector<AppRootStateType, boolean>((state) => state.app.isInitialized)
    const isLoggedIn = useSelector<AppRootStateType, boolean>((state) => state.auth.isLoggedIn)
    const logoutHandler = () => dispatch(logoutTC())


    useEffect(() => {
        dispatch(initializeAppTC())
    }, [dispatch])


    if (!isInitialized) {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
            <Navigate to={"/login"}/>
        </div>
    }

    return (
        <div className="App">
            <ErrorSnackbar/>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    {isLoggedIn && <Button color="inherit" onClick={logoutHandler}>Log out</Button>}
                </Toolbar>
                {status === 'loading' && <LinearProgress/>}
            </AppBar>
            <Container fixed>

                <Routes>
                    <Route path="/" element={<TodoListsList demo={demo}/>}/>
                    <Route path="login" element={<Login/>}/>
                    <Route path="/404" element={<h1 style={{textAlign: "center"}}>404: PAGE NOT FOUND</h1>}/>
                    <Route path="*" element={<Navigate to="/404"/>}/>
                </Routes>
            </Container>
        </div>
    )
}

export default App;
