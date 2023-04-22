import React, {ChangeEvent, FC, useCallback} from 'react';
import {Checkbox} from "@mui/material";
import {EditableSpan} from "../../EditableSpan/EditableSpan";
import DeleteItem from "../../DeleteItem/DeleteItem";
import {TaskType} from "../../../redux/tasks/tasks-reducer";

type TaskPropsType = {
    task: TaskType
    removeTask: (taskId: string) => void
    changeTaskStatus: (taskId: string, newStatus: boolean) => void
    changeTaskTitle: (taskId: string, newTitle: string) => void
}

const Task: FC<TaskPropsType> = React.memo((props) => {

    const {id, title, isDone} = props.task

    const removeTaskHandler = useCallback(() => {
        props.removeTask(id)
    }, [props.removeTask, id])
    const onChangeTitleHandler = useCallback((newTitle: string) => {
        props.changeTaskTitle(id, newTitle)
    }, [props.changeTaskTitle, id])
    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        props.changeTaskStatus(id, e.currentTarget.checked)
    }

    const task = {
        listStyle: 'none',
        opacity: isDone ? '0.6' : '1',
        textDecorationLine: isDone ? 'line-through' : 'none'
    }

    return (
        <li style={task}>
            <Checkbox checked={isDone} onChange={onChangeStatusHandler}/>
            <EditableSpan title={title} onChangeTitle={onChangeTitleHandler}/>
            <DeleteItem deleteItem={removeTaskHandler}/>
        </li>
    );
});

export default Task;