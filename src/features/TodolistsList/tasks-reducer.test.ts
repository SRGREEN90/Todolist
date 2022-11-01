import {fetchTasksTC, tasksReducer} from "./tasks-reducer";
import {action} from "@storybook/addon-actions";

test('task should be added for todoList', () => {
    const action = fetchTasksTC.fulfilled({tasks: startState['todoListId1'], todoListId: 'todoListId1'}, 'requestId', 'todoListId1')

    const endState = tasksReducer({
        'todoListId1' : [],
        'todoListId2' : []
    }, action)
    expect(endState['todoListId1'].length).toBe(3)
    expect(endState['todoListId2'].length).toBe(0)
} )