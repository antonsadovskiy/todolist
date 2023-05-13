import {todolistAPI, TodoListType} from "../../../api/todolistAPI";
import {Dispatch} from "redux";
import {RequestType, setStatusAC} from "../../../app/store/app-reducer";

export type FilterType = 'all' | 'active' | 'completed'
export type TodoListDomainType = TodoListType & {
    filter: FilterType
    status: RequestType
}

export type AddTodolistAT = ReturnType<typeof addTodolistAC>
export type RemoveTodolistAT = ReturnType<typeof removeTodolistAC>
type ChangeTodolistTitleAT = ReturnType<typeof changeTodolistTitleAC>
type ChangeTodolistFilterAT = ReturnType<typeof changeTodolistFilterAC>
export type SetTodolistsAT = ReturnType<typeof setTodolistsAC>
export type SetTodolistStatusAT = ReturnType<typeof setTodolistStatusAC>

export type ActionsType = AddTodolistAT
    | RemoveTodolistAT
    | ChangeTodolistTitleAT
    | ChangeTodolistFilterAT
    | SetTodolistsAT
    | SetTodolistStatusAT

const initialState: Array<TodoListDomainType> = []

export const todolistsReducer = (state: Array<TodoListDomainType> = initialState, action: ActionsType): Array<TodoListDomainType> => {
    switch (action.type) {
        case "SET-TODOLISTS":
            return action.payload.todolists.map(list => ({...list, filter: 'all', status: 'idle'}))
        case 'ADD-TODOLIST':
            const newTodolist: TodoListDomainType = {
                ...action.payload.newTodolist,
                filter: 'all',
                status: 'idle'
            }
            return [newTodolist, ...state]
        case 'REMOVE-TODOLIST':
            return state.filter(list => list.id !== action.payload.todolistId)
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(list => list.id === action.payload.todolistId ? {
                ...list,
                title: action.payload.newTitle
            } : list)
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(list => list.id === action.payload.todolistId ? {
                ...list,
                filter: action.payload.newFilter
            } : list)
        case "SET-TODOLIST-STATUS":
            return state.map(list => list.id === action.payload.todolistId ? {
                ...list,
                status: action.payload.newStatus
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
    dispatch(setStatusAC('loading'))
    todolistAPI.getTodolists()
        .then(res => {
            dispatch(setStatusAC('idle'))
            dispatch(setTodolistsAC(res.data))
        })
}
export const addTodolistTC = (title: string) => (dispatch: Dispatch) => {
    dispatch(setStatusAC('loading'))
    todolistAPI.addTodolist(title)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setStatusAC('idle'))
                dispatch(addTodolistAC(res.data.data.item))
            }
        })
}
export const deleteTodolistTC = (todolistId: string) => (dispatch: Dispatch) => {
    dispatch(setTodolistStatusAC(todolistId, 'loading'))
    todolistAPI.deleteTodolist(todolistId)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setTodolistStatusAC(todolistId, 'idle'))
                dispatch(removeTodolistAC(todolistId))
            }
        })
}
export const changeTodolistTitleTC = (todolistId: string, newTitle: string) => (dispatch: Dispatch) => {
    dispatch(setStatusAC('loading'))
    todolistAPI.updateTodolist(todolistId, newTitle)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setStatusAC('idle'))
                dispatch(changeTodolistTitleAC(todolistId, newTitle))
            }
        })
}