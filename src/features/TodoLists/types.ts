import { RequestType } from "../App/types";
import { TaskStatus, TaskPriority } from "../../api/types";

export type UpdateDomainTaskModelType = {
  title?: string;
  description?: string;
  status?: TaskStatus;
  priority?: TaskPriority;
  startDate?: string;
  deadline?: string;
};

export type TasksType = {
  [key: string]: Array<TaskDomainType>;
};

export type FilterType = "all" | "active" | "completed";

export type TodoListType = {
  id: string;
  addedDate: string;
  order: number;
  title: string;
};

export type TodoListDomainType = TodoListType & {
  filter: FilterType;
  entityStatus: RequestType;
  totalCount: number;
  pageCount: number;
  page: number;
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
