import React from "react";
import { combineReducers } from "redux";
import { todolistsReducer } from "../../features/TodoLists/slice/todolist-reducer/todolists-slice";
import { tasksReducer } from "../../features/TodoLists/slice/tasks-reducer/tasks-slice";
import { AppStateType } from "./store";
import { Provider } from "react-redux";
import { v1 } from "uuid";
import { appReducer } from "../../features/App/slice/app-slice";
import thunk from "redux-thunk";
import { authReducer } from "../../features/Login/slice/auth-slice";
import { configureStore } from "@reduxjs/toolkit";
import { TaskPriority, TaskStatus } from "../../api/types";

const rootReducer = combineReducers({
  todolists: todolistsReducer,
  tasks: tasksReducer,
  app: appReducer,
  auth: authReducer,
});

const initialState: AppStateType = {
  todolists: [
    {
      id: "todolistId1",
      title: "what to learn",
      filter: "all",
      order: 0,
      addedDate: "",
      entityStatus: "idle",
      pageCount: 4,
      page: 1,
      totalCount: 0,
    },
    {
      id: "todolistId2",
      title: "what to buy",
      filter: "active",
      order: 0,
      addedDate: "",
      entityStatus: "loading",
      pageCount: 4,
      page: 1,
      totalCount: 0,
    },
  ],
  tasks: {
    ["todolistId1"]: [
      {
        id: v1(),
        title: "Angular",
        status: TaskStatus.New,
        description: "",
        addedDate: "",
        deadline: "",
        order: 0,
        priority: TaskPriority.Low,
        startDate: "",
        todoListId: "TodolistId1",
        entityStatus: "idle",
      },
      {
        id: v1(),
        title: "TypeScript",
        status: TaskStatus.Completed,
        description: "",
        addedDate: "",
        deadline: "",
        order: 0,
        priority: TaskPriority.Low,
        startDate: "",
        todoListId: "TodolistId1",
        entityStatus: "idle",
      },
      {
        id: v1(),
        title: "React",
        status: TaskStatus.New,
        description: "",
        addedDate: "",
        deadline: "",
        order: 0,
        priority: TaskPriority.Low,
        startDate: "",
        todoListId: "TodolistId1",
        entityStatus: "idle",
      },
    ],
    ["todolistId2"]: [
      {
        id: v1(),
        title: "Get a job",
        status: TaskStatus.New,
        description: "",
        addedDate: "",
        deadline: "",
        order: 0,
        priority: TaskPriority.Low,
        startDate: "",
        todoListId: "TodolistId2",
        entityStatus: "idle",
      },
      {
        id: v1(),
        title: "Iphone",
        status: TaskStatus.New,
        description: "",
        addedDate: "",
        deadline: "",
        order: 0,
        priority: TaskPriority.Low,
        startDate: "",
        todoListId: "TodolistId2",
        entityStatus: "idle",
      },
      {
        id: v1(),
        title: "Happy parents",
        status: TaskStatus.New,
        description: "",
        addedDate: "",
        deadline: "",
        order: 0,
        priority: TaskPriority.Low,
        startDate: "",
        todoListId: "TodolistId2",
        entityStatus: "idle",
      },
    ],
  },
  app: {
    status: "idle",
    error: null,
    isInitialized: true,
  },
  auth: {
    isLoggedIn: true,
  },
};

const storybookStore = configureStore({
  reducer: rootReducer,
  preloadedState: initialState,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunk),
});

export const reduxStoreDecorator = (storyFunc: () => React.ReactNode) => {
  return <Provider store={storybookStore}>{storyFunc()}</Provider>;
};
