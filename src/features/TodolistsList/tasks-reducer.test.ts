import {fetchTasksTC, removeTaskTC, tasksReducer, TasksStateType, updateTaskTC} from "./tasks-reducer";
import {TaskPriorities, TaskStatuses} from "../../api/todolists-api";
let startState: TasksStateType = {}

beforeEach(()=>{
    startState = {
        'todoListId1': [
            {
                id: '1', title: 'CSS', status: TaskStatuses.New, todoListId: 'todoListId1', description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
            },
            {
                id: '2', title: 'JS', status: TaskStatuses.New, todoListId: 'todoListId1', description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
            },
            {
                id: '3', title: 'React', status: TaskStatuses.New, todoListId: 'todoListId1', description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
            },
        ],
        'todoListId2': [
            {
                id: '1', title: 'bread', status: TaskStatuses.New, todoListId: 'todoListId2', description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
            },
            {
                id: '2', title: 'milk', status: TaskStatuses.New, todoListId: 'todoListId2', description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
            },
            {
                id: '3', title: 'tea', status: TaskStatuses.New, todoListId: 'todoListId2', description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
            },
        ],
    }
})
test('correct task should be deleted from correct array', () => {
    let param = {taskId: '2', todoListId: 'todoListId2'}
    const action = removeTaskTC.fulfilled(param, "requestId", param)

    const endState = tasksReducer(startState, action)

    expect(endState['todoListId1'].length).toBe(3)
    expect(endState['todoListId2'].length).toBe(2)
    expect(endState['todoListId2'].every(t=> t.id !== "2")).toBeTruthy()

})

test('task should be added for todoList', () => {
    const action = fetchTasksTC.fulfilled({tasks: startState['todoListId1'], todoListId: 'todoListId1'}, 'requestId', 'todoListId1')

    const endState = tasksReducer(startState, action)

    expect(endState['todoListId1'].length).toBe(3)
    expect(endState['todoListId2'].length).toBe(0)
})






// test('title of specified task should be changed', () => {
//     let updateModel = { todoListId: 'todoListId2', taskId: '2',model: {status: TaskStatuses.New}}
//     const action = updateTaskTC.fulfilled(updateModel, 'requestId', updateModel )
//
//     const endState = tasksReducer(startState, action)
//
//     expect(endState['todoListId1'][1].status).toBe(TaskStatuses.Completed)
//     expect(endState['todoListId2'][2].status).toBe(TaskStatuses.New)
//
// })