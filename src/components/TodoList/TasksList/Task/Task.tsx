import React, {ChangeEvent, FC, useCallback} from 'react';
import {Checkbox} from "@mui/material";
import {EditableSpan} from "../../../EditableSpan/EditableSpan";
import DeleteItem from "../../../DeleteItem/DeleteItem";

type TaskPropsType = {
    id: string
    title: string
    isDone: boolean
    removeTask: (taskId: string) => void
    changeTaskStatus: (taskId: string, newStatus: boolean) => void
    changeTaskTitle: (taskId: string, newTitle: string) => void
}

const Task: FC<TaskPropsType> = React.memo((props) => {

    const removeTaskHandler = useCallback(() => {
        props.removeTask(props.id)
    }, [props.removeTask, props.id])
    const onChangeTitleHandler = useCallback((newTitle: string) => {
        props.changeTaskTitle(props.id, newTitle)
    }, [props.changeTaskTitle, props.id])
    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        props.changeTaskStatus(props.id, e.currentTarget.checked)
    }

    const task = {
        listStyle: 'none',
        opacity: props.isDone ? '0.6' : '1',
        textDecorationLine: props.isDone ? 'line-through' : 'none'
    }

    return (
        <li style={task}>
            <Checkbox checked={props.isDone} onChange={onChangeStatusHandler}/>
            <EditableSpan title={props.title} onChangeTitle={onChangeTitleHandler}/>
            <DeleteItem deleteItem={removeTaskHandler}/>
        </li>
    );
});

export default Task;