import {userReducer} from "./user-reducer";

test('user reducer should change name of user', () => {
    const startState = {name: 'Anton', age: 20, childrenCount: 2}

    const endState = userReducer(startState, {type: 'INCREMENT-AGE'})

    expect(endState.age).toBe(21)
    expect(endState.childrenCount).toBe(2)
})

test('user reducer should increment only childrenCount', () => {
    const startState = {name: 'Anton', age: 20, childrenCount: 2}

    const endState = userReducer(startState, {type: 'INCREMENT-CHILDREN-COUNT'})

    expect(endState.age).toBe(20)
    expect(endState.childrenCount).toBe(3)
})

test('user reducer should change user name', () => {
    const startState = {name: 'Anton', age: 20, childrenCount: 2}

    const newName = 'Sasha'
    const endState = userReducer(startState, {type: 'CHANGE-NAME', newName: newName})

    expect(endState.age).toBe(20)
    expect(endState.childrenCount).toBe(2)
    expect(endState.name).toBe(newName)
})