import {Dispatch} from "redux";
import {setAppErrorAC, setAppStatusAC} from "../app/app-reducer";
import {ResponseType} from "../api/todolistAPI";
import {AxiosError} from "axios";

export const handlerAppServerError = <T>(dispatch: Dispatch, data: ResponseType<T>) => {
    dispatch(setAppStatusAC('error'))
    dispatch(setAppErrorAC(data.messages[0]))
}
export const handlerAppNetworkError = (dispatch: Dispatch, e: AxiosError) => {
    dispatch(setAppStatusAC('error'))
    dispatch(setAppErrorAC(e.message))
}