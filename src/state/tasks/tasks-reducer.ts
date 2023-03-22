import {v1} from "uuid";
import {TasksType, TaskType} from "../../App";

export type AddTodolistActionType = ReturnType<typeof addEmptyTodolistAC>
export type RemoveTasksFromTodolistActionType = ReturnType<typeof removeTasksFromTodolistAC>
export type AddTaskActionType = ReturnType<typeof addTaskAC>
export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
export type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>
export type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>


export type ActionsType = AddTodolistActionType |
    AddTaskActionType | RemoveTaskActionType |
    ChangeTaskTitleActionType | ChangeTaskStatusActionType | RemoveTasksFromTodolistActionType

export const tasksReducer = (state: TasksType, action: ActionsType) => {
    switch (action.type) {
        case "ADD-EMPTY-TODOLIST":
            return {...state, [action.payload.todolistId]: []}
        case "REMOVE-TASKS-FROM-TODOLIST":
            const stateCopy = {...state}
            delete stateCopy[action.payload.todolistId]
            return stateCopy
        case "ADD-TASK":
            const newTask: TaskType = {
                id: v1(),
                title: action.payload.TaskTitle,
                isDone: false
            }
            return {...state, [action.payload.todolistId]: [newTask, ...state[action.payload.todolistId]]}
        case "REMOVE-TASK":
            return {...state, [action.payload.todolistId]:
                    state[action.payload.todolistId].filter(task => task.id !== action.payload.taskId)}
        case "CHANGE-TASK-TITLE":
            return {...state, [action.payload.todolistId]: state[action.payload.todolistId].map(task => task.id === action.payload.taskId ? {...task, title: action.payload.newTaskTitle} : task)}
        case "CHANGE-TASK-STATUS":
            return {...state, [action.payload.todolistId]: state[action.payload.todolistId].map(task => task.id === action.payload.taskId ? {...task, isDone: action.payload.newTaskStatus} : task)}
        default:
            throw new Error('I don\'t understand this action type')
    }
}
export const addEmptyTodolistAC = (todolistId: string) => {
    return ({
        type: 'ADD-EMPTY-TODOLIST',
        payload: {
            todolistId
        }
    }) as const
}
export const removeTasksFromTodolistAC = (todolistId: string) => {
    return ({
        type: 'REMOVE-TASKS-FROM-TODOLIST',
        payload: {
            todolistId
        }
    }) as const
}
export const addTaskAC = (todolistId: string, TaskTitle: string) => {
    return ({
        type: "ADD-TASK",
        payload: {
            todolistId,
            TaskTitle
        }
    }) as const
}
export const removeTaskAC = (todolistId: string, taskId: string) => {
    return ({
        type: "REMOVE-TASK",
        payload: {
            todolistId,
            taskId
        }
    }) as const
}
export const changeTaskTitleAC = (todolistId: string, taskId: string, newTaskTitle: string) => {
    return ({
        type: "CHANGE-TASK-TITLE",
        payload: {
            todolistId,
            taskId,
            newTaskTitle
        }
    }) as const
}
export const changeTaskStatusAC = (todolistId: string, taskId: string, newTaskStatus: boolean) => {
    return ({
        type: "CHANGE-TASK-STATUS",
        payload: {
            todolistId,
            taskId,
            newTaskStatus
        }
    }) as const
}
