import { useAppDispatch, useAppSelector } from "../../../app/store/store";
import { useEffect } from "react";
import { authThunks } from "../../Login/slice/auth-slice";
import { selectorIsLoggedIn } from "../../Login/selectors";
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
