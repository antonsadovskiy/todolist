import { AppStateType, useAppDispatch } from "../../../../app/store/store";
import { useSelector } from "react-redux";
import { useCallback, useEffect } from "react";
import {
  todolistsActions,
  todolistsThunks,
} from "../../slice/todolist-reducer/todolists-slice";
import { tasksThunks } from "../../slice/tasks-reducer/tasks-slice";
import { FilterType, TaskDomainType } from "../../types";
import { TaskStatus } from "../../../../api/types";

export const useTodolist = (demo: boolean, id: string, filter: FilterType) => {
  const dispatch = useAppDispatch();
  const tasks = useSelector<AppStateType, Array<TaskDomainType>>(
    (state) => state.tasks[id]
  );

  useEffect(() => {
    if (demo) return;
    dispatch(tasksThunks.getTasks({ todolistId: id }));
  }, []);

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

  const setFilterHandler = useCallback(
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
  const todolistTasks = getTasksByFilter(filter);

  return {
    todolistTasks,
    changePageCountHandler,
    changePageHandler,
    setFilterHandler,
    removeTodolistHandler,
    changeTodolistTitleHandler,
    addTaskHandler,
  };
};
