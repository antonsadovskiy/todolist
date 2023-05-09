import {Meta, StoryObj} from "@storybook/react";
import {Input} from "./Input";

const meta: Meta<typeof Input> = {
    title: 'TodoList/Input',
    component: Input,
    tags: ['autodocs'],
    argTypes: {
        addItem: {
            description: 'add item',
            action: 'clicked'
        }
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const InputExample: Story = {}