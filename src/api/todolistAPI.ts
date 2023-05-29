import axios from "axios";
import { RequestType } from "../app/app-reducer";

export type TodoListType = {
  id: string;
  addedDate: string;
  order: number;
  title: string;
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
export type ResponseType<T = {}> = {
  resultCode: number;
  messages: string[];
  data: T;
};
type GetTasksResponseType = {
  items: TaskType[];
  totalCount: number;
  error: string;
};
export type FormDataType = {
  email: string;
  password: string;
  rememberMe: boolean;
};

const instance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.1/",
  withCredentials: true,
});

export const todolistAPI = {
  getTodolists() {
    return instance.get<TodoListType[]>(`todo-lists`);
  },
  addTodolist(title: string) {
    return instance.post<ResponseType<{ item: TodoListType }>>(`todo-lists`, {
      title,
    });
  },
  deleteTodolist(todolistId: string) {
    return instance.delete<ResponseType>(`todo-lists/${todolistId}`);
  },
  updateTodolist(todolistId: string, title: string) {
    return instance.put<ResponseType>(`todo-lists/${todolistId}`, { title });
  },
};
export const tasksAPI = {
  getTasks(todolistId: string) {
    return instance.get<GetTasksResponseType>(`todo-lists/${todolistId}/tasks`);
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
export const authAPI = {
  me() {
    return instance.get<
      ResponseType<{ id: number; email: string; login: string }>
    >("auth/me");
  },
  login(data: FormDataType) {
    return instance.post<ResponseType<{ userId: number }>>("auth/login", data);
  },
  logout() {
    return instance.delete<ResponseType>("auth/login");
  },
};