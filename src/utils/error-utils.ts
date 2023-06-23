import { Dispatch } from "redux";
import { AxiosError } from "axios";
import { appActions } from "../features/App/slice/app-slice";
import { ResponseType } from "../api/types";

export const handlerAppServerError = <T>(
  dispatch: Dispatch,
  data: ResponseType<T>
) => {
  dispatch(appActions.setAppStatus({ status: "error" }));
  dispatch(appActions.setAppError({ error: data.messages[0] }));
};
export const handlerAppNetworkError = (dispatch: Dispatch, e: AxiosError) => {
  dispatch(appActions.setAppStatus({ status: "error" }));
  dispatch(appActions.setAppError({ error: e.message }));
};
