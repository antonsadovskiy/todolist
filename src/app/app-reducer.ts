import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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

export const appSlice = createSlice({
  name: "app",
  initialState: initialState,
  reducers: {
    setIsInitialized(state, action: PayloadAction<{ isInitialized: boolean }>) {
      state.isInitialized = action.payload.isInitialized;
    },
    setAppStatus(state, action: PayloadAction<{ status: RequestType }>) {
      state.status = action.payload.status;
    },
    setAppError(state, action: PayloadAction<{ error: string | null }>) {
      state.error = action.payload.error;
    },
  },
});

export const appReducer = appSlice.reducer;
export const { setIsInitialized, setAppStatus, setAppError } = appSlice.actions;