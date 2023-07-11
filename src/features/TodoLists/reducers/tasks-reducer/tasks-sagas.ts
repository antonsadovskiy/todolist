import { call, put, takeEvery } from "redux-saga/effects";
import { setAppErrorAC, setAppStatusAC } from "../../../../app/app-reducer";
import { AxiosError, AxiosResponse } from "axios";
import {
  GetTasksResponseType,
  ResponseType,
  tasksAPI,
  TaskType,
} from "../../../../api/todolistAPI";
import {
  addTaskAC,
  removeTaskAC,
  setTasksAC,
  setTaskStatusAC,
} from "./tasks-reducer";

const getTasks = (id: string) => {
  return { type: "TASKS/GET-TASKS", id } as const;
};

export function* getTasksWorkerSaga(action: ReturnType<typeof getTasks>) {
  yield put(setAppStatusAC("loading"));
  try {
    const res: AxiosResponse<GetTasksResponseType> = yield call(
      tasksAPI.getTasks,
      action.id
    );
    yield put(setAppStatusAC("success"));
    yield put(setTasksAC(action.id, res.data.items));
  } catch (e) {
    console.log(e);
  }
}

const addTask = (id: string, taskTitle: string) => {
  return { type: "TASKS/ADD-TASK", id, taskTitle } as const;
};

export function* addTaskWorkerSaga(action: ReturnType<typeof addTask>) {
  yield put(setAppStatusAC("loading"));
  try {
    const res: AxiosResponse<
      ResponseType<{
        item: TaskType;
      }>
    > = yield call(tasksAPI.addTask, action.id, action.taskTitle);

    if (res.data.resultCode === 0) {
      yield put(setAppStatusAC("success"));
      yield put(addTaskAC(action.id, res.data.data.item));
    } else {
      yield put(setAppStatusAC("error"));
      yield put(setAppErrorAC(res.data.messages[0]));
    }
  } catch (e) {
    console.log(e);
  }
}

const deleteTask = (todolistId: string, taskId: string) => {
  return { type: "TASKS/DELETE-TASKS", todolistId, taskId } as const;
};

export function* deleteTaskWorkerSaga(action: ReturnType<typeof deleteTask>) {
  yield put(setAppStatusAC("loading"));
  yield put(setTaskStatusAC(action.todolistId, action.taskId, "loading"));
  try {
    const res: AxiosResponse<ResponseType> = yield call(
      tasksAPI.deleteTask,
      action.todolistId,
      action.taskId
    );
    if (res.data.resultCode === 0) {
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

export const tasksSagasActions = { getTasks, addTask, deleteTask };

export function* tasksWatcherSaga() {
  yield takeEvery("TASKS/GET-TASKS", getTasksWorkerSaga);
  yield takeEvery("TASKS/ADD-TASK", addTaskWorkerSaga);
  yield takeEvery("TASKS/DELETE-TASKS", deleteTaskWorkerSaga);
}
