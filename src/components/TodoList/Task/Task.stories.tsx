import {Meta, StoryObj} from "@storybook/react";
import Task from "./Task";

const meta: Meta<typeof Task> = {
    title: 'Todolist/Task',
    component: Task,
    tags: ['autodocs'],
    argTypes: {
        changeTaskTitle: {
            description: 'change task title',
            action: 'clicked'
        },
        changeTaskStatus: {
            description: 'change task status',
            action: 'clicked'
        },
        removeTask: {
            description: 'remove task',
            action: 'clicked'
        },
    }
};
export default meta;
type Story = StoryObj<typeof meta>;

export const ActiveTaskExample: Story = {
    args: {
        task: {id: '1', title: 'React', isDone: false}
    }
}
export const CompletedTaskExample: Story = {
    args: {
        task: {id: '2', title: 'Angular', isDone: true}
    }
}