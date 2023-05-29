import { Dispatch } from "redux";
import { setAppError, setAppStatus } from "../app/app-reducer";
import { ResponseType } from "../api/todolistAPI";
import { AxiosError } from "axios";

export const handlerAppServerError = <T>(dispatch: Dispatch, data: ResponseType<T>) => {
  dispatch(setAppStatus({ status: "error" }));
  dispatch(setAppError({ error: data.messages[0] }));
};
export const handlerAppNetworkError = (dispatch: Dispatch, e: AxiosError) => {
  dispatch(setAppStatus({ status: "error" }));
  dispatch(setAppError({ error: e.message }));
};