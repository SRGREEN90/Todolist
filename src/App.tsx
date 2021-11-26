import React, {useState} from 'react';
import { v1 } from 'uuid';
import './App.css';
import TodoList from './TodoList';


//its coommit from here ooo

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
    console.log(tasks)
    // const tasks = result[0]
    // const setTasks = result[1]

    const addTask = (title: string) => {
        let newTask = {id: v1(), title: title, isDone: false}
            let newTasks = [newTask, ...tasks]
        setTasks(newTasks)
    }

    const removeTask = (taskID: string) => {
        const UpdatedTasks = tasks.filter(task => task.id !== taskID)
        setTasks(UpdatedTasks)
    }

    let tasksForRender = tasks
    if(filter === 'active') {
        tasksForRender = tasks.filter(t => t.isDone === false)
    }

    if(filter === 'completed') {
        tasksForRender = tasks.filter(t => t.isDone === true)
    }

    return (
        <div className="App">
            <TodoList removeTask={removeTask}
                      tasks={tasksForRender}
                      title={TodoListApp}
                      changeFilter={changeFilter}
                      addTask={addTask}
            />
        </div>
    );
}
export default App;
