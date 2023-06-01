import { ChangeEvent, useCallback } from "react";
import { TaskStatus } from "../../../../../api/todolistAPI";

export const useTask = (
  id: string,
  removeTask: (taskId: string) => void,
  changeTaskTitle: (taskId: string, newTitle: string) => void,
  changeTaskStatus: (taskId: string, newStatus: TaskStatus) => void
) => {

  const removeTaskHandler = useCallback(() => {
    removeTask(id);
  }, [removeTask, id]);

  const onChangeTitleHandler = useCallback((newTitle: string) => {
    changeTaskTitle(id, newTitle);
  }, [changeTaskTitle, id]);

  const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    changeTaskStatus(id, e.currentTarget.checked ? TaskStatus.Completed : TaskStatus.New);
  };

  return {
    removeTaskHandler, onChangeTitleHandler, onChangeStatusHandler
  };
};