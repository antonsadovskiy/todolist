import { Meta, StoryObj } from "@storybook/react";
import Task from "./Task";
import { TaskPriority, TaskStatus } from "../../../../api/tasksAPI";
import { reduxStoreDecorator } from "../../../../app/store/ReduxStoreDecorator";

const meta: Meta<typeof Task> = {
  title: "TodoList/Task",
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
