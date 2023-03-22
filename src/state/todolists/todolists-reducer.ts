import {FilterType, TodoListType} from "../../App";

export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export type ChangeTodolistTitleActionType = ReturnType<typeof changeTodolistTitleAC>
export type ChangeTodolistFilterActionType = ReturnType<typeof changeTodolistFilterAC>

export type ActionsType = AddTodolistActionType | RemoveTodolistActionType |
    ChangeTodolistTitleActionType | ChangeTodolistFilterActionType

export const todolistsReducer = (state: Array<TodoListType>, action: ActionsType): Array<TodoListType> => {
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
            throw new Error('I don\'t understand action type')
    }
}

export const addTodolistAC = (todolistId: string, newTodolistTitle: string) => {
    return ({
        type: 'ADD-TODOLIST',
        payload: {
            todolistId,
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