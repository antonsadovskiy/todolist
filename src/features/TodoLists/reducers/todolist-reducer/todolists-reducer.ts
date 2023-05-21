import {ResultCode, todolistAPI, TodoListType} from "../../../../api/todolistAPI";
import {Dispatch} from "redux";
import {RequestType, setAppStatusAC} from "../../../../app/app-reducer";
import {AxiosError} from "axios";
import {handlerAppNetworkError, handlerAppServerError} from "../../../../utils/error-utils";

export type FilterType = 'all' | 'active' | 'completed'
export type TodoListDomainType = TodoListType & {
    filter: FilterType
    entityStatus: RequestType
}

export type AddTodolistAT = ReturnType<typeof addTodolistAC>
export type RemoveTodolistAT = ReturnType<typeof removeTodolistAC>
type ChangeTodolistFilterAT = ReturnType<typeof changeTodolistFilterAC>
type ChangeTodolistTitleAT = ReturnType<typeof changeTodolistTitleAC>
export type SetTodolistStatusAT = ReturnType<typeof setTodolistStatusAC>
export type SetTodolistsAT = ReturnType<typeof setTodolistsAC>

export type ActionsType =
    | AddTodolistAT
    | RemoveTodolistAT
    | ChangeTodolistFilterAT
    | ChangeTodolistTitleAT
    | SetTodolistStatusAT
    | SetTodolistsAT

const initialState: Array<TodoListDomainType> = []

export const todolistsReducer = (state: Array<TodoListDomainType> = initialState, action: ActionsType): Array<TodoListDomainType> => {
    switch (action.type) {
        case "SET-TODOLISTS":
            return action.payload.todolists.map(list => ({...list, filter: 'all', entityStatus: 'idle'}))
        case 'ADD-TODOLIST':
            const newTodolist: TodoListDomainType = {
                ...action.payload.newTodolist,
                filter: 'all',
                entityStatus: 'idle'
            }
            return [newTodolist, ...state]
        case 'REMOVE-TODOLIST':
            return state.filter(list => list.id !== action.payload.todolistId)
        case "CHANGE-TODOLIST-FILTER":
            return state.map(list => list.id === action.payload.todolistId ? {
                ...list,
                filter: action.payload.newFilter
            } : list)
        case "CHANGE-TODOLIST-TITLE":
            return state.map(list => list.id === action.payload.todolistId ? {
                ...list,
                title: action.payload.newTitle
            } : list)
        case "SET-TODOLIST-STATUS":
            return state.map(list => list.id === action.payload.todolistId ? {
                ...list,
                entityStatus: action.payload.newStatus
            } : list)
        default:
            return state
    }
}

// actions
export const setTodolistsAC = (todolists: Array<TodoListType>) => {
    return {
        type: 'SET-TODOLISTS',
        payload: {
            todolists
        }
    } as const
}
export const addTodolistAC = (newTodolist: TodoListType) => {
    return {
        type: 'ADD-TODOLIST',
        payload: {
            newTodolist
        }
    } as const
}
export const removeTodolistAC = (todolistId: string) => {
    return {
        type: "REMOVE-TODOLIST",
        payload: {
            todolistId
        }
    } as const
}
export const changeTodolistTitleAC = (todolistId: string, newTitle: string) => {
    return {
        type: "CHANGE-TODOLIST-TITLE",
        payload: {
            todolistId,
            newTitle
        }
    } as const
}
export const changeTodolistFilterAC = (todolistId: string, newFilter: FilterType) => {
    return {
        type: "CHANGE-TODOLIST-FILTER",
        payload: {
            todolistId,
            newFilter
        }
    } as const
}
export const setTodolistStatusAC = (todolistId: string, newStatus: RequestType) => {
    return {
        type: "SET-TODOLIST-STATUS",
        payload: {
            todolistId,
            newStatus
        }
    } as const
}


// thunks
export const getTodolistsTC = () => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    todolistAPI.getTodolists()
        .then(res => {
            dispatch(setAppStatusAC('success'))
            dispatch(setTodolistsAC(res.data))
        })
        .catch((e: AxiosError) => {
            handlerAppNetworkError(dispatch, e)
        })
}
export const addTodolistTC = (title: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    todolistAPI.addTodolist(title)
        .then(res => {
            if (res.data.resultCode === ResultCode.OK) {
                dispatch(setAppStatusAC('success'))
                dispatch(addTodolistAC(res.data.data.item))
            } else {
                handlerAppServerError(dispatch, res.data)
            }
        })
        .catch((e: AxiosError) => {
            handlerAppNetworkError(dispatch, e)
        })
}
export const deleteTodolistTC = (todolistId: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    dispatch(setTodolistStatusAC(todolistId, 'loading'))
    todolistAPI.deleteTodolist(todolistId)
        .then(res => {
            if (res.data.resultCode === ResultCode.OK) {
                dispatch(setAppStatusAC('success'))
                dispatch(setTodolistStatusAC(todolistId, 'success'))
                dispatch(removeTodolistAC(todolistId))
            }
        })
        .catch((e: AxiosError) => {
            handlerAppNetworkError(dispatch, e)
            dispatch(setTodolistStatusAC(todolistId, 'error'))
        })
}
export const changeTodolistTitleTC = (todolistId: string, newTitle: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    todolistAPI.updateTodolist(todolistId, newTitle)
        .then(res => {
            if (res.data.resultCode === ResultCode.OK) {
                dispatch(setAppStatusAC('success'))
                dispatch(changeTodolistTitleAC(todolistId, newTitle))
            } else {
                handlerAppServerError(dispatch, res.data)
            }
        })
        .catch((e: AxiosError) => {
            handlerAppNetworkError(dispatch, e)
        })
}