import { AxiosError } from "axios";
import {
  handlerAppNetworkError,
  handlerAppServerError,
} from "../../../utils/error-utils";
import { appActions } from "../../App/slice/app-slice";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ClearTasksAndTodolists } from "../../../common/actions/common-actions";
import { createAppAsyncThunk } from "../../../common/utils";
import { authAPI } from "../../../api/authAPI";
import { ResultCode, FormDataType } from "../../../api/types";

const slice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
  },
  reducers: {
    setIsLoggedIn(state, action: PayloadAction<{ isLoggedIn: boolean }>) {
      state.isLoggedIn = action.payload.isLoggedIn;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state) => {
        state.isLoggedIn = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoggedIn = false;
      });
  },
});

// thunks
const me = createAppAsyncThunk("auth/me", async (arg, { dispatch }) => {
  try {
    const res = await authAPI.me();
    if (res.data.resultCode === ResultCode.OK) {
      dispatch(appActions.setAppStatus({ status: "success" }));
      dispatch(authActions.setIsLoggedIn({ isLoggedIn: true }));
    } else {
      handlerAppServerError(dispatch, res.data);
    }
  } catch (e) {
    handlerAppNetworkError(dispatch, e as AxiosError);
  }
});

const login = createAppAsyncThunk<void, FormDataType>(
  "auth/login",
  async (arg, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI;
    dispatch(appActions.setAppStatus({ status: "loading" }));
    try {
      const res = await authAPI.login(arg);
      if (res.data.resultCode === ResultCode.OK) {
        dispatch(appActions.setAppStatus({ status: "success" }));
      } else {
        handlerAppServerError(dispatch, res.data);
        return rejectWithValue(null);
      }
    } catch (e) {
      handlerAppNetworkError(dispatch, e as AxiosError);
      return rejectWithValue(null);
    }
  }
);

const logout = createAppAsyncThunk("auth/logout", async (arg, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI;
  dispatch(appActions.setAppStatus({ status: "loading" }));
  try {
    const res = await authAPI.logout();
    if (res.data.resultCode === ResultCode.OK) {
      dispatch(appActions.setAppStatus({ status: "success" }));
      dispatch(ClearTasksAndTodolists());
    } else {
      handlerAppServerError(dispatch, res.data);
      return rejectWithValue(null);
    }
  } catch (e) {
    handlerAppNetworkError(dispatch, e as AxiosError);
    return rejectWithValue(null);
  }
});

export const authReducer = slice.reducer;
export const authActions = slice.actions;
export const authThunks = { login, logout, me };
