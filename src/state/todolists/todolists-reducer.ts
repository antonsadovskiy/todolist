import {FilterType, TodoListType} from "../../App";
import {v1} from "uuid";

export type AddTodolistActionType = ReturnType<typeof addTodolistActionCreator>
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistActionCreator>
export type ChangeTodolistTitleActionType = ReturnType<typeof changeTodolistTitleActionCreator>
export type ChangeTodolistFilterActionType = ReturnType<typeof changeTodolistFilterActionCreator>

export type ActionsType = AddTodolistActionType | RemoveTodolistActionType |
    ChangeTodolistTitleActionType | ChangeTodolistFilterActionType

export const todolistsReducer = (state: Array<TodoListType>, action: ActionsType): Array<TodoListType> => {
    switch (action.type) {
        case 'ADD-TODOLIST':
            const newTodolist: TodoListType = {
                id: v1(),
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

export const addTodolistActionCreator = (newTodolistTitle: string) => {
    return ({
        type: 'ADD-TODOLIST',
        payload: {
            newTodolistTitle
        }
    }) as const
}
export const removeTodolistActionCreator = (todolistId: string) => {
    return ({
        type: "REMOVE-TODOLIST",
        payload: {
            todolistId
        }
    }) as const
}
export const changeTodolistTitleActionCreator = (todolistId: string, newTitle: string) => {
    return ({
        type: "CHANGE-TODOLIST-TITLE",
        payload: {
            todolistId,
            newTitle
        }
    }) as const
}
export const changeTodolistFilterActionCreator = (todolistId: string, newFilter: FilterType) => {
    return ({
        type: "CHANGE-TODOLIST-FILTER",
        payload: {
            todolistId,
            newFilter
        }
    }) as const
}