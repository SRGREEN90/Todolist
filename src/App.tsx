import React, {useReducer} from 'react';
import './App.css';
import {TaskType, Todolist} from './components/Todolist';
import {v1} from 'uuid';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {AddItemForm} from "./AddItemForm";

import TasksReducer, {
    addNewTaskAC,
    addTaskAC,
    changeStatusAC,
    removeTaskAC,
    removeTaskWithTodoAC,
} from "./Reducers/TaskReducer";
import TodolistReducer, {addTodolistAC, changeFilterAC, removeTodolistAC} from "./Reducers/TodolistReducer";
import {useDispatch, useSelector} from "react-redux";
import {rootReducerType} from "./Store/Store";



// import MenuIcon from '@mui/icons-material/Menu';

export type FilterValuesType = "all" | "active" | "completed";
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function App() {
    // let todolistId1 = v1();
    // let todolistId2 = v1();

    // let [todolists, todolistsDispatch] = useReducer(TodolistReducer,[
    //     {id: todolistId1, title: "What to learn", filter: "all"},
    //     {id: todolistId2, title: "What to buy", filter: "all"}
    // ])

    let dispatch = useDispatch()
    let tasks = useSelector<rootReducerType, TasksStateType>(state => state.tasks)

    const todolists = useSelector<rootReducerType, TodolistType[]>(state => state.todolists)

    // let [tasks, tasksDispatch] = useReducer(TasksReducer,{
    //     [todolistId1]: [
    //         {id: v1(), title: "HTML&CSS", isDone: true},
    //         {id: v1(), title: "JS", isDone: true}
    //     ],
    //     [todolistId2]: [
    //         {id: v1(), title: "Milk", isDone: true},
    //         {id: v1(), title: "React Book", isDone: true}
    //     ]
    // });

    // let [todolists, setTodolists] = useState<Array<TodolistType>>([
    //     {id: todolistId1, title: "What to learn", filter: "all"},
    //     {id: todolistId2, title: "What to buy", filter: "all"}
    // ])
    //
    // let [tasks, setTasks] = useState<TasksStateType>({
    //     [todolistId1]: [
    //         {id: v1(), title: "HTML&CSS", isDone: true},
    //         {id: v1(), title: "JS", isDone: true}
    //     ],
    //     [todolistId2]: [
    //         {id: v1(), title: "Milk", isDone: true},
    //         {id: v1(), title: "React Book", isDone: true}
    //     ]
    // });


    const updateTodolist = (todolistId: string, LocalTitle: string) => {
        // setTodolists(todolists.map(m => m.id === todolistId ? {...m, title: LocalTitle} : m))
        // todolistsDispatch(todolists.map(m => m.id === todolistId ? {...m, title: LocalTitle} : m))
    }

    const updateTask = (todolistId: string, id: string, LocalTitle: string) => {
        // setTasks({...tasks, [todolistId]: tasks[todolistId].map(m => m.id === id ? {...m, title: LocalTitle} : m)})
        console.log(LocalTitle)
    }

    function removeTask(id: string, todolistId: string) {
        debugger
        // //достанем нужный массив по todolistId:
        // let todolistTasks = tasks[todolistId];
        // // перезапишем в этом объекте массив для нужного тудулиста отфилтрованным массивом:
        // tasks[todolistId] = todolistTasks.filter(t => t.id != id);
        // // засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
        // setTasks({...tasks});
        // tasksDispatch(removeTaskAC(id, todolistId))
        dispatch(removeTaskAC (id, todolistId))
    }

    const addTodolist = (title: string) => {
        let newID = v1()
        // let newTodo: TodolistType = {id: newID, title: title, filter: "all"};
        // setTodolists([newTodo, ...todolists])
        // setTasks({...tasks, [newID]: []})
        // todolistsDispatch(addTodolistAC(title))
        dispatch(addTodolistAC(title, newID))
        dispatch(addNewTaskAC(newID))
    }

    function addTask(title: string, todolistId: string) {
        // let task = {id: v1(), title: title, isDone: false};
        // //достанем нужный массив по todolistId:
        // let todolistTasks = tasks[todolistId];
        // // перезапишем в этом объекте массив для нужного тудулиста копией, добавив в начало новую таску:
        // tasks[todolistId] = [task, ...todolistTasks];
        // // засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
        // setTasks({...tasks});
        // tasksDispatch(addTaskAC(title, todolistId))
        dispatch(addTaskAC(title, todolistId))
    }

    function changeStatus(id: string, isDone: boolean, todolistId: string) {
        // //достанем нужный массив по todolistId:
        // let todolistTasks = tasks[todolistId];
        // // найдём нужную таску:
        // let task = todolistTasks.find(t => t.id === id);
        // //изменим таску, если она нашлась
        // if (task) {
        //     task.isDone = isDone;
        //     // засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
        //     // setTasks({...tasks});
        // }
       // tasksDispatch(changeStatusAC(id, isDone, todolistId))
        dispatch(changeStatusAC(id, isDone, todolistId))

    }

    function changeFilter(value: FilterValuesType, todolistId: string) {
        // let todolist = todolists.find(tl => tl.id === todolistId);
        // if (todolist) {
        //     todolist.filter = value;
        //     setTodolists([...todolists])
        // }
      //  todolistsDispatch(changeFilterAC(value, todolistId))

        dispatch(changeFilterAC(value, todolistId))
    }

    function removeTodolist(id: string) {

        // // засунем в стейт список тудулистов, id которых не равны тому, который нужно выкинуть
        // setTodolists(todolists.filter(tl => tl.id != id));
        // // удалим таски для этого тудулиста из второго стейта, где мы храним отдельно таски
        // delete tasks[id]; // удаляем св-во из объекта... значением которого являлся массив тасок
        // // засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
        // setTasks({...tasks});
        // todolistsDispatch(removeTodolistAC(id))
        dispatch(removeTodolistAC(id))
        dispatch(removeTaskWithTodoAC(id))


    }

    return (

        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>

            <Container fixed>

                <Grid container style={{padding: '20px'}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>

                <Grid container spacing={3}>
                    {/*<Input callback={(title) => addTodolist(title)}/>*/}
                    {todolists.map(tl => {
                        let tasksForTodolist = tasks[tl.id];
                        // let tasksForTodolist = allTodolistTasks;

                        if (tl.filter === "active") {
                            tasksForTodolist = tasks[tl.id].filter(t => t.isDone === false);
                        }
                        if (tl.filter === "completed") {
                            tasksForTodolist = tasks[tl.id].filter(t => t.isDone === true);
                        }
                        return <Grid item>
                            <Paper style={{padding: '10px'}}>
                                <Todolist
                                    key={tl.id}
                                    id={tl.id}
                                    title={tl.title}
                                    tasks={tasksForTodolist}
                                    removeTask={removeTask}
                                    changeFilter={changeFilter}
                                    addTask={addTask}
                                    changeTaskStatus={changeStatus}
                                    filter={tl.filter}
                                    removeTodolist={removeTodolist}
                                    updateTask={updateTask}
                                    updateTodolist={updateTodolist}

                                />
                            </Paper>
                        </Grid>
                    })
                    }
                </Grid>
            </Container>
        </div>
    );
}

export default App;
