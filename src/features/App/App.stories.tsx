import { Meta, StoryObj } from "@storybook/react";
import App from "./App";
import { reduxStoreDecorator } from "../../app/store/ReduxStoreDecorator";
import { withRouter } from "storybook-addon-react-router-v6";

const meta: Meta<typeof App> = {
  title: "TodoList",
  component: App,
  tags: ["autodocs"],
  decorators: [reduxStoreDecorator, withRouter],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const AppExample: Story = {
  args: {
    demo: true,
  },
};
