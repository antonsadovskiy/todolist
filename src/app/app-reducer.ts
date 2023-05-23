export type RequestType = 'idle' | 'loading' | 'error' | 'success'

type SetIsInitializedAT = ReturnType<typeof setIsInitializedAC>
type SetAppStatusAT = ReturnType<typeof setAppStatusAC>
type SetAppErrorAT = ReturnType<typeof setAppErrorAC>
type ActionsType = SetIsInitializedAT | SetAppStatusAT | SetAppErrorAT

export type AppInitialStateType = {
    isInitialized: boolean
    status: RequestType
    error: string | null
}

const initialState: AppInitialStateType = {
    isInitialized: false,
    status: 'idle',
    error: null,
}


export const appReducer = (state: AppInitialStateType = initialState, action: ActionsType): AppInitialStateType => {
    switch (action.type) {
        case "APP/SET-INITIALIZED":
            return {...state, isInitialized: action.payload.isInitialized}
        case "APP/SET-STATUS" :
            return {...state, status: action.payload.newStatus}
        case "APP/SET-ERROR":
            return {...state, error: action.payload.error}
        default:
            return state
    }
}

export const setIsInitializedAC = (isInitialized: boolean) => {
    return {
        type: 'APP/SET-INITIALIZED',
        payload: {
            isInitialized
        }
    } as const
}
export const setAppStatusAC = (newStatus: RequestType) => {
    return {
        type: 'APP/SET-STATUS',
        payload: {
            newStatus
        }
    } as const
}
export const setAppErrorAC = (error: string | null) => {
    return {
        type: 'APP/SET-ERROR',
        payload: {
            error
        }
    } as const
}