import {
  AppStateType,
  useAppDispatch,
  useAppSelector
} from "../../../app/store/store";
import { useSelector } from "react-redux";
import {
  addTodolistTC,
  getTodolistsTC,
  TodoListDomainType
} from "../reducers/todolist-reducer/todolists-reducer";
import { useCallback, useEffect } from "react";

export const useTodolists = (demo: boolean) => {

  const dispatch = useAppDispatch();
  const todolists = useSelector<AppStateType, Array<TodoListDomainType>>((state) => state.todolists);
  const isLoggedIn = useAppSelector<boolean>((state) => state.auth.isLoggedIn);

  useEffect(() => {
    if (demo || !isLoggedIn) return;
    dispatch(getTodolistsTC());
  }, []);

  const addTodolistHandler = useCallback(
    (title: string) => {
      dispatch(addTodolistTC(title));
    },
    [dispatch]
  );

  return {todolists, isLoggedIn, addTodolistHandler}
}