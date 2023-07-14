import React, { FC, memo } from "react";
import { EditableSpan } from "../../../../components/EditableSpan/EditableSpan";
import DeleteItem from "../../../../components/DeleteItem/DeleteItem";
import { useTask } from "./hooks/useTask";
import { TaskDomainType } from "../../types";
import { TaskStatus } from "../../../../api/types";
import s from "./Task.module.scss";
import { Checkbox } from "../../../../components/ui/checkbox";

type TaskPropsType = {
  task: TaskDomainType;
};

const Task: FC<TaskPropsType> = memo(({ task }) => {
  const { removeTaskHandler, changeTaskStatusHandler, changeTaskTitleHandler } =
    useTask(task.todoListId, task.id);

  const taskStyle = {
    textDecorationLine:
      task.status === TaskStatus.Completed ? "line-through" : "none",
  };

  return (
    <li style={taskStyle} className={s.task}>
      <Checkbox
        checked={task.status === TaskStatus.Completed}
        onChange={changeTaskStatusHandler}
        disabled={task.entityStatus === "loading"}
      />
      <EditableSpan
        taskStatus={task.status === TaskStatus.Completed ? "0.6" : "1"}
        title={task.title}
        onChangeTitle={changeTaskTitleHandler}
        disabled={task.entityStatus === "loading"}
        editInputWidth={110}
        variant={"body1"}
        className={s.taskTitle}
      />
      <DeleteItem
        deleteItem={removeTaskHandler}
        disabled={task.entityStatus === "loading"}
        className={s.deleteItem}
      />
    </li>
  );
});

export default Task;
