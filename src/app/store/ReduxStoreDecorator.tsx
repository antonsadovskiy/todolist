import React from "react";
import {applyMiddleware, combineReducers, legacy_createStore} from "redux";
import {todolistsReducer} from "../../features/TodoLists/reducers/todolist-reducer/todolists-reducer";
import {tasksReducer} from "../../features/TodoLists/reducers/tasks-reducer/tasks-reducer";
import {AppStateType} from "./store";
import {Provider} from "react-redux";
import {v1} from "uuid";
import {TaskPriority, TaskStatus} from "../../api/todolistAPI";
import {appReducer} from "../app-reducer";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer,
    app: appReducer
})

const initialState: AppStateType = {
    todolists: [
        {id: 'todolistId1', title: 'what to learn', filter: 'all', order: 0, addedDate: '', entityStatus: 'idle'},
        {id: 'todolistId2', title: 'what to buy', filter: 'active', order: 0, addedDate: '', entityStatus: 'loading'},
    ],
    tasks: {
        ["todolistId1"]: [
            {
                id: v1(), title: 'Angular', status: TaskStatus.New, description: '',
                addedDate: '', deadline: '', order: 0, priority: TaskPriority.Low, startDate: '',
                todoListId: 'TodolistId1', entityStatus: 'idle'
            },
            {
                id: v1(), title: 'TypeScript', status: TaskStatus.Completed, description: '',
                addedDate: '', deadline: '', order: 0, priority: TaskPriority.Low, startDate: '',
                todoListId: 'TodolistId1',  entityStatus: 'idle'
            },
            {
                id: v1(), title: 'React', status: TaskStatus.New, description: '',
                addedDate: '', deadline: '', order: 0, priority: TaskPriority.Low, startDate: '',
                todoListId: 'TodolistId1',  entityStatus: 'idle'
            },
        ],
        ["todolistId2"]: [
            {
                id: v1(), title: "Get a job", status: TaskStatus.New, description: '',
                addedDate: '', deadline: '', order: 0, priority: TaskPriority.Low, startDate: '',
                todoListId: 'TodolistId2',  entityStatus: 'idle'
            },
            {
                id: v1(), title: "Iphone", status: TaskStatus.New, description: '',
                addedDate: '', deadline: '', order: 0, priority: TaskPriority.Low, startDate: '',
                todoListId: 'TodolistId2',  entityStatus: 'idle'
            },
            {
                id: v1(), title: "Happy parents", status: TaskStatus.New, description: '',
                addedDate: '', deadline: '', order: 0, priority: TaskPriority.Low, startDate: '',
                todoListId: 'TodolistId2',  entityStatus: 'idle'
            },
        ]
    },
    app: {
        status: 'idle',
        error: null
    }
}

const storybookStore = legacy_createStore(rootReducer, initialState, applyMiddleware(thunk))

export const reduxStoreDecorator = (storyFunc: () => React.ReactNode) => {
    return <Provider store={storybookStore}>{storyFunc()}</Provider>
}