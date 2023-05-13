export type RequestType = 'idle' | 'loading' | 'error' | 'success'

type SetStatusAT = ReturnType<typeof setStatusAC>
type SetErrorAT = ReturnType<typeof setErrorAC>
type ActionsType = SetStatusAT | SetErrorAT

export const initialState = {
    status: null as null | RequestType,
    error: '' as null | string
}
type initialStateType = typeof initialState


export const appReducer = (state: initialStateType = initialState, action: ActionsType): initialStateType => {
    switch (action.type) {
        case "SET-STATUS" :
            return {...state, status: action.payload.newStatus}
        case "SET-ERROR":
            return {...state, error: action.payload.error}
        default:
            return state
    }
}

export const setStatusAC = (newStatus: RequestType) => {
    return {
        type: 'SET-STATUS',
        payload: {
            newStatus
        }
    } as const
}
export const setErrorAC = (error: string | null) => {
    return {
        type: 'SET-ERROR',
        payload: {
            error
        }
    } as const
}