import {v1} from "uuid";
import {
    addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC,
    tasksReducer, TasksType
} from "./tasks-reducer";
import {addTodolistAC, removeTodolistAC} from "../todolists/todolists-reducer";

let TodolistId1: string
let TodolistId2: string
let startState: TasksType

beforeEach(() => {
    TodolistId1 = v1()
    TodolistId2 = v1()

    startState = {
        [TodolistId1]: [
            {id: v1(), title: "Redux", isDone: false},
            {id: v1(), title: "TypeScript", isDone: true},
            {id: v1(), title: "React", isDone: false},
        ],
        [TodolistId2]: [
            {id: v1(), title: "Get a job", isDone: false},
            {id: v1(), title: "Iphone", isDone: false},
            {id: v1(), title: "Happy parents", isDone: false},
        ]
    }
})

test('should add new task to correct todolist', () => {

    const newTaskTitle = 'New Task Title'

    const action = addTaskAC(TodolistId1, newTaskTitle)
    const endState = tasksReducer(startState, action)

    expect(endState[TodolistId1].length).toBe(4)
    expect(endState[TodolistId1][0].title).toBe(newTaskTitle)
    expect(endState[TodolistId1][0].isDone).toBe(false)
})

test('should remove task from correct todolist', () => {

    const taskId = startState[TodolistId1][0].id

    const action = removeTaskAC(TodolistId1, taskId)
    const endState = tasksReducer(startState, action)

    expect(endState[TodolistId1].length).toBe(2)
    expect(endState[TodolistId1][0].title).toBe('TypeScript')
    expect(endState[TodolistId1][0].isDone).toBe(true)
})
test('should change task title in correct todolist', () => {

    const taskId = startState[TodolistId2][2].id
    const newTaskTitle = 'Happy life'

    const action = changeTaskTitleAC(TodolistId2, taskId, newTaskTitle)
    const endState = tasksReducer(startState, action)

    expect(endState[TodolistId2].length).toBe(3)
    expect(endState[TodolistId2][2].title).toBe('Happy life')
    expect(endState[TodolistId2][2].isDone).toBe(false)
})
test('should change task status in correct todolist', () => {

    const taskId = startState[TodolistId1][2].id
    const newTaskStatus = true

    const action = changeTaskStatusAC(TodolistId1, taskId, newTaskStatus)
    const endState = tasksReducer(startState, action)

    expect(endState[TodolistId1].length).toBe(3)
    expect(endState[TodolistId1][2].title).toBe('React')
    expect(endState[TodolistId1][2].isDone).toBe(newTaskStatus)
})

test('new property with new array should be added when new todolist is added', () => {

    const newTodolistId = v1()

    const action = addTodolistAC(newTodolistId)
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