import {AnyAction, applyMiddleware, combineReducers, legacy_createStore as createStore} from "redux";
import {tasksReducer} from "../../features/TodoLists/tasks/tasks-reducer";
import {todolistsReducer} from "../../features/TodoLists/todolists/todolists-reducer";
import thunk, {ThunkDispatch} from "redux-thunk";
import {useDispatch} from "react-redux";

const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer
})

export type AppStateType = ReturnType<typeof rootReducer>
export type AppDispatchType = ThunkDispatch<AppStateType, any, AnyAction>
export const useAppDispatch = () => useDispatch<AppDispatchType>()

export const store = createStore(rootReducer, applyMiddleware(thunk))