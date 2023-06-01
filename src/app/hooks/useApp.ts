import { useAppDispatch, useAppSelector } from "../store/store";
import { useEffect } from "react";
import {
  initializeAppTC,
  logoutTC
} from "../../features/Login/reducers/auth-reducer";

export const useApp = (demo: boolean) => {

  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector<boolean>((state) => state.auth.isLoggedIn);
  const isInitialized = useAppSelector<boolean>((state) => state.app.isInitialized);

  useEffect(() => {
    if (!demo) {
      dispatch(initializeAppTC());
    }
  }, []);

  const logout = () => dispatch(logoutTC());

  return {
    isLoggedIn, isInitialized, logout
  };
};