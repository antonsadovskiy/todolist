import {v1} from "uuid";
import {
    addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC,
    tasksReducer, TasksType
} from "./tasks-reducer";
import {addTodolistAC, removeTodolistAC, TodoListDomainType} from "../todolists/todolists-reducer";
import {TaskPriority, TaskStatus, TaskType} from "../../api/todolistAPI";

let TodolistId1: string
let TodolistId2: string
let startState: TasksType

beforeEach(() => {
    TodolistId1 = v1()
    TodolistId2 = v1()

    startState = {
        [TodolistId1]: [
            {
                id: v1(), title: 'Angular', status: TaskStatus.New, description: '',
                addedDate: '', deadline: '', order: 0, priority: TaskPriority.Low, startDate: '',
                todoListId: TodolistId1
            },
            {
                id: v1(), title: 'TypeScript', status: TaskStatus.Completed, description: '',
                addedDate: '', deadline: '', order: 0, priority: TaskPriority.Low, startDate: '',
                todoListId: TodolistId1
            },
            {
                id: v1(), title: 'React', status: TaskStatus.New, description: '',
                addedDate: '', deadline: '', order: 0, priority: TaskPriority.Low, startDate: '',
                todoListId: TodolistId1
            },
        ],
        [TodolistId2]: [
            {
                id: v1(), title: "Get a job", status: TaskStatus.New, description: '',
                addedDate: '', deadline: '', order: 0, priority: TaskPriority.Low, startDate: '',
                todoListId: TodolistId2
            },
            {
                id: v1(), title: "Iphone", status: TaskStatus.New, description: '',
                addedDate: '', deadline: '', order: 0, priority: TaskPriority.Low, startDate: '',
                todoListId: TodolistId2
            },
            {
                id: v1(), title: "Happy parents", status: TaskStatus.New, description: '',
                addedDate: '', deadline: '', order: 0, priority: TaskPriority.Low, startDate: '',
                todoListId: TodolistId2
            },
        ]
    }
})

test('should add new task to correct todolist', () => {

    const newTask: TaskType = {
        id: v1(),
        title: 'new task title',
        status: TaskStatus.New,
        todoListId: '1',
        order: 0,
        startDate: '',
        deadline: '',
        addedDate: '',
        priority: TaskPriority.Later,
        description: ''
    }

    const action = addTaskAC(TodolistId1, newTask)
    const endState = tasksReducer(startState, action)

    expect(endState[TodolistId1].length).toBe(4)
    expect(endState[TodolistId1][0].title).toBe('new task title')
    expect(endState[TodolistId1][0].status).toBe(TaskStatus.New)
})

test('should remove task from correct todolist', () => {

    const taskId = startState[TodolistId1][0].id

    const action = removeTaskAC(TodolistId1, taskId)
    const endState = tasksReducer(startState, action)

    expect(endState[TodolistId1].length).toBe(2)
    expect(endState[TodolistId1][0].title).toBe('TypeScript')
    expect(endState[TodolistId1][0].status).toBe(TaskStatus.Completed)
})
test('should change task title in correct todolist', () => {

    const taskId = startState[TodolistId2][2].id
    const newTaskTitle = 'Happy life'

    const action = changeTaskTitleAC(TodolistId2, taskId, newTaskTitle)
    const endState = tasksReducer(startState, action)

    expect(endState[TodolistId2].length).toBe(3)
    expect(endState[TodolistId2][2].title).toBe('Happy life')
    expect(endState[TodolistId2][2].status).toBe(TaskStatus.New)
})
test('should change task status in correct todolist', () => {

    const taskId = startState[TodolistId1][2].id
    const newTaskStatus = TaskStatus.Completed

    const action = changeTaskStatusAC(TodolistId1, taskId, newTaskStatus)
    const endState = tasksReducer(startState, action)

    expect(endState[TodolistId1].length).toBe(3)
    expect(endState[TodolistId1][2].title).toBe('React')
    expect(endState[TodolistId1][2].status).toBe(newTaskStatus)
})

test('new property with new array should be added when new todolist is added', () => {

    const newTodolist: TodoListDomainType = {
        id: '1',
        title: 'new todolist',
        order: 0,
        addedDate: '',
        filter: 'all'
    }

    const action = addTodolistAC(newTodolist)
    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState)
    const newKey = keys.find(k => k !== TodolistId1 && k !== TodolistId2)
    if (!newKey) {
        throw Error('new key should be added')
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
})

test('array of tasks should be deleted from correct todolist', () => {

    const action = removeTodolistAC(TodolistId1)
    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState[TodolistId1]).not.toBeDefined()
})