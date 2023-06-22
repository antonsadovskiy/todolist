import { instance } from "./instance";
import { RequestType } from "../app/app-slice";
import { ResponseType } from "./todolistsAPI";

export const tasksAPI = {
  getTasks(todolistId: string, page: number, count: number) {
    return instance.get<GetTasksResponseType>(
      `todo-lists/${todolistId}/tasks?page=${page}&count=${count}`
    );
  },
  addTask(todolistId: string, title: string) {
    return instance.post<ResponseType<{ item: TaskType }>>(
      `todo-lists/${todolistId}/tasks`,
      { title }
    );
  },
  deleteTask(todolistId: string, taskId: string) {
    return instance.delete<ResponseType>(
      `todo-lists/${todolistId}/tasks/${taskId}`
    );
  },
  updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
    return instance.put<ResponseType<{ item: TaskType }>>(
      `todo-lists/${todolistId}/tasks/${taskId}`,
      model
    );
  },
};

export type GetTasksResponseType = {
  items: TaskType[];
  totalCount: number;
  error: string;
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

export type UpdateTaskModelType = {
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  startDate: string;
  deadline: string;
};
export type TaskType = {
  description: string;
  title: string;
  status: TaskStatus;
  priority: TaskPriority;
  startDate: string;
  deadline: string;
  id: string;
  todoListId: string;
  order: number;
  addedDate: string;
};

export type TaskDomainType = TaskType & {
  entityStatus: RequestType;
};
