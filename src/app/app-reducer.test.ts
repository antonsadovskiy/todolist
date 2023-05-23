import {
    AppInitialStateType,
    appReducer,
    RequestType,
    setAppErrorAC,
    setAppStatusAC,
    setIsInitializedAC
} from "./app-reducer";

let startState: AppInitialStateType

beforeEach(() => {
    startState = {
        status: 'idle',
        error: null,
        isInitialized: false
    }
})

test('should change error value', () => {
    const newError = 'something went wrong'

    const action = setAppErrorAC(newError)
    const endState = appReducer(startState, action)

    expect(endState.status).toBe('idle')
    expect(endState.error).toBe(newError)
})

test('should change status value', () => {
    const newStatus: RequestType = 'loading'

    const action = setAppStatusAC(newStatus)
    const endState = appReducer(startState, action)

    expect(endState.status).toBe('loading')
    expect(endState.error).toBe(null)
})

test('should change isInitialized value', () => {
    const newIsInitialized = true

    const action = setIsInitializedAC(newIsInitialized)
    const endState = appReducer(startState, action)

    expect(endState.status).toBe('idle')
    expect(endState.error).toBe(null)
    expect(endState.isInitialized).toBeTruthy()
})