import {
  AddTodolistAT,
  RemoveTodolistAT,
  SetTodoListsAT,
} from "../todolist-reducer/todo-lists-reducer";
import { TaskDomainType, TaskType } from "../../../../api/todolistAPI";
import { RequestType } from "../../../../app/app-reducer";
import { UpdateDomainTaskModelType } from "../../sagas/tasks-sagas";

export type TasksType = {
  [key: string]: Array<TaskDomainType>;
};
type AddTaskAT = ReturnType<typeof addTaskAC>;
type RemoveTaskAT = ReturnType<typeof removeTaskAC>;
type UpdateTaskAT = ReturnType<typeof updateTaskAC>;
type SetTaskStatusAT = ReturnType<typeof setTaskStatusAC>;
type SetTasksAT = ReturnType<typeof setTasksAC>;

export type ActionsType =
  | AddTodolistAT
  | RemoveTodolistAT
  | AddTaskAT
  | RemoveTaskAT
  | UpdateTaskAT
  | SetTaskStatusAT
  | SetTodoListsAT
  | SetTasksAT;

const initialState: TasksType = {};
export const tasksReducer = (
  state: TasksType = initialState,
  action: ActionsType
): TasksType => {
  switch (action.type) {
    case "SET-TODOLISTS":
      const copyState = { ...state };
      action.payload.todolists.forEach((list) => {
        copyState[list.id] = [];
      });
      return copyState;
    case "ADD-TODOLIST":
      return { ...state, [action.payload.newTodolist.id]: [] };
    case "REMOVE-TODOLIST":
      const stateCopy = { ...state };
      delete stateCopy[action.payload.todolistId];
      return stateCopy;
    case "SET-TASKS":
      return {
        ...state,
        [action.payload.todolistId]: action.payload.tasks.map((t) => ({
          ...t,
          entityStatus: "idle",
        })),
      };
    case "ADD-TASK":
      return {
        ...state,
        [action.payload.todolistId]: [
          {
            ...action.payload.task,
            entityStatus: "idle",
          },
          ...state[action.payload.todolistId],
        ],
      };
    case "REMOVE-TASK":
      return {
        ...state,
        [action.payload.todolistId]: state[action.payload.todolistId].filter(
          (task) => task.id !== action.payload.taskId
        ),
      };
    case "UPDATE-TASK":
      return {
        ...state,
        [action.payload.todolistId]: state[action.payload.todolistId].map(
          (task) =>
            task.id === action.payload.taskId
              ? { ...task, ...action.payload.model }
              : task
        ),
      };
    case "SET-TASK-STATUS":
      return {
        ...state,
        [action.payload.todolistId]: state[action.payload.todolistId].map(
          (task) =>
            task.id === action.payload.taskId
              ? {
                  ...task,
                  entityStatus: action.payload.newStatus,
                }
              : task
        ),
      };
    default:
      return state;
  }
};

// actions
export const setTasksAC = (todolistId: string, tasks: Array<TaskType>) => {
  return {
    type: "SET-TASKS",
    payload: {
      todolistId,
      tasks,
    },
  } as const;
};
export const addTaskAC = (todolistId: string, task: TaskType) => {
  return {
    type: "ADD-TASK",
    payload: {
      todolistId,
      task,
    },
  } as const;
};
export const removeTaskAC = (todolistId: string, taskId: string) => {
  return {
    type: "REMOVE-TASK",
    payload: {
      todolistId,
      taskId,
    },
  } as const;
};
export const updateTaskAC = (
  todolistId: string,
  taskId: string,
  model: UpdateDomainTaskModelType
) => {
  return {
    type: "UPDATE-TASK",
    payload: {
      todolistId,
      taskId,
      model,
    },
  } as const;
};
export const setTaskStatusAC = (
  todolistId: string,
  taskId: string,
  newStatus: RequestType
) => {
  return {
    type: "SET-TASK-STATUS",
    payload: {
      todolistId,
      taskId,
      newStatus,
    },
  } as const;
};
