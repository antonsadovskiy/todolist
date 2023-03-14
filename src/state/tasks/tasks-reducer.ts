import {v1} from "uuid";
import {TasksType, TaskType} from "../../App";

export type AddTaskActionType = ReturnType<typeof addTaskActionCreator>
export type RemoveTaskActionType = ReturnType<typeof removeTaskActionCreator>
export type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitleActionCreator>
export type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatusActionCreator>

export type ActionsType = AddTaskActionType | RemoveTaskActionType | ChangeTaskTitleActionType | ChangeTaskStatusActionType

export const tasksReducer = (state: TasksType, action: ActionsType) => {
    switch (action.type) {
        case "ADD-TASK":
            const newTask: TaskType = {
                id: v1(),
                title: action.payload.TaskTitle,
                isDone: false
            }
            return {...state, [action.payload.todolistId]: [newTask, ...state[action.payload.todolistId]]}
        case "REMOVE-TASK":
            return {...state, [action.payload.todolistId]: state[action.payload.todolistId].filter(task => task.id !== action.payload.taskId)}
        case "CHANGE-TASK-TITLE":
            return {...state, [action.payload.todolistId]: state[action.payload.todolistId].map(task => task.id === action.payload.taskId ? {...task, title: action.payload.newTaskTitle} : task)}
        case "CHANGE-TASK-STATUS":
            return {...state, [action.payload.todolistId]: state[action.payload.todolistId].map(task => task.id === action.payload.taskId ? {...task, isDone: action.payload.newTaskStatus} : task)}
        default:
            throw new Error('I don\'t understand this action type')
    }
}

export const addTaskActionCreator = (todolistId: string, TaskTitle: string) => {
    return ({
        type: "ADD-TASK",
        payload: {
            todolistId,
            TaskTitle
        }
    }) as const
}
export const removeTaskActionCreator = (todolistId: string, taskId: string) => {
    return ({
        type: "REMOVE-TASK",
        payload: {
            todolistId,
            taskId
        }
    }) as const
}
export const changeTaskTitleActionCreator = (todolistId: string, taskId: string, newTaskTitle: string) => {
    return ({
        type: "CHANGE-TASK-TITLE",
        payload: {
            todolistId,
            taskId,
            newTaskTitle
        }
    }) as const
}
export const changeTaskStatusActionCreator = (todolistId: string, taskId: string, newTaskStatus: boolean) => {
    return ({
        type: "CHANGE-TASK-STATUS",
        payload: {
            todolistId,
            taskId,
            newTaskStatus
        }
    }) as const
}