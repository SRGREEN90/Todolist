import React, {useEffect, useState} from 'react'
import axios from 'axios';
import {todolistApi} from "../api/todolist-api";


export default {
    title: 'API'
}

const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': 'a900de3d-69b2-4d80-9701-5045a006cecd'
    }
}
export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {

        todolistApi.getTodos()
            .then((res) => {
                setState(res.data);
            })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}
//=========================================================================


export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
       const title ='CreateTodolist'
        todolistApi.createTodo(title)
            .then( (res) => {
            setState(res.data);
        } )

    }, [])

    return <div> {JSON.stringify(state)}</div>
}

//=========================================================================

export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
       const todolistId = ''
        todolistApi.deleteTodo(todolistId)
            .then( (res) => {
            setState(res.data);
        })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}

//=========================================================================

export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = 'vau'
        const title = 'super'
        todolistApi.updateTodoTitle(todolistId, title)
            .then((res) => {
                setState(res.data)
            })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}



