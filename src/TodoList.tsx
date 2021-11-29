import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType, TaskType} from "./App";

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskID: string) => void
    changeFilter: (filter: FilterValuesType) => void
    addTask: (title: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean) => void
    buttonFilter: FilterValuesType
}

function TodoList(props: PropsType) {
    const [newTaskTitle, setNewTaskTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const addTask = () => {
        if (newTaskTitle.trim() !== '') {
            props.addTask(newTaskTitle.trim());
            setNewTaskTitle('')
        } else {
            setError('Title is required')
        }
    }
    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.charCode === 13) {
            props.addTask(newTaskTitle);
            setNewTaskTitle('')
        }
    }

    const onAllClickHandler = () => props.changeFilter('all')
    const onActiveClickHandler = () => props.changeFilter('active')
    const onCompletedClickHandler = () => props.changeFilter('completed')



    const tasksJSX = props.tasks.map(t => {
        const onRemoveHandler = () => {props.removeTask(t.id)}
        const onCheckboxHandler = (e: ChangeEvent<HTMLInputElement>) =>
        {props.changeTaskStatus(t.id, e.currentTarget.checked)}

        return (
            <li key={t.id} className={t.isDone ? 'is-done' : ''}>
                <input onChange={onCheckboxHandler} type="checkbox" checked={t.isDone}/>
                <span>{t.title}</span>
                <button onClick={onRemoveHandler}>x</button>
            </li>
        )
    })
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={newTaskTitle}
                       onChange={onNewTitleChangeHandler}
                       onKeyPress={onKeyPressHandler}
                       className={error ? 'error' : ''}
                />
                <button onClick={addTask}>+</button>
                {error && <div className='error-message'>Field is required</div>}
            </div>
            <ul>
                {tasksJSX}
            </ul>
            <div>
                <button className={props.buttonFilter === 'all' ? 'active-filter' : ''}
                        onClick={onAllClickHandler}>All</button>
                <button className={props.buttonFilter === 'active' ? 'active-filter' : ''}
                        onClick={onActiveClickHandler}>Active</button>
                <button className={props.buttonFilter === 'completed' ? 'active-filter' : ''}
                        onClick={onCompletedClickHandler}>Completed</button>
            </div>
        </div>
    )
}

export default TodoList