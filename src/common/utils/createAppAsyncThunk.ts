import { createAsyncThunk } from "@reduxjs/toolkit";
import { AppDispatchType, RootState } from "../../app/store/store";

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: RootState;
  dispatch: AppDispatchType;
  rejectedValue: unknown;
}>();
