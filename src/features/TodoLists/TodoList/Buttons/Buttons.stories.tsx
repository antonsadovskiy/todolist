import { Meta, StoryObj } from "@storybook/react";
import Buttons from "./Buttons";

const meta: Meta<typeof Buttons> = {
  title: "TodoList/Buttons",
  component: Buttons,
  tags: ["autodocs"],
  argTypes: {
    setFilter: {
      description: "set filter",
      action: "clicked",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const ButtonsExample: Story = {
  args: {
    filter: "active",
  },
};