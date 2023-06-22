import { useAppDispatch, useAppSelector } from "../store/store";
import { useEffect } from "react";
import { authThunks } from "../../features/Login/reducers/auth-slice";
import { selectorIsLoggedIn } from "../../features/Login/selectors";
import { selectorIsInitialized } from "../selectors";

export const useApp = (demo: boolean) => {
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector(selectorIsLoggedIn);
  const isInitialized = useAppSelector(selectorIsInitialized);

  useEffect(() => {
    if (!demo) {
      dispatch(authThunks.me());
    }
  }, []);

  const logout = () => dispatch(authThunks.logout());

  return {
    isLoggedIn,
    isInitialized,
    logout,
  };
};
