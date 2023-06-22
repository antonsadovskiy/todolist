import { appActions, RequestType } from "../../../../app/app-slice";
import { AxiosError } from "axios";
import {
  handlerAppNetworkError,
  handlerAppServerError,
} from "../../../../utils/error-utils";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  todolistsActions,
  todolistsThunks,
} from "../todolist-reducer/todolists-slice";
import { ClearTasksAndTodolists } from "../../../../common/actions/common-actions";
import { createAppAsyncThunk } from "../../../../common/utils";
import {
  TaskDomainType,
  TaskPriority,
  tasksAPI,
  TaskStatus,
  TaskType,
  UpdateTaskModelType,
} from "../../../../api/tasksAPI";
import { ResultCode } from "../../../../api/todolistsAPI";

export type TasksType = {
  [key: string]: Array<TaskDomainType>;
};

const initialState: TasksType = {};

const slice = createSlice({
  name: "tasks",
  initialState: initialState,
  reducers: {
    setTaskStatus(
      state,
      action: PayloadAction<{
        todolistId: string;
        taskId: string;
        status: RequestType;
      }>
    ) {
      const tasks = state[action.payload.todolistId];
      const index = tasks.findIndex((t) => t.id === action.payload.taskId);
      if (index !== -1) {
        tasks[index] = { ...tasks[index], entityStatus: action.payload.status };
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(todolistsThunks.getTodolists.fulfilled, (state, action) => {
        action.payload.todolists.forEach((list) => (state[list.id] = []));
      })
      .addCase(todolistsThunks.addTodolist.fulfilled, (state, action) => {
        state[action.payload.todolist.id] = [];
      })
      .addCase(todolistsThunks.deleteTodolist.fulfilled, (state, action) => {
        delete state[action.payload.id];
      })
      .addCase(getTasks.fulfilled, (state, action) => {
        state[action.payload.todolistId] = action.payload.tasks.map((t) => ({
          ...t,
          entityStatus: "idle",
        }));
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state[action.payload.task.todoListId].unshift({
          ...action.payload.task,
          entityStatus: "idle",
        });
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        const index = state[action.payload.todolistId].findIndex(
          (t) => t.id === action.payload.taskId
        );
        if (index !== -1) state[action.payload.todolistId].splice(index, 1);
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const tasks = state[action.payload.todolistId];
        const index = tasks.findIndex((t) => t.id === action.payload.taskId);
        if (index !== -1) {
          tasks[index] = { ...tasks[index], ...action.payload.model };
        }
      })
      .addCase(ClearTasksAndTodolists.type, () => {
        return {};
      });
  },
});

// thunks
const getTasks = createAppAsyncThunk<
  {
    todolistId: string;
    tasks: Array<TaskType>;
    totalCount: number;
  },
  { todolistId: string; count: number; page: number }
>("tasks/get", async (arg, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI;
  dispatch(appActions.setAppStatus({ status: "loading" }));
  dispatch(
    todolistsActions.setTodolistStatus({
      todolistId: arg.todolistId,
      status: "loading",
    })
  );
  try {
    const res = await tasksAPI.getTasks(arg.todolistId, arg.page, arg.count);
    dispatch(appActions.setAppStatus({ status: "success" }));
    dispatch(
      todolistsActions.setTodolistStatus({
        todolistId: arg.todolistId,
        status: "success",
      })
    );
    return {
      todolistId: arg.todolistId,
      tasks: res.data.items,
      totalCount: res.data.totalCount,
    };
  } catch (e) {
    handlerAppNetworkError(dispatch, e as AxiosError);
    return rejectWithValue(null);
  }
});

const addTask = createAppAsyncThunk<
  { task: TaskType },
  {
    todolistId: string;
    taskTitle: string;
  }
>("tasks/add", async (arg, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI;
  dispatch(appActions.setAppStatus({ status: "loading" }));
  try {
    const res = await tasksAPI.addTask(arg.todolistId, arg.taskTitle);
    if (res.data.resultCode === ResultCode.OK) {
      dispatch(appActions.setAppStatus({ status: "success" }));
      return { task: res.data.data.item };
    } else {
      handlerAppServerError(dispatch, res.data);
      return rejectWithValue(null);
    }
  } catch (e) {
    handlerAppNetworkError(dispatch, e as AxiosError);
    return rejectWithValue(null);
  }
});

const deleteTask = createAppAsyncThunk<
  {
    todolistId: string;
    taskId: string;
  },
  {
    todolistId: string;
    taskId: string;
  }
>("tasks/delete", async (arg, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI;
  dispatch(appActions.setAppStatus({ status: "loading" }));
  try {
    const res = await tasksAPI.deleteTask(arg.todolistId, arg.taskId);
    if (res.data.resultCode === ResultCode.OK) {
      dispatch(appActions.setAppStatus({ status: "success" }));
      dispatch(tasksActions.setTaskStatus({ ...arg, status: "success" }));
      return { todolistId: arg.todolistId, taskId: arg.taskId };
    } else {
      handlerAppServerError(dispatch, res.data);
      return rejectWithValue(null);
    }
  } catch (e) {
    handlerAppNetworkError(dispatch, e as AxiosError);
    return rejectWithValue(null);
  }
});

export type UpdateDomainTaskModelType = {
  title?: string;
  description?: string;
  status?: TaskStatus;
  priority?: TaskPriority;
  startDate?: string;
  deadline?: string;
};

const updateTask = createAppAsyncThunk<
  {
    todolistId: string;
    taskId: string;
    model: UpdateDomainTaskModelType;
  },
  {
    todolistId: string;
    taskId: string;
    model: UpdateDomainTaskModelType;
  }
>("task/update", async (arg, thunkAPI) => {
  const { dispatch, rejectWithValue, getState } = thunkAPI;
  dispatch(appActions.setAppStatus({ status: "loading" }));

  const task = getState().tasks[arg.todolistId].find(
    (task) => task.id === arg.taskId
  );
  if (!task) {
    return rejectWithValue(null);
  }
  const taskModel: UpdateTaskModelType = {
    title: task.title,
    status: task.status,
    description: task.description,
    priority: task.priority,
    startDate: task.startDate,
    deadline: task.deadline,
    ...arg.model,
  };
  try {
    const res = await tasksAPI.updateTask(
      arg.todolistId,
      arg.taskId,
      taskModel
    );
    if (res.data.resultCode === ResultCode.OK) {
      dispatch(appActions.setAppStatus({ status: "success" }));
      return { ...arg };
    } else {
      handlerAppServerError(dispatch, res.data);
      return rejectWithValue(null);
    }
  } catch (e) {
    handlerAppNetworkError(dispatch, e as AxiosError);
    return rejectWithValue(null);
  }
});

export const tasksActions = slice.actions;
export const tasksReducer = slice.reducer;
export const tasksThunks = { getTasks, addTask, deleteTask, updateTask };
