import { AppStateType } from "./store/store";

export const selectorIsInitialized = (state: AppStateType) =>
  state.app.isInitialized;
export const selectorError = (state: AppStateType) => state.app.error;
export const selectorStatus = (state: AppStateType) => state.app.status;
