import {AnyAction, applyMiddleware, combineReducers, legacy_createStore as createStore} from "redux";
import {tasksReducer} from "../../features/TodoLists/reducers/tasks-reducer/tasks-reducer";
import {todolistsReducer} from "../../features/TodoLists/reducers/todolist-reducer/todolists-reducer";
import thunk, {ThunkDispatch} from "redux-thunk";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {appReducer} from "../app-reducer";

const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer,
    app: appReducer
})

export type AppStateType = ReturnType<typeof rootReducer>
export type AppDispatchType = ThunkDispatch<AppStateType, any, AnyAction>
export const useAppDispatch = () => useDispatch<AppDispatchType>()
export const useAppSelector: TypedUseSelectorHook<AppStateType> = useSelector

export const store = createStore(rootReducer, applyMiddleware(thunk))