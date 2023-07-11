import { call, put, takeEvery } from "redux-saga/effects";
import { setAppStatusAC } from "../../../../app/app-reducer";
import { AxiosResponse } from "axios";
import { todolistAPI, TodoListType } from "../../../../api/todolistAPI";
import { setTodolistsAC } from "./todo-lists-reducer";

const getTodoLists = () => ({ type: "TODO-LISTS/GET-TODO-LISTS" });

export function* getTodoListsWorkerSaga() {
  yield put(setAppStatusAC("loading"));
  try {
    const res: AxiosResponse<TodoListType[]> = yield call(
      todolistAPI.getTodolists
    );
    yield put(setAppStatusAC("success"));
    yield put(setTodolistsAC(res.data));
  } catch (e) {
    console.log("something went wrong");
  }
}

export const todoListsSagasActions = { getTodoLists };
export function* todoListsWatcherSaga() {
  yield takeEvery("TODO-LISTS/GET-TODO-LISTS", getTodoListsWorkerSaga);
}
