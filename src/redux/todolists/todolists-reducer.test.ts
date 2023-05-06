import {
    addTodolistAC, changeTodolistFilterAC, changeTodolistTitleAC, FilterType, removeTodolistAC,
    todolistsReducer, TodoListDomainType
} from "./todolists-reducer";
import {v1} from "uuid";

let startState: Array<TodoListDomainType>
let TodolistId1: string
let TodolistId2: string

beforeEach(() => {
    TodolistId1 = v1()
    TodolistId2 = v1()
    startState = [
        {id: TodolistId1, title: "What to learn", filter: 'active', addedDate: '', order: 0},
        {id: TodolistId2, title: "Travel to Poland", filter: 'completed', addedDate: '', order: 0},
    ]
})

test('new todolist should be added', () => {

    const newTodolist: TodoListDomainType = {
        id: '1',
        title: 'new todolist',
        order: 0,
        addedDate: '',
        filter: 'all'
    }
    const action = addTodolistAC(newTodolist)
    const endState = todolistsReducer(startState, action)

    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe('new todolist')
    expect(endState[0].filter).toBe('all')
})

test('correct todolist should be removed', () => {

    const action = removeTodolistAC(TodolistId1)
    const endState = todolistsReducer(startState, action)

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(TodolistId2)
    expect(endState[0].title).toBe('Travel to Poland')
    expect(endState[0].filter).toBe('completed')
})

test('should change todolist title', () => {

    const newTitle = 'Hello'

    const action = changeTodolistTitleAC(TodolistId1, newTitle)
    const endState = todolistsReducer(startState, action)

    expect(endState[0].id).toBe(TodolistId1)
    expect(endState[0].title).toBe('Hello')
    expect(endState[0].filter).toBe('active')
})

test('should change todolist filter value', () => {

    const newFilter: FilterType = 'completed'

    const action = changeTodolistFilterAC(TodolistId1, newFilter)
    const endState = todolistsReducer(startState, action)

    expect(endState.length).toBe(2)
    expect(endState[0].id).toBe(TodolistId1)
    expect(endState[0].title).toBe('What to learn')
    expect(endState[0].filter).toBe(newFilter)
})