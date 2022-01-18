import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import {FilterValuesType, TasksStateType, TodolistType} from '../App';
import Input from "./Input";
import EditableSpan from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {useDispatch, useSelector} from "react-redux";
import {rootReducerType} from "../Store/Store";
import {addTaskAC, changeStatusAC, removeTaskAC, removeTaskWithTodoAC, updateTaskAC} from "../Reducers/TaskReducer";
import {changeFilterAC, removeTodolistAC, updateTodolistAC} from "../Reducers/TodolistReducer";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
}

export function TodolistRedux(props: PropsType) {
    let todolist = useSelector<rootReducerType, TodolistType>(state =>              //refactoring
        state.todolists.filter(todo => todo.id === props.id)[0])
    let tasks = useSelector<rootReducerType, Array<TaskType>>(state =>
        state.tasks[props.id])      //refactoring
    const dispatch = useDispatch()  //refactoring


    const removeTodolist = () => {
        dispatch(removeTodolistAC(props.id))  //refactoring
    }
    const callbackHandlerAddTask = (title: string) => {
        dispatch(addTaskAC(title, props.id))  //refactoring
    }
    const callBackForEditableSpanShapkaHandler = (title: string) => {
        dispatch(updateTodolistAC(props.id, title))     //refactoring

    }
    const onAllClickHandler = () => dispatch(changeFilterAC("all", props.id))
    const onActiveClickHandler = () => dispatch(changeFilterAC("active", props.id))
    const onCompletedClickHandler = () => dispatch(changeFilterAC("completed", props.id))



    if (todolist.filter === "active") {
       tasks = tasks.filter(t => t.isDone);
    }
    if (todolist.filter === "completed") {
        tasks = tasks.filter(t => t.isDone);
    }

    return <div>
        <h3>
            <EditableSpan title={todolist.title} callBackForEditableSpan={callBackForEditableSpanShapkaHandler}/>

            <IconButton onClick={removeTodolist}>
                <Delete/>
            </IconButton>
        </h3>
        <div>
            <Input callback={callbackHandlerAddTask}/>
        </div>
        <ul>
            {
                tasks.map(t => {
                    const onClickHandler = () =>  dispatch(removeTaskAC (t.id, props.id))

                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = e.currentTarget.checked;
                        dispatch(changeStatusAC(t.id, newIsDoneValue, props.id))
                    }

                    const callBackForEditableSpanHandler = (title: string) => {
                        dispatch(updateTaskAC( props.id,title, t.id ))
                    }

                    return <li key={t.id} className={t.isDone ? "is-done" : ""}>

                        <Checkbox onChange={onChangeHandler} color='success' checked={t.isDone}/>

                        <EditableSpan title={t.title} callBackForEditableSpan={callBackForEditableSpanHandler}/>

                        <IconButton onClick={onClickHandler}>
                            <Delete/>
                        </IconButton>

                    </li>
                })
            }
        </ul>
        <div>

            <Button color="success"
                    variant={todolist.filter === 'all' ? "outlined" : "text"}
                    onClick={onAllClickHandler}>
                All
            </Button>

            <Button color="primary"
                    variant={todolist.filter === 'active' ? "outlined" : "text"}
                    onClick={onActiveClickHandler}
            >
                Active
            </Button>

            <Button color="error"
                    variant={todolist.filter === 'completed' ? "outlined" : "text"}
                    onClick={onCompletedClickHandler}
            >
                Completed
            </Button>


        </div>
    </div>
}


