import { call, put, takeEvery } from "redux-saga/effects";
import { setAppErrorAC, setAppStatusAC } from "../../../../app/app-reducer";
import { AxiosError, AxiosResponse } from "axios";
import {
  ResponseType,
  todolistAPI,
  TodoListType,
} from "../../../../api/todolistAPI";
import {
  addTodolistAC,
  changeTodolistTitleAC,
  removeTodolistAC,
  setTodolistsAC,
  setTodolistStatusAC,
} from "./todo-lists-reducer";

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

const addTodoList = (title: string) => {
  return { type: "TODO-LISTS/ADD-TODO-LIST", title } as const;
};

export function* addTodoListWorkerSaga(action: ReturnType<typeof addTodoList>) {
  yield put(setAppStatusAC("loading"));
  try {
    const res: AxiosResponse<
      ResponseType<{
        item: TodoListType;
      }>
    > = yield call(todolistAPI.addTodolist, action.title);
    if (res.data.resultCode === 0) {
      yield put(setAppStatusAC("success"));
      yield put(addTodolistAC(res.data.data.item));
    } else {
      yield put(setAppStatusAC("error"));
      yield put(setAppErrorAC(res.data.messages[0]));
    }
  } catch (e) {
    console.log(e);
  }
}

const deleteTodoList = (todoListId: string) => {
  return { type: "TODO-LISTS/DELETE-TODO-LIST", todoListId } as const;
};

export function* deleteTodoListWorkerSaga(
  action: ReturnType<typeof deleteTodoList>
) {
  yield put(setAppStatusAC("loading"));
  yield put(setTodolistStatusAC(action.todoListId, "loading"));
  try {
    const res: AxiosResponse<ResponseType> = yield call(
      todolistAPI.deleteTodolist,
      action.todoListId
    );
    if (res.data.resultCode === 0) {
      yield put(setAppStatusAC("success"));
      yield put(setTodolistStatusAC(action.todoListId, "success"));
      yield put(removeTodolistAC(action.todoListId));
    }
  } catch (e) {
    yield put(setAppStatusAC("error"));
    yield put(setTodolistStatusAC(action.todoListId, "error"));
    yield put(setAppErrorAC((e as AxiosError).message));
  }
}

const updateTodoList = (todoListId: string, newTitle: string) => {
  return {
    type: "TODO-LISTS/UPDATE-TODO-LIST-TITLE",
    todoListId,
    newTitle,
  } as const;
};

export function* updateTodoListWorkerSaga(
  action: ReturnType<typeof updateTodoList>
) {
  yield put(setAppStatusAC("loading"));
  try {
    const res: AxiosResponse<ResponseType> = yield call(
      todolistAPI.updateTodolist,
      action.todoListId,
      action.newTitle
    );
    if (res.data.resultCode === 0) {
      yield put(setAppStatusAC("success"));
      yield put(changeTodolistTitleAC(action.todoListId, action.newTitle));
    }
  } catch (e) {
    console.log(e);
  }
}

export const todoListsSagaActions = {
  getTodoLists,
  addTodoList,
  deleteTodoList,
  updateTodoList,
};

export function* todoListsWatcherSaga() {
  yield takeEvery("TODO-LISTS/GET-TODO-LISTS", getTodoListsWorkerSaga);
  yield takeEvery("TODO-LISTS/ADD-TODO-LIST", addTodoListWorkerSaga);
  yield takeEvery("TODO-LISTS/DELETE-TODO-LIST", deleteTodoListWorkerSaga);
  yield takeEvery(
    "TODO-LISTS/UPDATE-TODO-LIST-TITLE",
    updateTodoListWorkerSaga
  );
}
