import { instance } from "./instance";
import { TaskType } from "../features/TodoLists/types";
import {
  GetTasksResponseType,
  ResponseType,
  UpdateTaskModelType,
} from "./types";

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
