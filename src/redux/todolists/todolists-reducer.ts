import {v1} from "uuid";
import {TodolistType} from "../../api/todolistAPI";

export type FilterType = 'all' | 'active' | 'completed'

export type TodoListDomainType = TodolistType & {
    filter: FilterType
}

export type AddTodolistAT = ReturnType<typeof addTodolistAC>
export type RemoveTodolistAT = ReturnType<typeof removeTodolistAC>
export type ChangeTodolistTitleAT = ReturnType<typeof changeTodolistTitleAC>
export type ChangeTodolistFilterAT = ReturnType<typeof changeTodolistFilterAC>

export type ActionsType = AddTodolistAT | RemoveTodolistAT |
    ChangeTodolistTitleAT | ChangeTodolistFilterAT

const initialState: Array<TodoListDomainType> = []

export const todolistsReducer = (state: Array<TodoListDomainType> = initialState, action: ActionsType): Array<TodoListDomainType> => {
    switch (action.type) {
        case 'ADD-TODOLIST':
            const newTodolist: TodoListDomainType = {
                id: action.payload.todolistId,
                title: action.payload.newTodolistTitle,
                addedDate: '',
                order: 0,
                filter: 'all'
            }
            return [newTodolist, ...state]
        case 'REMOVE-TODOLIST':
            return state.filter(list => list.id !== action.payload.todolistId)
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(list => list.id === action.payload.todolistId ? {...list, title: action.payload.newTitle} : list)
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(list => list.id === action.payload.todolistId ? {...list, filter: action.payload.newFilter} : list)
        default:
            return state
    }
}

export const addTodolistAC = (newTodolistTitle: string) => {
    return ({
        type: 'ADD-TODOLIST',
        payload: {
            todolistId: v1(),
            newTodolistTitle
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