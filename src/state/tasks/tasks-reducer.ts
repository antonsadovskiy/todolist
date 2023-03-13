import {v1} from "uuid";
import {TasksType, TaskType} from "../../App";

export type AddTaskActionType = {
    type: 'ADD-TASK'
    todolistId: string
    TaskTitle: string
}
export type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    todolistId: string
    taskId: string
}
export type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE'
    todolistId: string
    taskId: string
    newTaskTitle: string
}
export type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS'
    todolistId: string
    taskId: string
    newTaskStatus: boolean
}

export type ActionsType = AddTaskActionType | RemoveTaskActionType | ChangeTaskTitleActionType | ChangeTaskStatusActionType

export const tasksReducer = (state: TasksType, action: ActionsType) => {
    switch (action.type) {
        case "ADD-TASK":
            const newTask: TaskType = {
                id: v1(),
                title: action.TaskTitle,
                isDone: false
            }
            return {...state, [action.todolistId]: [newTask, ...state[action.todolistId]]}
        case "REMOVE-TASK":
            return {...state, [action.todolistId]: state[action.todolistId].filter(task => task.id !== action.taskId)}
        case "CHANGE-TASK-TITLE":
            return {...state, [action.todolistId]: state[action.todolistId].map(task => task.id === action.taskId ? {...task, title: action.newTaskTitle} : task)}
        case "CHANGE-TASK-STATUS":
            return {...state, [action.todolistId]: state[action.todolistId].map(task => task.id === action.taskId ? {...task, isDone: action.newTaskStatus} : task)}
        default:
            throw new Error('I don\'t understand this action type')
    }
}

export const AddTaskActionCreator = (todolistId: string, TaskTitle: string): AddTaskActionType => {
    return ({
        type: "ADD-TASK",
        todolistId: todolistId,
        TaskTitle: TaskTitle
    })
}
export const RemoveTaskActionCreator = (todolistId: string, taskId: string): RemoveTaskActionType => {
    return ({
        type: "REMOVE-TASK",
        todolistId: todolistId,
        taskId: taskId
    })
}
export const ChangeTaskTitleActionCreator = (todolistId: string, taskId: string, newTaskTitle: string): ChangeTaskTitleActionType => {
    return ({
        type: "CHANGE-TASK-TITLE",
        todolistId: todolistId,
        taskId: taskId,
        newTaskTitle: newTaskTitle
    })
}
export const ChangeTaskStatusActionCreator = (todolistId: string, taskId: string, newTaskStatus: boolean): ChangeTaskStatusActionType => {
    return ({
        type: "CHANGE-TASK-STATUS",
        todolistId: todolistId,
        taskId: taskId,
        newTaskStatus: newTaskStatus
    })
}