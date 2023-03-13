import {FilterType, TodoListType} from "../../App";
import {v1} from "uuid";

export type AddTodolistActionType = {
    type: 'ADD-TODOLIST'
    newTodolistTitle: string
}
export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST'
    todolistId: string
}
export type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    todolistId: string
    newTitle: string
}
export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER'
    todolistId: string
    newFilter: FilterType
}

export type ActionsType =
    AddTodolistActionType |
    RemoveTodolistActionType |
    ChangeTodolistTitleActionType | ChangeTodolistFilterActionType

export const todolistsReducer = (state: Array<TodoListType>, action: ActionsType): Array<TodoListType> => {
    switch (action.type) {
        case 'ADD-TODOLIST':
            const newTodolist: TodoListType = {
                id: v1(),
                title: action.newTodolistTitle,
                filter: 'all'
            }
            return [newTodolist, ...state]
        case 'REMOVE-TODOLIST':
            return state.filter(list => list.id !== action.todolistId)
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(list => list.id === action.todolistId ? {...list, title: action.newTitle} : list)
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(list => list.id === action.todolistId ? {...list, filter: action.newFilter} : list)
        default:
            throw new Error('I don\'t understand action type')
    }
}

export const AddTodolistActionCreator = (newTodolistTitle: string): AddTodolistActionType => {
    return ({
        type: 'ADD-TODOLIST',
        newTodolistTitle: newTodolistTitle
    })
}
export const RemoveTodolistActionCreator = (todolistId: string): RemoveTodolistActionType => {
    return ({
        type: "REMOVE-TODOLIST",
        todolistId: todolistId
    })
}
export const ChangeTodolistTitleActionCreator = (todolistId: string, newTitle: string): ChangeTodolistTitleActionType => {
    return ({
        type: "CHANGE-TODOLIST-TITLE",
        todolistId: todolistId,
        newTitle: newTitle
    })
}
export const ChangeTodolistFilterActionCreator = (todolistId: string, newFilter: FilterType): ChangeTodolistFilterActionType => {
    return ({
        type: "CHANGE-TODOLIST-FILTER",
        todolistId: todolistId,
        newFilter: newFilter
    })
}