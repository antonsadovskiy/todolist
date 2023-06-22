import { AppStateType, useAppDispatch } from "../../../../app/store/store";
import { useSelector } from "react-redux";
import { useCallback, useEffect } from "react";
import {
  FilterType,
  todolistsActions,
  todolistsThunks,
} from "../../reducers/todolist-reducer/todolists-slice";
import { tasksThunks } from "../../reducers/tasks-reducer/tasks-slice";
import { TaskDomainType, TaskStatus } from "../../../../api/tasksAPI";

export const useTodolist = (
  demo: boolean,
  id: string,
  filter: FilterType,
  pageCount: number,
  page: number
) => {
  const dispatch = useAppDispatch();
  const tasks = useSelector<AppStateType, Array<TaskDomainType>>(
    (state) => state.tasks[id]
  );

  useEffect(() => {
    if (demo) return;
    dispatch(tasksThunks.getTasks({ todolistId: id, page, count: pageCount }));
  }, [page, pageCount]);

  const removeTodolistHandler = useCallback(() => {
    dispatch(todolistsThunks.deleteTodolist({ id }));
  }, [dispatch, id]);

  const changeTodolistTitleHandler = useCallback(
    (newTitle: string) => {
      dispatch(todolistsThunks.updateTodolist({ id, newTitle }));
    },
    [dispatch, id]
  );

  const changeTodolistFilterHandler = useCallback(
    (newFilterValue: FilterType) => {
      dispatch(
        todolistsActions.changeTodolistFilter({
          todolistId: id,
          filter: newFilterValue,
        })
      );
    },
    [dispatch, id]
  );

  const addTaskHandler = useCallback(
    (taskTitle: string) => {
      dispatch(
        tasksThunks.addTask({
          todolistId: id,
          taskTitle,
        })
      );
    },
    [dispatch, id]
  );

  const changePageCountHandler = (pageCount: number) => {
    dispatch(todolistsActions.changePageCount({ todolistId: id, pageCount }));
  };
  const changePageHandler = (page: number) => [
    dispatch(todolistsActions.changePage({ todolistId: id, page })),
  ];

  const setFilter = useCallback(
    (filterValue: FilterType) => changeTodolistFilterHandler(filterValue),
    [changeTodolistFilterHandler]
  );

  const getTasksByFilter = (filter: FilterType) => {
    switch (filter) {
      case "active":
        return tasks.filter((task) => task.status === TaskStatus.New);
      case "completed":
        return tasks.filter((task) => task.status === TaskStatus.Completed);
      default:
        return tasks;
    }
  };
  const tasksForTodolist = getTasksByFilter(filter);

  return {
    tasksForTodolist,
    changePageCountHandler,
    changePageHandler,
    setFilter,
    removeTodolistHandler,
    changeTodolistTitleHandler,
    addTaskHandler,
  };
};
