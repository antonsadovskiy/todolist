import {
  AppStateType,
  useAppDispatch,
  useAppSelector
} from "../../../app/store/store";
import { useSelector } from "react-redux";
import {
  TodoListDomainType,
  todolistsThunks
} from "../reducers/todolist-reducer/todolists-slice";
import { useCallback, useEffect } from "react";

export const useTodolists = (demo: boolean) => {

  const dispatch = useAppDispatch();
  const todolists = useSelector<AppStateType, Array<TodoListDomainType>>((state) => state.todolists);
  const isLoggedIn = useAppSelector<boolean>((state) => state.auth.isLoggedIn);

  useEffect(() => {
    if (demo || !isLoggedIn) return;
    dispatch(todolistsThunks.getTodolists());
  }, []);

  const addTodolistHandler = useCallback(
    (title: string) => {
      dispatch(todolistsThunks.addTodolist({title}));
    },
    [dispatch]
  );

  return { todolists, isLoggedIn, addTodolistHandler };
};