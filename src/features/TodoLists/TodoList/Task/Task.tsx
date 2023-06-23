import React, { FC, memo } from "react";
import Checkbox from "@mui/material/Checkbox";
import { EditableSpan } from "../../../../components/EditableSpan/EditableSpan";
import DeleteItem from "../../../../components/DeleteItem/DeleteItem";
import { useTask } from "./hooks/useTask";
import { TaskDomainType } from "../../types";
import { TaskStatus } from "../../../../api/types";

type TaskPropsType = {
  task: TaskDomainType;
};

const Task: FC<TaskPropsType> = memo(({ task }) => {
  const { removeTaskHandler, changeTaskStatusHandler, changeTaskTitleHandler } =
    useTask(task.todoListId, task.id);

  const taskStyle = {
    listStyle: "none",
    textDecorationLine:
      task.status === TaskStatus.Completed ? "line-through" : "none",
    display: "flex",
    justifyContent: "space-between",
  };

  return (
    <li style={taskStyle}>
      <div>
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
        />
      </div>
      <DeleteItem
        deleteItem={removeTaskHandler}
        disabled={task.entityStatus === "loading"}
      />
    </li>
  );
});

export default Task;
