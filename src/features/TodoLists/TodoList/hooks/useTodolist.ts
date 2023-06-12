import { AppStateType, useAppDispatch } from "../../../../app/store/store";
import { useSelector } from "react-redux";
import { TaskDomainType, TaskStatus } from "../../../../api/todolistAPI";
import { useCallback, useEffect } from "react";
import {
  FilterType,
  todolistsActions,
  todolistsThunks,
} from "../../reducers/todolist-reducer/todolists-slice";
import { tasksThunks } from "../../reducers/tasks-reducer/tasks-slice";

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
      dispatch(tasksThunks.addTask({ todolistId: id, taskTitle }));
    },
    [dispatch, id]
  );

  const removeTaskHandler = useCallback(
    (taskId: string) => {
      dispatch(tasksThunks.deleteTask({ todolistId: id, taskId }));
    },
    [dispatch, id]
  );

  const changeTaskTitleHandler = useCallback(
    (taskId: string, newTaskTitle: string) => {
      dispatch(
        tasksThunks.updateTask({
          todolistId: id,
          taskId,
          model: { title: newTaskTitle },
        })
      );
    },
    [dispatch, id]
  );

  const changeTaskStatusHandler = useCallback(
    (taskId: string, newTaskStatus: TaskStatus) => {
      dispatch(
        tasksThunks.updateTask({
          todolistId: id,
          taskId,
          model: { status: newTaskStatus },
        })
      );
    },
    [dispatch, id]
  );

  const setAll = useCallback(
    () => changeTodolistFilterHandler("all"),
    [changeTodolistFilterHandler]
  );
  const setActive = useCallback(
    () => changeTodolistFilterHandler("active"),
    [changeTodolistFilterHandler]
  );
  const setCompleted = useCallback(
    () => changeTodolistFilterHandler("completed"),
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
    setAll,
    setActive,
    setCompleted,
    removeTodolistHandler,
    changeTodolistTitleHandler,
    addTaskHandler,
    removeTaskHandler,
    changeTaskTitleHandler,
    changeTaskStatusHandler,
  };
};
