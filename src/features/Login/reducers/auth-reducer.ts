import { Dispatch } from "redux";
import { authAPI, FormDataType, ResultCode } from "../../../api/todolistAPI";
import { AxiosError } from "axios";
import { handlerAppNetworkError, handlerAppServerError } from "../../../utils/error-utils";
import { setAppStatus, setIsInitialized } from "../../../app/app-reducer";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ClearTasksAndTodolists } from "../../../common/actions/common-actions";
import { createAppAsyncThunk } from "../../../common/utils/createAppAsyncThunk";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
  },
  reducers: {
    setIsLoggedIn(state, action: PayloadAction<{ isLoggedIn: boolean }>) {
      state.isLoggedIn = action.payload.isLoggedIn;
    },
  },
});

export const authReducer = authSlice.reducer;
export const { setIsLoggedIn } = authSlice.actions;

// thunks
export const initializeAppTC = createAppAsyncThunk("auth/me", async (arg, thunkAPI) => {
  const { dispatch } = thunkAPI;
  try {
    const res = await authAPI.me();
    if (res.data.resultCode === ResultCode.OK) {
      dispatch(setIsLoggedIn({ isLoggedIn: true }));
      dispatch(setAppStatus({ status: "success" }));
    } else {
      handlerAppServerError(dispatch, res.data);
    }
  } catch (e) {
    handlerAppNetworkError(dispatch, e as AxiosError);
  } finally {
    dispatch(setIsInitialized({ isInitialized: true }));
  }
});
export const loginTC = createAppAsyncThunk<void, FormDataType>("auth/login", async (arg, thunkAPI) => {
  const { dispatch } = thunkAPI;
  dispatch(setAppStatus({ status: "loading" }));
  try {
    const res = await authAPI.login(arg);
    if (res.data.resultCode === ResultCode.OK) {
      dispatch(setIsLoggedIn({ isLoggedIn: true }));
      dispatch(setAppStatus({ status: "success" }));
    } else {
      handlerAppServerError(dispatch, res.data);
    }
  } catch (e) {
    handlerAppNetworkError(dispatch, e as AxiosError);
  }
});
export const logoutTC = createAppAsyncThunk("auth/logout", async (arg, thunkAPI) => {
  const { dispatch } = thunkAPI;
  dispatch(setAppStatus({ status: "loading" }));
  try {
    const res = await authAPI.logout();
    if (res.data.resultCode === ResultCode.OK) {
      dispatch(setIsLoggedIn({ isLoggedIn: false }));
      dispatch(setAppStatus({ status: "success" }));
      dispatch(ClearTasksAndTodolists());
    } else {
      handlerAppServerError(dispatch, res.data);
    }
  } catch (e) {
    handlerAppNetworkError(dispatch, e as AxiosError);
  }
});

// deprecated
export const _initializeAppTC = () => (dispatch: Dispatch) => {
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
export const _loginTC = (data: FormDataType) => (dispatch: Dispatch) => {
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
export const _logoutTC = () => (dispatch: Dispatch) => {
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
