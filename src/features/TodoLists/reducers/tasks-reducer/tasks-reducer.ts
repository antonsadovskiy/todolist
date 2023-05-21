import {AddTodolistAT, RemoveTodolistAT, SetTodolistsAT,} from "../todolist-reducer/todolists-reducer";
import {
    ResultCode,
    TaskDomainType,
    TaskPriority,
    tasksAPI,
    TaskStatus,
    TaskType,
    UpdateTaskModelType
} from "../../../../api/todolistAPI";
import {Dispatch} from "redux";
import {AppStateType} from "../../../../app/store/store";
import {RequestType, setAppStatusAC} from "../../../../app/app-reducer";
import {AxiosError} from "axios";
import {handlerAppNetworkError, handlerAppServerError} from "../../../../utils/error-utils";

export type TasksType = {
    [key: string]: Array<TaskDomainType>
}
type AddTaskAT = ReturnType<typeof addTaskAC>
type RemoveTaskAT = ReturnType<typeof removeTaskAC>
type UpdateTaskAT = ReturnType<typeof updateTaskAC>
type SetTaskStatusAT = ReturnType<typeof setTaskStatusAC>
type SetTasksAT = ReturnType<typeof setTasksAC>

export type ActionsType =
    | AddTodolistAT
    | RemoveTodolistAT
    | AddTaskAT
    | RemoveTaskAT
    | UpdateTaskAT
    | SetTaskStatusAT
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
            return {
                ...state,
                [action.payload.todolistId]: action.payload.tasks.map(t => ({...t, entityStatus: 'idle'}))
            }
        case "ADD-TASK":
            return {
                ...state,
                [action.payload.todolistId]: [{
                    ...action.payload.task,
                    entityStatus: 'idle'
                }, ...state[action.payload.todolistId]]
            }
        case "REMOVE-TASK":
            return {
                ...state, [action.payload.todolistId]:
                    state[action.payload.todolistId].filter(task => task.id !== action.payload.taskId)
            }
        case "UPDATE-TASK":
            return {
                ...state,
                [action.payload.todolistId]:
                    state[action.payload.todolistId].map(task => task.id === action.payload.taskId
                        ? {...task, ...action.payload.model}
                        : task
                    )
            }
        case "SET-TASK-STATUS":
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(task => task.id === action.payload.taskId ? {
                    ...task,
                    entityStatus: action.payload.newStatus
                } : task)
            }
        default:
            return state
    }
}


// actions
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
    return {
        type: "ADD-TASK",
        payload: {
            todolistId,
            task
        }
    } as const
}
export const removeTaskAC = (todolistId: string, taskId: string) => {
    return {
        type: "REMOVE-TASK",
        payload: {
            todolistId,
            taskId
        }
    } as const
}
export const updateTaskAC = (todolistId: string, taskId: string, model: UpdateDomainTaskModelType) => {
    return {
        type: "UPDATE-TASK",
        payload: {
            todolistId,
            taskId,
            model
        }
    } as const
}
export const setTaskStatusAC = (todolistId: string, taskId: string, newStatus: RequestType) => {
    return {
        type: 'SET-TASK-STATUS',
        payload: {
            todolistId,
            taskId,
            newStatus
        }
    } as const
}

// thunks
export const getTasksTC = (todolistId: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    tasksAPI.getTasks(todolistId)
        .then(res => {
            dispatch(setAppStatusAC('success'))
            dispatch(setTasksAC(todolistId, res.data.items))
        })
}
export const addTaskTC = (todolistId: string, taskTitle: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    tasksAPI.addTask(todolistId, taskTitle)
        .then(res => {
            if (res.data.resultCode === ResultCode.OK) {
                dispatch(setAppStatusAC('success'))
                dispatch(addTaskAC(todolistId, res.data.data.item))
            } else {
                handlerAppServerError(dispatch, res.data)
            }
        })
        .catch((e: AxiosError) => {
            handlerAppNetworkError(dispatch, e)
        })
}
export const deleteTaskTC = (todolistId: string, taskId: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    dispatch(setTaskStatusAC(todolistId, taskId, 'loading'))
    tasksAPI.deleteTask(todolistId, taskId)
        .then(res => {
            if (res.data.resultCode === ResultCode.OK) {
                dispatch(setAppStatusAC('success'))
                dispatch(setTaskStatusAC(todolistId, taskId, 'success'))
                dispatch(removeTaskAC(todolistId, taskId))
            }
        })
        .catch((e: AxiosError) => {
            dispatch(setTaskStatusAC(todolistId, taskId, 'error'))
            handlerAppNetworkError(dispatch, e)
        })
}
export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatus
    priority?: TaskPriority
    startDate?: string
    deadline?: string
}
export const updateTaskTC = (todolistId: string, taskId: string, model: UpdateDomainTaskModelType) =>
    (dispatch: Dispatch, getState: () => AppStateType) => {
        dispatch(setAppStatusAC('loading'))
        const task = getState().tasks[todolistId].find(task => task.id === taskId)
        if (task) {
            const taskModel: UpdateTaskModelType = {
                title: task.title,
                status: task.status,
                description: task.description,
                priority: task.priority,
                startDate: task.startDate,
                deadline: task.deadline,
                ...model
            }
            tasksAPI.updateTask(todolistId, taskId, taskModel)
                .then(res => {
                    if (res.data.resultCode === ResultCode.OK) {
                        dispatch(setAppStatusAC('success'))
                        dispatch(updateTaskAC(todolistId, taskId, taskModel))
                    } else {
                        handlerAppServerError(dispatch, res.data)
                    }
                })
                .catch((e: AxiosError) => {
                    handlerAppNetworkError(dispatch, e)
                })
        }
    }