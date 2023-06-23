import { TaskType } from "../features/TodoLists/types";

export type FormDataType = {
  email: string;
  password: string;
  rememberMe: boolean;
};
export type GetTasksResponseType = {
  items: TaskType[];
  totalCount: number;
  error: string;
};

export type UpdateTaskModelType = {
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  startDate: string;
  deadline: string;
};

export enum TaskStatus {
  New = 0,
  InProgress = 1,
  Completed = 2,
  Draft = 3,
}

export enum TaskPriority {
  Low = 0,
  Middle = 1,
  Hi = 2,
  Urgently = 3,
  Later = 4,
}

export enum ResultCode {
  OK = 0,
  ERROR = 1,
  CAPTCHA = 2,
}

export type ResponseType<T = {}> = {
  resultCode: number;
  messages: string[];
  data: T;
};
