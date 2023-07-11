import { Meta, StoryObj } from "@storybook/react";
import App from "./App";
import { reduxStoreDecorator } from "./store/ReduxStoreDecorator";

const meta: Meta<typeof App> = {
  title: "TodoList",
  component: App,
  tags: ["autodocs"],
  decorators: [reduxStoreDecorator],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const AppExample: Story = {
  args: {
    demo: true,
  },
};