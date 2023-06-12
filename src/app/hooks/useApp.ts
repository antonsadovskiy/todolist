import { useAppDispatch, useAppSelector } from "../store/store";
import { useEffect } from "react";
import { authThunks } from "../../features/Login/reducers/auth-slice";

export const useApp = (demo: boolean) => {

  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector<boolean>((state) => state.auth.isLoggedIn);
  const isInitialized = useAppSelector<boolean>((state) => state.app.isInitialized);

  useEffect(() => {
    if (!demo) {
      dispatch(authThunks.me());
    }
  }, []);

  const logout = () => dispatch(authThunks.logout());

  return {
    isLoggedIn, isInitialized, logout
  };
};