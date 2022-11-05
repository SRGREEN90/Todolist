import {v1} from "uuid";
import {
    addTodolistTC,
    changeTodolistTitleTC,
    removeTodolistTC,
    TodolistDomainType,
    todoListReducer
} from "./todolists-reducer";
import {TodolistType} from "../../api/todolists-api";

let startState: TodolistDomainType[] = []
const todoListId1: string = v1()
const todoListId2: string = v1()

beforeEach(() => {
    startState = [
        {id: todoListId1, title: 'What to learn', filter: 'all', entityStatus: 'idle', addedDate: '', order: 0},
        {id: todoListId2, title: 'What to buy', filter: 'all', entityStatus: 'idle', addedDate: '', order: 0},
    ]
})

test('correct todolist should be removed', () => {
    const endState = todoListReducer(startState, removeTodolistTC.fulfilled({id: todoListId1}, 'requestId', 'todoListId1'))
    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todoListId2)
})

test('correct todolist should change its name', () => {
    let newTodoTitle: string = 'SuperTodolist'
    let payload = {todoId: todoListId2, todoTitle: newTodoTitle}
    const endState = todoListReducer(startState, changeTodolistTitleTC.fulfilled(payload, 'requestId', payload))
    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe(newTodoTitle)
})

test('correct todolist should be added', () => {
    let todolist: TodolistType = {
        id: 'some id',
        title: 'New Todo',
        addedDate: '',
        order: 0
    }
    const endState = todoListReducer(startState, addTodolistTC.fulfilled({todolist}, 'requestId', todolist.title))
    expect(endState[0].title).toBe(todolist.title)
    expect(endState.length).toBe(3)
})