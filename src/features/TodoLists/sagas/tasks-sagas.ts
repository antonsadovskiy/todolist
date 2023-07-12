import { call, put, select, takeEvery } from "redux-saga/effects";
import { setAppErrorAC, setAppStatusAC } from "../../../app/app-reducer";
import { AxiosError } from "axios";
import {
  GetTasksResponseType,
  ResponseType,
  TaskPriority,
  tasksAPI,
  TaskStatus,
  TaskType,
  UpdateTaskModelType,
} from "../../../api/todolistAPI";
import {
  addTaskAC,
  removeTaskAC,
  setTasksAC,
  setTaskStatusAC,
  updateTaskAC,
} from "../reducers/tasks-reducer/tasks-reducer";
import { AppStateType } from "../../../app/store/store";

export const getTasks = (id: string) => {
  return { type: "TASKS/GET-TASKS", id } as const;
};

export function* getTasksWorkerSaga(action: ReturnType<typeof getTasks>) {
  yield put(setAppStatusAC("loading"));
  try {
    const data: GetTasksResponseType = yield call(tasksAPI.getTasks, action.id);
    yield put(setAppStatusAC("success"));
    yield put(setTasksAC(action.id, data.items));
  } catch (e) {
    console.log(e);
  }
}

export const addTask = (id: string, taskTitle: string) => {
  return { type: "TASKS/ADD-TASK", id, taskTitle } as const;
};

export function* addTaskWorkerSaga(action: ReturnType<typeof addTask>) {
  yield put(setAppStatusAC("loading"));
  try {
    const data: ResponseType<{
      item: TaskType;
    }> = yield call(tasksAPI.addTask, action.id, action.taskTitle);

    if (data.resultCode === 0) {
      yield put(setAppStatusAC("success"));
      yield put(addTaskAC(action.id, data.data.item));
    } else {
      yield put(setAppStatusAC("error"));
      yield put(setAppErrorAC(data.messages[0]));
    }
  } catch (e) {
    console.log(e);
  }
}

export const deleteTask = (todolistId: string, taskId: string) => {
  return { type: "TASKS/DELETE-TASK", todolistId, taskId } as const;
};

export function* deleteTaskWorkerSaga(action: ReturnType<typeof deleteTask>) {
  yield put(setAppStatusAC("loading"));
  yield put(setTaskStatusAC(action.todolistId, action.taskId, "loading"));
  try {
    const data: ResponseType = yield call(
      tasksAPI.deleteTask,
      action.todolistId,
      action.taskId
    );
    if (data.resultCode === 0) {
      yield put(setAppStatusAC("success"));
      yield put(setTaskStatusAC(action.todolistId, action.taskId, "success"));
      yield put(removeTaskAC(action.todolistId, action.taskId));
    }
  } catch (e) {
    yield put(setAppStatusAC("error"));
    yield put(setTaskStatusAC(action.todolistId, action.taskId, "error"));
    yield put(setAppErrorAC((e as AxiosError).message));
  }
}

export type UpdateDomainTaskModelType = {
  title?: string;
  description?: string;
  status?: TaskStatus;
  priority?: TaskPriority;
  startDate?: string;
  deadline?: string;
};

export const updateTask = (
  todolistId: string,
  taskId: string,
  model: UpdateDomainTaskModelType
) => {
  return { type: "TASKS/UPDATE-TASK", todolistId, taskId, model } as const;
};

export function* updateTaskWorkerSaga(action: ReturnType<typeof updateTask>) {
  yield put(setAppStatusAC("loading"));
  const tasks: TaskType[] = yield select(
    (state: AppStateType) => state.tasks[action.todolistId]
  );
  const task = tasks.find((task) => task.id === action.taskId);
  if (task) {
    const taskModel: UpdateTaskModelType = {
      title: task.title,
      status: task.status,
      description: task.description,
      priority: task.priority,
      startDate: task.startDate,
      deadline: task.deadline,
      ...action.model,
    };
    try {
      const data: ResponseType<{
        item: TaskType;
      }> = yield call(
        tasksAPI.updateTask,
        action.todolistId,
        action.taskId,
        taskModel
      );
      if (data.resultCode === 0) {
        yield put(setAppStatusAC("success"));
        yield put(updateTaskAC(action.todolistId, action.taskId, taskModel));
      }
    } catch (e) {
      console.log(e);
    }
  }
}

export const tasksSagaActions = { getTasks, addTask, deleteTask, updateTask };

export function* tasksWatcherSaga() {
  yield takeEvery("TASKS/GET-TASKS", getTasksWorkerSaga);
  yield takeEvery("TASKS/ADD-TASK", addTaskWorkerSaga);
  yield takeEvery("TASKS/DELETE-TASK", deleteTaskWorkerSaga);
  yield takeEvery("TASKS/UPDATE-TASK", updateTaskWorkerSaga);
}
