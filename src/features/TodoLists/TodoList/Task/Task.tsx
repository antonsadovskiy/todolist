import React, {ChangeEvent, FC, useCallback} from 'react';
import Checkbox from "@mui/material/Checkbox";
import {EditableSpan} from "../../../../components/EditableSpan/EditableSpan";
import DeleteItem from "../../../../components/DeleteItem/DeleteItem";
import {TaskDomainType, TaskStatus} from "../../../../api/todolistAPI";

type TaskPropsType = {
  task: TaskDomainType
  removeTask: (taskId: string) => void
  changeTaskStatus: (taskId: string, newStatus: TaskStatus) => void
  changeTaskTitle: (taskId: string, newTitle: string) => void
}

const Task: FC<TaskPropsType> = React.memo((props) => {

  const {id, title, status, entityStatus} = props.task

  const removeTaskHandler = useCallback(() => {
    props.removeTask(id)
  }, [props.removeTask, id])

  const onChangeTitleHandler = useCallback((newTitle: string) => {
    props.changeTaskTitle(id, newTitle)
  }, [props.changeTaskTitle, id])

  const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    props.changeTaskStatus(id, e.currentTarget.checked ? TaskStatus.Completed : TaskStatus.New)
  }

  const taskStyle = {
    listStyle: 'none',
    opacity: status === TaskStatus.Completed ? '0.6' : '1',
    textDecorationLine: status === TaskStatus.Completed ? 'line-through' : 'none',
    display: 'flex',
    justifyContent: 'space-between'
  }

  return (
    <li style={taskStyle}>
      <div>
        <Checkbox checked={status === TaskStatus.Completed}
                  onChange={onChangeStatusHandler}
                  disabled={entityStatus === 'loading'}/>
        <EditableSpan title={title}
                      onChangeTitle={onChangeTitleHandler}
                      disabled={entityStatus === 'loading'}/>
      </div>
      <DeleteItem deleteItem={removeTaskHandler}
                  disabled={entityStatus === 'loading'}/>
    </li>
  );
});

export default Task;