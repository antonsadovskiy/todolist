import {combineReducers, legacy_createStore as createStore} from "redux";
import {tasksReducer} from "../tasks/tasks-reducer";
import {todolistsReducer} from "../todolists/todolists-reducer";

const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer
})

export type AppStateType = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer)