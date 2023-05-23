import {Dispatch} from "redux";
import {authAPI, FormDataType, ResultCode} from "../../../api/todolistAPI";
import {AxiosError} from "axios";
import {handlerAppNetworkError, handlerAppServerError} from "../../../utils/error-utils";
import {setAppStatusAC, setIsInitializedAC} from "../../../app/app-reducer";

export type SetIsLoggedInAT = ReturnType<typeof setIsLoggedInAC>
type ActionsType = SetIsLoggedInAT

export type AuthInitialStateType = {
    isLoggedIn: boolean
}

const initialState: AuthInitialStateType = {
    isLoggedIn: false
}

export const authReducer = (state: AuthInitialStateType = initialState, action: ActionsType): AuthInitialStateType => {
    switch (action.type) {
        case "AUTH/SET-IS-LOGGED-IN":
            return {...state, isLoggedIn: action.payload.isLoggedIn}
        default:
            return state
    }
}

// actions
export const setIsLoggedInAC = (isLoggedIn: boolean) => {
    return {
        type: 'AUTH/SET-IS-LOGGED-IN',
        payload: {
            isLoggedIn
        }
    } as const
}

// thunks
export const initializeAppTC = () => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.me()
        .then(res => {
            if (res.data.resultCode === ResultCode.OK) {
                dispatch(setIsLoggedInAC(true))
                dispatch(setAppStatusAC('success'))
            } else {
                handlerAppServerError(dispatch, res.data)
            }
        })
        .catch((e: AxiosError) => {
            handlerAppNetworkError(dispatch, e)
        })
        .finally(() => {
            dispatch(setIsInitializedAC(true))
        })
}

export const loginTC = (data: FormDataType) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.login(data)
        .then(res => {
            if (res.data.resultCode === ResultCode.OK) {
                dispatch(setIsLoggedInAC(true))
                dispatch(setAppStatusAC('success'))
            } else {
                handlerAppServerError(dispatch, res.data);
            }
        })
        .catch((e: AxiosError) => {
            handlerAppNetworkError(dispatch, e)
        })
}

export const logoutTC = () => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.logout()
        .then(res => {
            if (res.data.resultCode === ResultCode.OK) {
                dispatch(setIsLoggedInAC(false))
                dispatch(setAppStatusAC('success'))
            } else {
                handlerAppServerError(dispatch, res.data);
            }
        })
        .catch((e: AxiosError) => {
            handlerAppNetworkError(dispatch, e)
        })
}