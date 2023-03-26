import {FilterType, TodoListType} from "../../App";
import {v1} from "uuid";

export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export type ChangeTodolistTitleActionType = ReturnType<typeof changeTodolistTitleAC>
export type ChangeTodolistFilterActionType = ReturnType<typeof changeTodolistFilterAC>

export type ActionsType = AddTodolistActionType | RemoveTodolistActionType |
    ChangeTodolistTitleActionType | ChangeTodolistFilterActionType

export const TodolistId1 = v1()
export const TodolistId2 = v1()

const initialState: Array<TodoListType> = [
    {id: TodolistId1, title: "What to learn", filter: 'all'},
    {id: TodolistId2, title: "Future plans", filter: 'active'},
]

export const todolistsReducer = (state: Array<TodoListType> = initialState, action: ActionsType): Array<TodoListType> => {
    switch (action.type) {
        case 'ADD-TODOLIST':
            const newTodolist: TodoListType = {
                id: action.payload.todolistId,
                title: action.payload.newTodolistTitle,
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