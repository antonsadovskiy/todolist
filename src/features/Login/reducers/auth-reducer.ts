import { Dispatch } from "redux";
import { authAPI, FormDataType, ResultCode } from "../../../api/todolistAPI";
import { AxiosError } from "axios";
import { handlerAppNetworkError, handlerAppServerError } from "../../../utils/error-utils";
import { setAppStatus, setIsInitialized } from "../../../app/app-reducer";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ClearTasksAndTodolists } from "../../../common/actions/common-actions";

const initialState = {
  isLoggedIn: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setIsLoggedIn(state, action: PayloadAction<{ isLoggedIn: boolean }>) {
      state.isLoggedIn = action.payload.isLoggedIn;
    },
  },
});

export const authReducer = authSlice.reducer;
export const { setIsLoggedIn } = authSlice.actions;

// thunks
export const initializeAppTC = () => (dispatch: Dispatch) => {
  dispatch(setAppStatus({ status: "loading" }));
  authAPI
    .me()
    .then((res) => {
      if (res.data.resultCode === ResultCode.OK) {
        dispatch(setIsLoggedIn({ isLoggedIn: true }));
        dispatch(setAppStatus({ status: "success" }));
      } else {
        handlerAppServerError(dispatch, res.data);
      }
    })
    .catch((e: AxiosError) => {
      handlerAppNetworkError(dispatch, e);
    })
    .finally(() => {
      dispatch(setIsInitialized({ isInitialized: true }));
    });
};
export const loginTC = (data: FormDataType) => (dispatch: Dispatch) => {
  dispatch(setAppStatus({ status: "loading" }));

  authAPI
    .login(data)
    .then((res) => {
      if (res.data.resultCode === ResultCode.OK) {
        dispatch(setIsLoggedIn({ isLoggedIn: true }));
        dispatch(setAppStatus({ status: "success" }));
      } else {
        handlerAppServerError(dispatch, res.data);
      }
    })
    .catch((e: AxiosError) => {
      handlerAppNetworkError(dispatch, e);
    });
};
export const logoutTC = () => (dispatch: Dispatch) => {
  dispatch(setAppStatus({ status: "loading" }));
  authAPI
    .logout()
    .then((res) => {
      if (res.data.resultCode === ResultCode.OK) {
        dispatch(setIsLoggedIn({ isLoggedIn: false }));
        dispatch(setAppStatus({ status: "success" }));
        dispatch(ClearTasksAndTodolists());
      } else {
        handlerAppServerError(dispatch, res.data);
      }
    })
    .catch((e: AxiosError) => {
      handlerAppNetworkError(dispatch, e);
    });
};
