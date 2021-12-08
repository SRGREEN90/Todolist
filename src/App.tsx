import React, {useState} from 'react';
import './App.css';
import TodoList from "./TodoList";
import {v1} from "uuid";

// Create
// Read
// Update
// Delete
// CRUD
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type FilterValuesType = "all" | "active" | "completed"

type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

type TaskStateType = {
    [key: string]: Array<TaskType>
}

function App() {

    const todoListId_1 = v1()
    const todoListId_2 = v1()

    const [todoList, setTodoList] = useState<Array<TodolistType>>([
        {id: todoListId_1, title: 'What to learn', filter: 'all'},
        {id: todoListId_2, title: 'What to buy', filter: 'all'}
    ])
    const [tasks, setTasks] = useState<TaskStateType>({
        [todoListId_1]: [
            {id: v1(), title: "HTML", isDone: true},
            {id: v1(), title: "CSS", isDone: true},
            {id: v1(), title: "REACT", isDone: false},
        ],
        [todoListId_2]: [
            {id: v1(), title: "MILK", isDone: true},
            {id: v1(), title: "BEER", isDone: true},
            {id: v1(), title: "FISH", isDone: false},
        ],
    })
    //BLL:==============================================================

    const changeFilter = (newFilter: FilterValuesType, todoListId: string) => {
        const updatedTodolist = todoList.map(tl => tl.id === todoListId ? {...tl, filter: newFilter} : tl)
        setTodoList(updatedTodolist)
    }
    const removeTask = (taskID: string, todoListId: string) => {
        const copyState = {...tasks}
        copyState[todoListId] = tasks[todoListId].filter(t => t.id !== taskID)
        setTasks(copyState)
    }
    const addTask = (newTaskTitle: string, todoListId: string) => {
        const newTask: TaskType = {id: v1(), title: newTaskTitle, isDone: false}
        const copyState = {...tasks}
        copyState[todoListId] = [newTask, ...tasks[todoListId]]
        setTasks(copyState)
    }
    const changeTaskStatus = (taskID: string, newIsDone: boolean, todoListId: string) => {
        const copyState = {...tasks}
        copyState[todoListId] = tasks[todoListId].map(t=> t.id === taskID ? {...t, isDone: newIsDone} : t)
        setTasks(copyState)
    }
    const removeTodoList = (todoListId: string) => {
        setTodoList(todoList.filter(tl => tl.id !== todoListId))
    }

    // const getTasksForRender = (todoList: TodoListType) => {      --- это 2й вариант исполнения
    //     switch (todoList.filter) {
    //         case "active":
    //             return tasks[todoList.id].filter(t => !t.isDone)
    //         case "completed":
    //             return tasks[todoList.id].filter(t => t.isDone)
    //         default:
    //             return tasks[todoList.id]
    //     }
    // }

    const todolistComponents = todoList.map(tl => {
        //tasksForRender = getTasksForRender(tl)    --- это 2й вариант исполнения

        let tasksForRender = tasks[tl.id]
        if (tl.filter === "active") {
            tasksForRender = tasksForRender.filter(t => !t.isDone)
        }
        if (tl.filter === "completed") {
            tasksForRender = tasksForRender.filter(t => t.isDone)
        }

        return(
            <TodoList
                key={tl.id}
                id={tl.id}
                title={tl.title}
                tasks={tasksForRender}
                filter={tl.filter}
                addTask={addTask}
                removeTask={removeTask}
                changeFilter={changeFilter}
                changeTaskStatus={changeTaskStatus}
                removeTodoList ={removeTodoList}
        />
        )
    })

    //UI:
    return (
        <div className="App">
            {todolistComponents}
        </div>
    );
}

export default App;
