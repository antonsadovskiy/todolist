import React, {ChangeEvent, FC, useCallback} from 'react';
import {Checkbox} from "@mui/material";
import {EditableSpan} from "../../EditableSpan/EditableSpan";
import DeleteItem from "../../DeleteItem/DeleteItem";
import {TaskStatus, TaskType} from "../../../api/todolistAPI";

type TaskPropsType = {
    task: TaskType
    removeTask: (taskId: string) => void
    changeTaskStatus: (taskId: string, newStatus: TaskStatus) => void
    changeTaskTitle: (taskId: string, newTitle: string) => void
}

const Task: FC<TaskPropsType> = React.memo((props) => {

    const {id, title, status} = props.task

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
        textDecorationLine: status === TaskStatus.Completed ? 'line-through' : 'none'
    }

    return (
        <li style={taskStyle}>
            <Checkbox checked={status === TaskStatus.Completed} onChange={onChangeStatusHandler}/>
            <EditableSpan title={title} onChangeTitle={onChangeTitleHandler}/>
            <DeleteItem deleteItem={removeTaskHandler}/>
        </li>
    );
});

export default Task;