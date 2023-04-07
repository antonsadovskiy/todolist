import {v1} from "uuid";
import {
    AddTodolistAT, RemoveTodolistAT,
    TodolistId1,
} from "../todolists/todolists-reducer";
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type TasksType = {
    [key: string]: Array<TaskType>
}
export type AddTaskAT = ReturnType<typeof addTaskAC>
export type RemoveTaskAT = ReturnType<typeof removeTaskAC>
export type ChangeTaskTitleAT = ReturnType<typeof changeTaskTitleAC>
export type ChangeTaskStatusAT = ReturnType<typeof changeTaskStatusAC>

export type ActionsType = AddTodolistAT | RemoveTodolistAT |
    AddTaskAT | RemoveTaskAT |
    ChangeTaskTitleAT | ChangeTaskStatusAT

const initialState: TasksType = {
    [TodolistId1]: [
        {id: v1(), title: "Redux", isDone: false},
        {id: v1(), title: "TypeScript", isDone: true},
        {id: v1(), title: "React", isDone: false},
    ],
}

export const tasksReducer = (state: TasksType = initialState, action: ActionsType): TasksType => {
    switch (action.type) {
        case "ADD-TODOLIST":
            return {...state, [action.payload.todolistId]: []}
        case "REMOVE-TODOLIST":
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
            return state
    }
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