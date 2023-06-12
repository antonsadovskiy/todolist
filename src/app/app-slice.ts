import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { authThunks } from "../features/Login/reducers/auth-slice";

export type RequestType = "idle" | "loading" | "error" | "success";

type AppInitialStateType = {
  isInitialized: boolean;
  status: RequestType;
  error: null | string;
};

const initialState: AppInitialStateType = {
  isInitialized: false,
  status: "idle",
  error: null,
};

export const slice = createSlice({
  name: "app",
  initialState: initialState,
  reducers: {
    setAppStatus(state, action: PayloadAction<{ status: RequestType }>) {
      state.status = action.payload.status;
    },
    setAppError(state, action: PayloadAction<{ error: string | null }>) {
      state.error = action.payload.error;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(authThunks.me.fulfilled, (state) => {
      state.isInitialized = true;
    });
  },
});

export const appReducer = slice.reducer;
export const appActions = slice.actions;
