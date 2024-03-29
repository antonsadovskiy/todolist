import { useCallback } from "react";
import { useAppDispatch } from "../../../../../app/store/store";
import { tasksThunks } from "../../../slice/tasks-reducer/tasks-slice";
import { TaskStatus } from "../../../../../api/types";

export const useTask = (todoListId: string, id: string) => {
  const dispatch = useAppDispatch();

  const removeTaskHandler = useCallback(() => {
    dispatch(tasksThunks.deleteTask({ todolistId: todoListId, taskId: id }));
  }, [dispatch, id]);

  const changeTaskTitleHandler = useCallback(
    (newTitle: string) => {
      dispatch(
        tasksThunks.updateTask({
          todolistId: todoListId,
          taskId: id,
          model: { title: newTitle },
        })
      );
    },
    [dispatch, id]
  );
  const changeTaskStatusHandler = useCallback(
    (checked: boolean) => {
      dispatch(
        tasksThunks.updateTask({
          todolistId: todoListId,
          taskId: id,
          model: {
            status: checked ? TaskStatus.Completed : TaskStatus.New,
          },
        })
      );
    },
    [dispatch, id]
  );

  return {
    removeTaskHandler,
    changeTaskStatusHandler,
    changeTaskTitleHandler,
  };
};
