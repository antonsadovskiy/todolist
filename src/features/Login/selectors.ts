import { AppStateType } from "../../app/store/store";

export const selectorIsLoggedIn = (state: AppStateType) =>
  state.auth.isLoggedIn;
