import React from "react";
import {combineReducers, legacy_createStore} from "redux";
import {todolistsReducer} from "../todolists/todolists-reducer";
import {tasksReducer} from "../tasks/tasks-reducer";
import {AppStateType} from "../store/store";
import {Provider} from "react-redux";

const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer
})

const initialState = {
    todolists: [
        {id: 'todolistId1', title: 'what to learn', filter: 'all'},
        {id: 'todolistId2', title: 'what to buy', filter: 'active'},
    ],
    tasks: {
        ["todolistId1"]: [
            {id: '1', title: 'React', isDone: false},
            {id: '2', title: 'Redux', isDone: false},
            {id: '3', title: 'Storybook', isDone: true},
        ],
        ["todolistId2"]: [
            {id: '1', title: 'Java', isDone: false},
            {id: '2', title: 'Django', isDone: false},
            {id: '3', title: 'Angular', isDone: false},
        ]
    }
}

const storybookStore = legacy_createStore(rootReducer, initialState as AppStateType)

export const reduxStoreDecorator = (storyFunc: () => React.ReactNode) => {
    return <Provider store={storybookStore}>{storyFunc()}</Provider>
}