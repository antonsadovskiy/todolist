import {v1} from "uuid";
import {todolistAPI, TodolistType} from "../../api/todolistAPI";
import {Dispatch} from "redux";

export type FilterType = 'all' | 'active' | 'completed'

export type TodoListDomainType = TodolistType & {
    filter: FilterType
}

export type AddTodolistAT = ReturnType<typeof addTodolistAC>
export type RemoveTodolistAT = ReturnType<typeof removeTodolistAC>
export type ChangeTodolistTitleAT = ReturnType<typeof changeTodolistTitleAC>
export type ChangeTodolistFilterAT = ReturnType<typeof changeTodolistFilterAC>
export type SetTodolistsAT = ReturnType<typeof setTodolistsAC>

export type ActionsType = AddTodolistAT | RemoveTodolistAT |
    ChangeTodolistTitleAT | ChangeTodolistFilterAT | SetTodolistsAT

const initialState: Array<TodoListDomainType> = []

export const todolistsReducer = (state: Array<TodoListDomainType> = initialState, action: ActionsType): Array<TodoListDomainType> => {
    switch (action.type) {
        case "SET-TODOLISTS":
            return action.payload.todolists.map(list => ({...list, filter: 'all'}))
        case 'ADD-TODOLIST':
            const newTodolist: TodoListDomainType = {
                ...action.payload.newTodolist,
                filter: 'all'
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
        default:
            return state
    }
}

export const setTodolistsAC = (todolists: Array<TodolistType>) => {
    return {
        type: 'SET-TODOLISTS',
        payload: {
            todolists
        }
    } as const
}
export const addTodolistAC = (newTodolist: TodolistType) => {
    return ({
        type: 'ADD-TODOLIST',
        payload: {
            newTodolist
        }
    }) as const
}
export const removeTodolistAC = (todolistId: string) => {
    return ({
        type: "REMOVE-TODOLIST",
        payload: {
            todolistId
        }
    }) as const
}
export const changeTodolistTitleAC = (todolistId: string, newTitle: string) => {
    return ({
        type: "CHANGE-TODOLIST-TITLE",
        payload: {
            todolistId,
            newTitle
        }
    }) as const
}
export const changeTodolistFilterAC = (todolistId: string, newFilter: FilterType) => {
    return ({
        type: "CHANGE-TODOLIST-FILTER",
        payload: {
            todolistId,
            newFilter
        }
    }) as const
}


export const getTodolistsTC = () => (dispatch: Dispatch) => {
    todolistAPI.getTodolists()
        .then(res => {
            dispatch(setTodolistsAC(res.data))
        })
}
export const addTodolistTC = (title: string) => (dispatch: Dispatch) => {
    todolistAPI.addTodolist(title)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(addTodolistAC(res.data.data.item))
            }
        })
}
export const deleteTodolistTC = (todolistId: string) => (dispatch: Dispatch) => {
    todolistAPI.deleteTodolist(todolistId)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(removeTodolistAC(todolistId))
            }
        })
}
export const changeTodolistTitleTC = (todolistId: string, newTitle: string) => (dispatch: Dispatch) => {
    todolistAPI.updateTodolist(todolistId, newTitle)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(changeTodolistTitleAC(todolistId, newTitle))
            }
        })
}