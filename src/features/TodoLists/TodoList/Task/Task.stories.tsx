import { Meta, StoryObj } from "@storybook/react";
import Task from "./Task";
import { reduxStoreDecorator } from "../../../../app/store/ReduxStoreDecorator";
import { TaskPriority, TaskStatus } from "../../../../api/types";

const meta: Meta<typeof Task> = {
  title: "TodoList/TaskDrawer.tsx",
  component: Task,
  tags: ["autodocs"],
  decorators: [reduxStoreDecorator],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const ActiveTaskExample: Story = {
  args: {
    task: {
      id: "1",
      title: "React",
      status: TaskStatus.New,
      description: "",
      addedDate: "",
      deadline: "",
      order: 0,
      priority: TaskPriority.Low,
      startDate: "",
      todoListId: "",
      entityStatus: "idle",
    },
  },
};
export const CompletedTaskExample: Story = {
  args: {
    task: {
      id: "2",
      title: "Angular",
      status: TaskStatus.Completed,
      description: "",
      addedDate: "",
      deadline: "",
      order: 0,
      priority: TaskPriority.Low,
      startDate: "",
      todoListId: "",
      entityStatus: "idle",
    },
  },
};
