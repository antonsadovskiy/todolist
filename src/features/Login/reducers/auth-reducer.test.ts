import {authReducer, AuthInitialStateType, setIsLoggedInAC} from "./auth-reducer";

let startState: AuthInitialStateType

beforeEach(() => {
    startState = {
        isLoggedIn: false
    }
})

test('should set isLoggedIn', () => {

    const action = setIsLoggedInAC(true)
    const endState = authReducer(startState, action)

    expect(endState.isLoggedIn).toBeTruthy()
})