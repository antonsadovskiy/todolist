import {
  ResultCode,
  TaskDomainType,
  TaskPriority,
  tasksAPI,
  TaskStatus,
  TaskType,
  UpdateTaskModelType
} from "../../../../api/todolistAPI";
import { Dispatch } from "redux";
import { AppStateType } from "../../../../app/store/store";
import { RequestType, setAppStatus } from "../../../../app/app-reducer";
import { AxiosError } from "axios";
import {
  handlerAppNetworkError,
  handlerAppServerError
} from "../../../../utils/error-utils";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { todolistActions } from "../todolist-reducer/todolists-reducer";
import {
  ClearTasksAndTodolists
} from "../../../../common/actions/common-actions";

export type TasksType = {
  [key: string]: Array<TaskDomainType>;
};

const initialState: TasksType = {};

const tasksSlice = createSlice({
  name: "tasks",
  initialState: initialState,
  reducers: {
    setTasks(state, action: PayloadAction<{ todolistId: string; tasks: Array<TaskType> }>) {
      state[action.payload.todolistId] = action.payload.tasks.map((t) => ({
        ...t,
        entityStatus: "idle"
      }));
    },
    addTask(state, action: PayloadAction<{ todolistId: string; task: TaskType }>) {
      state[action.payload.todolistId].unshift({
        ...action.payload.task,
        entityStatus: "idle"
      });
    },
    removeTask(state, action: PayloadAction<{ todolistId: string; taskId: string }>) {
      const index = state[action.payload.todolistId].findIndex((t) => t.id === action.payload.taskId);
      if (index !== -1) state[action.payload.todolistId].splice(index, 1);
    },
    updateTask(state, action: PayloadAction<{ todolistId: string; taskId: string; model: UpdateDomainTaskModelType }>) {
      const tasks = state[action.payload.todolistId];
      const index = tasks.findIndex((t) => t.id === action.payload.taskId);
      if (index !== -1)
        tasks[index] = {
          ...tasks[index],
          ...action.payload.model
        };
    },
    setTaskStatus(state, action: PayloadAction<{ todolistId: string; taskId: string; status: RequestType }>) {
      const tasks = state[action.payload.todolistId];
      const index = tasks.findIndex((t) => t.id === action.payload.taskId);
      if (index !== -1)
        tasks[index] = {
          ...tasks[index],
          entityStatus: action.payload.status
        };
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(todolistActions.setTodolists, (state, action) => {
        action.payload.todolists.forEach((list) => (state[list.id] = []));
      })
      .addCase(todolistActions.addTodolist, (state, action) => {
        state[action.payload.todolist.id] = [];
      })
      .addCase(todolistActions.removeTodolist, (state, action) => {
        delete state[action.payload.todolistId];
      })
      .addCase(ClearTasksAndTodolists.type, () => {
        return {};
      });
  }
});

export const tasksActions = tasksSlice.actions;
export const tasksReducer = tasksSlice.reducer;

// thunks
export const getTasksTC = (todolistId: string) => (dispatch: Dispatch) => {
  dispatch(setAppStatus({ status: "loading" }));
  tasksAPI
    .getTasks(todolistId)
    .then((res) => {
      dispatch(setAppStatus({ status: "success" }));
      dispatch(tasksActions.setTasks({ todolistId, tasks: res.data.items }));
    });
};
export const addTaskTC = (todolistId: string, taskTitle: string) => (dispatch: Dispatch) => {
  dispatch(setAppStatus({ status: "loading" }));
  tasksAPI
    .addTask(todolistId, taskTitle)
    .then((res) => {
      if (res.data.resultCode === ResultCode.OK) {
        dispatch(setAppStatus({ status: "success" }));
        dispatch(
          tasksActions.addTask({
            todolistId,
            task: res.data.data.item
          })
        );
      } else {
        handlerAppServerError(dispatch, res.data);
      }
    })
    .catch((e: AxiosError) => {
      handlerAppNetworkError(dispatch, e);
    });
};
export const deleteTaskTC = (todolistId: string, taskId: string) => (dispatch: Dispatch) => {
  dispatch(setAppStatus({ status: "loading" }));
  dispatch(
    tasksActions.setTaskStatus({
      todolistId,
      taskId,
      status: "loading"
    })
  );
  tasksAPI
    .deleteTask(todolistId, taskId)
    .then((res) => {
      if (res.data.resultCode === ResultCode.OK) {
        dispatch(setAppStatus({ status: "success" }));
        dispatch(
          tasksActions.setTaskStatus({
            todolistId,
            taskId,
            status: "success"
          })
        );
        dispatch(tasksActions.removeTask({ todolistId, taskId }));
      }
    })
    .catch((e: AxiosError) => {
      dispatch(
        tasksActions.setTaskStatus({
          todolistId,
          taskId,
          status: "error"
        })
      );
      handlerAppNetworkError(dispatch, e);
    });
};
export type UpdateDomainTaskModelType = {
  title?: string;
  description?: string;
  status?: TaskStatus;
  priority?: TaskPriority;
  startDate?: string;
  deadline?: string;
};
export const updateTaskTC =
  (todolistId: string, taskId: string, model: UpdateDomainTaskModelType) =>
    (dispatch: Dispatch, getState: () => AppStateType) => {
      dispatch(setAppStatus({ status: "loading" }));
      const task = getState().tasks[todolistId].find((task) => task.id === taskId);
      if (task) {
        const taskModel: UpdateTaskModelType = {
          title: task.title,
          status: task.status,
          description: task.description,
          priority: task.priority,
          startDate: task.startDate,
          deadline: task.deadline,
          ...model
        };
        tasksAPI
          .updateTask(todolistId, taskId, taskModel)
          .then((res) => {
            if (res.data.resultCode === ResultCode.OK) {
              dispatch(setAppStatus({ status: "success" }));
              dispatch(
                tasksActions.updateTask({
                  todolistId,
                  taskId,
                  model: taskModel
                })
              );
            } else {
              handlerAppServerError(dispatch, res.data);
            }
          })
          .catch((e: AxiosError) => {
            handlerAppNetworkError(dispatch, e);
          });
      }
    };
