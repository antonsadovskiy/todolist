import { AnyAction, combineReducers } from "redux";
import {
  tasksReducer
} from "../../features/TodoLists/reducers/tasks-reducer/tasks-slice";
import thunk, { ThunkDispatch } from "redux-thunk";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { appReducer } from "../app-slice";
import { configureStore } from "@reduxjs/toolkit";
import {
  authReducer
} from "../../features/Login/reducers/auth-slice";
import {
  todolistsReducer
} from "../../features/TodoLists/reducers/todolist-reducer/todolists-slice";

const rootReducer = combineReducers({
  todolists: todolistsReducer,
  tasks: tasksReducer,
  app: appReducer,
  auth: authReducer
});

export type AppStateType = ReturnType<typeof rootReducer>;
export type AppDispatchType = ThunkDispatch<AppStateType, any, AnyAction>;
export const useAppDispatch = () => useDispatch<AppDispatchType>();
export const useAppSelector: TypedUseSelectorHook<AppStateType> = useSelector;

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunk)
});

export type RootState = ReturnType<typeof store.getState>;
