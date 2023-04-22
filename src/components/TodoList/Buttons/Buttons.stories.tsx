import {Meta, StoryObj} from "@storybook/react";
import Buttons from "./Buttons";

const meta: Meta<typeof Buttons> = {
    title: 'Todolist/Buttons',
    component: Buttons,
    tags: ['autodocs'],
    argTypes: {
        setAll: {
            description: 'set all',
            action: 'clicked'
        },
        setActive: {
            description: 'set active',
            action: 'clicked'
        },
        setCompleted: {
            description: 'set completed',
            action: 'clicked'
        },
    }
};

export default meta;
type Story = StoryObj<typeof meta>;

export const ButtonsExample: Story = {
    args: {
        filter: 'active'
    }
}