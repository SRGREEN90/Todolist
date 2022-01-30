import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import {action} from "@storybook/addon-actions";
import { EditableSpan } from './EditableSpan';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'TODOLISTS/EditableSpan',
    component: EditableSpan,
    argTypes: {
      onChange:{
          description: 'Value EditableSpan changed'
      },
        value: {
          defaultValue: 'HTML',
            description: 'Start Value EditableSpan'
        }
    }
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof EditableSpan>;


// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof EditableSpan> = (args) => <EditableSpan {...args} />;

export const EditableSpanStory = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args


EditableSpanStory.args = {
    onChange: action('Value EditableSpan changed')
}
