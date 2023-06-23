import { instance } from "./instance";
import { TodoListType } from "../features/TodoLists/types";
import { ResponseType } from "./types";

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
