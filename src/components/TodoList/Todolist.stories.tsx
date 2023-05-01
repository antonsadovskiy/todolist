import {Meta, StoryObj} from "@storybook/react";
import {TodoList} from "./TodoList";
import {reduxStoreDecorator} from "../../redux/decorators/ReduxStoreDecorator";

const meta: Meta<typeof TodoList> = {
    title: 'Todolist/TodoList',
    component: TodoList,
    tags: ['autodocs'],
    decorators: [reduxStoreDecorator]
};

export default meta;
type Story = StoryObj<typeof meta>;

export const TodolistExample: Story = {
    args: {
        todolist: {
            id: 'todolistId2', title: 'what to learn', filter: 'active', order: 0, addedDate: ''
        }
    }
}