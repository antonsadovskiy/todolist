import { instance } from "./instance";

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

export enum ResultCode {
  OK = 0,
  ERROR = 1,
  CAPTCHA = 2,
}

export type TodoListType = {
  id: string;
  addedDate: string;
  order: number;
  title: string;
};

export type ResponseType<T = {}> = {
  resultCode: number;
  messages: string[];
  data: T;
};
