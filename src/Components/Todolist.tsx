import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import {FilterValuesType, TasksStateType} from '../App';
import Input from "./Input";
import EditableSpan from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {useSelector} from "react-redux";
import {rootReducerType} from "../Store/Store";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    removeTodolist: (id: string) => void
    filter: FilterValuesType
    updateTask: (todolistId: string, id: string, LocalTitle: string) => void
    updateTodolist: (todolistId: string, LocalTitle: string) => void
}

export function Todolist(props: PropsType) {
    const removeTodolist = () => props.removeTodolist(props.id)

    const onAllClickHandler = () => props.changeFilter("all", props.id);
    const onActiveClickHandler = () => props.changeFilter("active", props.id);
    const onCompletedClickHandler = () => props.changeFilter("completed", props.id);

    const callbackHandler = (title: string) => {
        props.addTask(title, props.id)
    }

    // const callBackForEditableSpanHandler=(title: string)=>{
    //     props.updateTask(props.id,t.id,LocalTitle:string)
    // }

    const callBackForEditableSpanShapkaHandler = (title: string) => {
        props.updateTodolist(props.id, title)
    }

    return <div>
        <h3>
            <EditableSpan title={props.title} callBackForEditableSpan={callBackForEditableSpanShapkaHandler}/>

            <IconButton onClick={removeTodolist}>
                <Delete/>
            </IconButton>
        </h3>
        <div>
            <Input callback={callbackHandler}/>
        </div>
        <ul>
            {
                props.tasks.map(t => {

                    const onClickHandler = () => props.removeTask(t.id, props.id)
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = e.currentTarget.checked;
                        props.changeTaskStatus(t.id, newIsDoneValue, props.id);
                    }
                    const callBackForEditableSpanHandler = (title: string) => {
                        props.updateTask(props.id, t.id, title)
                    }

                    return <li key={t.id} className={t.isDone ? "is-done" : ""}>

                        <Checkbox onChange={onChangeHandler} color='success' checked={t.isDone} />

                        <EditableSpan title={t.title} callBackForEditableSpan={callBackForEditableSpanHandler}/>

                        <IconButton onClick={onClickHandler}>
                            <Delete/>
                        </IconButton>

                    </li>
                })
            }
        </ul>
        <div>

            <Button  color="success"
                   // className={props.filter === 'all' ? "active-filter" : ""}
                    variant={props.filter === 'all' ? "outlined" : "text"}
                    onClick={onAllClickHandler}>
                All
            </Button>

            <Button  color="primary"
                    //className={props.filter === 'active' ? "active-filter" : ""}
                    variant={props.filter === 'active' ? "outlined" : "text"}
                    onClick={onActiveClickHandler}
            >
                Active
            </Button>

            <Button  color="error"
                   // className={props.filter === 'completed' ? "active-filter" : ""}
                    variant={props.filter === 'completed' ? "outlined" : "text"}
                    onClick={onCompletedClickHandler}
            >
                Completed
            </Button>


        </div>
    </div>
}


