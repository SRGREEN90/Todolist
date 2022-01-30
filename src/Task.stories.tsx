import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {action} from "@storybook/addon-actions";
import {Task} from "./Task";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'TODOLISTS/Task',
    component: Task,
    args: {
        changeTaskStatus: action('change status'),
        changeTaskTitle: action('change status'),
        removeTask: action('remove task'),
        todolistId: '12'
    }
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof Task>;


// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Task> = (args) => <Task {...args} />;

export const TaskIsDoneStory = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

export const TaskIsNotDoneStory = Template.bind({});

TaskIsDoneStory.args = {
    task: {id: 'q', title: 'js', isDone: true},
}
TaskIsNotDoneStory.args = {
    task: {id: 'qw', title: 'js', isDone: false},
}