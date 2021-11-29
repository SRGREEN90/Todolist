import React, {useState} from 'react';
import {v1} from 'uuid';
import './App.css';
import TodoList from './TodoList';


//

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type FilterValuesType = 'all' | 'active' | 'completed'

function App() {
    const TodoListApp: string = 'What to learn'

    const initialState = [
        {id: v1(), title: 'HTML', isDone: false},
        {id: v1(), title: 'CSS', isDone: true},
        {id: v1(), title: 'REACT', isDone: false},
        {id: v1(), title: 'JavaScript', isDone: true},
        {id: v1(), title: 'TypeScript', isDone: true},
        {id: v1(), title: 'Redux', isDone: false},
        {id: v1(), title: 'Axios', isDone: false},
        {id: v1(), title: 'NodJS', isDone: true},
        {id: v1(), title: 'DOM', isDone: true},
    ]

    const [tasks, setTasks] = useState<Array<TaskType>>(initialState)
    const [filter, setFilter] = useState<FilterValuesType>("all")

    const changeFilter = (filter: FilterValuesType) => {
        setFilter(filter)
    }

    const addTask = (title: string) => {                      //получает title, который надо добавить
        let newTask = {id: v1(), title: title, isDone: false} //создает таску на осове этого title
        let newTasks = [newTask, ...tasks]   // добавляет в копию массива, куда попадают и остальные таски
        setTasks(newTasks)                   // и новый массив устанавливает в state
    }

    const removeTask = (taskID: string) => {                          // получает taskID, который надо добавить
        const UpdatedTasks = tasks.filter(task => task.id !== taskID) //создает отфильтрованную по taskID таску
        setTasks(UpdatedTasks)                                        // и отфильтрованный массив устанавливает в state
    }


    const changeStatus = (taskId: string, isDone: boolean) => {
        let task = tasks.find( t => t.id === taskId)
        if (task) {
            task.isDone = isDone
        }
        setTasks([...tasks])
    }

    let tasksForRender = tasks
    if (filter === 'active') {
        tasksForRender = tasks.filter(t => t.isDone === false)
    }

    if (filter === 'completed') {
        tasksForRender = tasks.filter(t => t.isDone === true)
    }

    return (
        <div className="App">
            <TodoList removeTask={removeTask}
                      tasks={tasksForRender}
                      title={TodoListApp}
                      changeFilter={changeFilter}
                      addTask={addTask}
                      changeTaskStatus={changeStatus}
                      buttonFilter={filter}
            />
        </div>
    );
}

export default App;
