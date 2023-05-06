import {AddTodolistAT, RemoveTodolistAT, SetTodolistsAT,} from "../todolists/todolists-reducer";
import {tasksAPI, TaskStatus, TaskType, UpdateTaskModelType} from "../../api/todolistAPI";
import {Dispatch} from "redux";
import {AppStateType} from "../store/store";

export type TasksType = {
    [key: string]: Array<TaskType>
}
export type AddTaskAT = ReturnType<typeof addTaskAC>
export type RemoveTaskAT = ReturnType<typeof removeTaskAC>
export type ChangeTaskTitleAT = ReturnType<typeof changeTaskTitleAC>
export type ChangeTaskStatusAT = ReturnType<typeof changeTaskStatusAC>
export type SetTasksAT = ReturnType<typeof setTasksAC>

export type ActionsType = AddTodolistAT
    | RemoveTodolistAT
    | AddTaskAT
    | RemoveTaskAT
    | ChangeTaskTitleAT
    | ChangeTaskStatusAT
    | SetTodolistsAT
    | SetTasksAT

const initialState: TasksType = {}

export const tasksReducer = (state: TasksType = initialState, action: ActionsType): TasksType => {
    switch (action.type) {
        case "SET-TODOLISTS":
            const copyState = {...state}
            action.payload.todolists.forEach((list) => {
                copyState[list.id] = []
            })
            return copyState
        case "ADD-TODOLIST":
            return {...state, [action.payload.newTodolist.id]: []}
        case "REMOVE-TODOLIST":
            const stateCopy = {...state}
            delete stateCopy[action.payload.todolistId]
            return stateCopy
        case "SET-TASKS":
            return {...state, [action.payload.todolistId]: action.payload.tasks}
        case "ADD-TASK":

            return {...state, [action.payload.todolistId]: [action.payload.task, ...state[action.payload.todolistId]]}
        case "REMOVE-TASK":
            return {
                ...state, [action.payload.todolistId]:
                    state[action.payload.todolistId].filter(task => task.id !== action.payload.taskId)
            }
        case "CHANGE-TASK-TITLE":
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(task => task.id === action.payload.taskId ? {
                    ...task,
                    title: action.payload.newTaskTitle
                } : task)
            }
        case "CHANGE-TASK-STATUS":
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(task => task.id === action.payload.taskId ? {
                    ...task,
                    status: action.payload.newTaskStatus
                } : task)
            }
        default:
            return state
    }
}

export const setTasksAC = (todolistId: string, tasks: Array<TaskType>) => {
    return {
        type: 'SET-TASKS',
        payload: {
            todolistId,
            tasks
        }
    } as const
}
export const addTaskAC = (todolistId: string, task: TaskType) => {
    return ({
        type: "ADD-TASK",
        payload: {
            todolistId,
            task
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
export const changeTaskStatusAC = (todolistId: string, taskId: string, newTaskStatus: TaskStatus) => {
    return ({
        type: "CHANGE-TASK-STATUS",
        payload: {
            todolistId,
            taskId,
            newTaskStatus
        }
    }) as const
}


export const getTasksTC = (todolistId: string) => (dispatch: Dispatch) => {
    tasksAPI.getTasks(todolistId)
        .then(res => {
            dispatch(setTasksAC(todolistId, res.data.items))
        })
}
export const addTaskTC = (todolistId: string, taskTitle: string) => (dispatch: Dispatch) => {
    tasksAPI.addTask(todolistId, taskTitle)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(addTaskAC(todolistId, res.data.data.item))
            }
        })
}
export const deleteTaskTC = (todolistId: string, taskId: string) => (dispatch: Dispatch) => {
    tasksAPI.deleteTask(todolistId, taskId)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(removeTaskAC(todolistId, taskId))
            }
        })
}
export const updateTaskStatusTC = (todolistId: string, taskId: string, newStatus: TaskStatus) => (dispatch: Dispatch, getState: () => AppStateType) => {

    const task = getState().tasks[todolistId].find(task => task.id === taskId)
    if (task) {
        const taskModel: UpdateTaskModelType = {
            title: task.title,
            status: newStatus,
            description: task.description,
            priority: task.priority,
            startDate: task.startDate,
            deadline: task.deadline
        }

        tasksAPI.updateTask(todolistId, taskId, taskModel)
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(changeTaskStatusAC(todolistId, taskId, newStatus))
                }
            })
    }
}

export const updateTaskTitleTC = (todolistId: string, taskId: string, newTitle: string) => (dispatch: Dispatch, getState: () => AppStateType) => {

    const task = getState().tasks[todolistId].find(task => task.id === taskId)
    if (task) {
        const taskModel: UpdateTaskModelType = {
            title: newTitle,
            status: task.status,
            description: task.description,
            priority: task.priority,
            startDate: task.startDate,
            deadline: task.deadline
        }

        tasksAPI.updateTask(todolistId, taskId, taskModel)
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(changeTaskTitleAC(todolistId, taskId, newTitle))
                }
            })
    }
}
