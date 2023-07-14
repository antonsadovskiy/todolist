import { useAppDispatch, useAppSelector } from "../../../app/store/store";
import { useSelector } from "react-redux";
import { todolistsThunks } from "../slice/todolist-reducer/todolists-slice";
import { useCallback, useEffect } from "react";
import { selectorIsLoggedIn } from "../../Login/selectors";
import { selectorTodolists } from "../selectors";

export const useTodoLists = (demo: boolean) => {
  const dispatch = useAppDispatch();
  const todoLists = useSelector(selectorTodolists);
  const isLoggedIn = useAppSelector(selectorIsLoggedIn);

  useEffect(() => {
    if (demo || !isLoggedIn) return;
    dispatch(todolistsThunks.getTodolists());
  }, []);

  const addTodolistHandler = useCallback(
    (title: string) => {
      dispatch(todolistsThunks.addTodolist({ title }));
    },
    [dispatch]
  );

  return { todoLists, isLoggedIn, addTodolistHandler };
};
