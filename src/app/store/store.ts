import {
  AnyAction,
  applyMiddleware,
  combineReducers,
  legacy_createStore as createStore,
} from "redux";
import { tasksReducer } from "../../features/TodoLists/reducers/tasks-reducer/tasks-reducer";
import { todoListsReducer } from "../../features/TodoLists/reducers/todolist-reducer/todo-lists-reducer";
import thunk, { ThunkDispatch } from "redux-thunk";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { appReducer } from "../app-reducer";
import createSagaMiddleware from "redux-saga";
import { all } from "redux-saga/effects";
import { todoListsWatcherSaga } from "../../features/TodoLists/reducers/todolist-reducer/todo-lists-sagas";
import { tasksWatcherSaga } from "../../features/TodoLists/reducers/tasks-reducer/tasks-sagas";

const rootReducer = combineReducers({
  todoLists: todoListsReducer,
  tasks: tasksReducer,
  app: appReducer,
});

export type AppStateType = ReturnType<typeof rootReducer>;
export type AppDispatchType = ThunkDispatch<AppStateType, any, AnyAction>;
export const useAppDispatch = () => useDispatch<AppDispatchType>();
export const useAppSelector: TypedUseSelectorHook<AppStateType> = useSelector;

const sagaMiddleware = createSagaMiddleware();

function* rootWatcher() {
  yield all([todoListsWatcherSaga(), tasksWatcherSaga()]);
}

export const store = createStore(
  rootReducer,
  applyMiddleware(thunk, sagaMiddleware)
);

sagaMiddleware.run(rootWatcher);
