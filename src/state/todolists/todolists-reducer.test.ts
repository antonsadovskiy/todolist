import {FilterType, TodoListType} from "../../App";
import {
    addTodolistActionCreator, changeTodolistFilterActionCreator,
    changeTodolistTitleActionCreator,
    removeTodolistActionCreator,
    todolistsReducer
} from "./todolists-reducer";
import {v1} from "uuid";

test('new todolist should be added', () => {
    const TodolistId1 = v1()
    const TodolistId2 = v1()

    const startState: Array<TodoListType> = [
        {id: TodolistId1, title: "What to learn", filter: 'active'},
        {id: TodolistId2, title: "Travel to Poland", filter: 'completed'},
    ]

    const newTodolistTitle = 'New Todolist'

    const action = addTodolistActionCreator(newTodolistTitle)

    const endState = todolistsReducer(startState, action)

    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe('New Todolist')
    expect(endState[0].filter).toBe('all')
})

test('correct todolist should be removed', () => {
    const TodolistId1 = v1()
    const TodolistId2 = v1()

    const startState: Array<TodoListType> = [
        {id: TodolistId1, title: "What to learn", filter: 'active'},
        {id: TodolistId2, title: "Travel to Poland", filter: 'completed'},
    ]

    const action = removeTodolistActionCreator(TodolistId1)
    const endState = todolistsReducer(startState, action)

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(TodolistId2)
    expect(endState[0].title).toBe('Travel to Poland')
    expect(endState[0].filter).toBe('completed')
})

test('should change todolist title', () => {
    const TodolistId1 = v1()
    const TodolistId2 = v1()

    const startState: Array<TodoListType> = [
        {id: TodolistId1, title: "What to learn", filter: 'active'},
        {id: TodolistId2, title: "Travel to Poland", filter: 'completed'},
    ]

    const newTitle = 'Hello'

    const action = changeTodolistTitleActionCreator(TodolistId1, newTitle)
    const endState = todolistsReducer(startState, action)

    expect(endState[0].id).toBe(TodolistId1)
    expect(endState[0].title).toBe('Hello')
    expect(endState[0].filter).toBe('active')
})

test('should change todolist filter value', () => {
    const TodolistId1 = v1()
    const TodolistId2 = v1()

    const startState: Array<TodoListType> = [
        {id: TodolistId1, title: "What to learn", filter: 'active'},
        {id: TodolistId2, title: "Travel to Poland", filter: 'completed'},
    ]

    const newFilter: FilterType = 'completed'

    const action = changeTodolistFilterActionCreator(TodolistId1, newFilter)
    const endState = todolistsReducer(startState, action)

    expect(endState.length).toBe(2)
    expect(endState[0].id).toBe(TodolistId1)
    expect(endState[0].title).toBe('What to learn')
    expect(endState[0].filter).toBe(newFilter)
})