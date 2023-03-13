import {v1} from "uuid";
import {TasksType} from "../../App";
import {
    AddTaskActionCreator, ChangeTaskStatusActionCreator,
    ChangeTaskTitleActionCreator,
    RemoveTaskActionCreator,
    tasksReducer
} from "./tasks-reducer";

let TodolistId1: string
let TodolistId2: string
let startState: TasksType

beforeEach(() => {
    TodolistId1 = v1()
    TodolistId2 = v1()

    startState = ({
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
    })
})

test('should add new task to correct todolist', () => {

    const newTaskTitle = 'New Task Title'

    const action = AddTaskActionCreator(TodolistId1, newTaskTitle)

    const endState = tasksReducer(startState, action)

    expect(endState[TodolistId1].length).toBe(4)
    expect(endState[TodolistId1][0].title).toBe(newTaskTitle)
    expect(endState[TodolistId1][0].isDone).toBe(false)
})

test('should remove task from correct todolist', () => {

    const taskId = startState[TodolistId1][0].id

    const action = RemoveTaskActionCreator(TodolistId1, taskId)

    const endState = tasksReducer(startState, action)

    expect(endState[TodolistId1].length).toBe(2)
    expect(endState[TodolistId1][0].title).toBe('TypeScript')
    expect(endState[TodolistId1][0].isDone).toBe(true)
})
test('should change task title in correct todolist', () => {

    const taskId = startState[TodolistId2][2].id
    const newTaskTitle = 'Happy life'

    const action = ChangeTaskTitleActionCreator(TodolistId2, taskId, newTaskTitle)

    const endState = tasksReducer(startState, action)

    expect(endState[TodolistId2].length).toBe(3)
    expect(endState[TodolistId2][2].title).toBe('Happy life')
    expect(endState[TodolistId2][2].isDone).toBe(false)
})
test('should change task status in correct todolist', () => {

    const taskId = startState[TodolistId1][2].id
    const newTaskStatus = true

    const action = ChangeTaskStatusActionCreator(TodolistId1, taskId, newTaskStatus)

    const endState = tasksReducer(startState, action)

    expect(endState[TodolistId1].length).toBe(3)
    expect(endState[TodolistId1][2].title).toBe('React')
    expect(endState[TodolistId1][2].isDone).toBe(newTaskStatus)
})