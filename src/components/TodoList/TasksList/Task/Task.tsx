import React, {ChangeEvent, FC} from 'react';
import {Checkbox} from "@mui/material";
import {EditableSpan} from "../../../EditableSpan/EditableSpan";
import style from "./Task.module.css"
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

    const removeTaskHandler = () => {
        props.removeTask(props.id)
    }
    const onChangeTitleHandler = (newTitle: string) => {
        props.changeTaskTitle(props.id, newTitle)
    }
    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        props.changeTaskStatus(props.id, e.currentTarget.checked)
    }

    return (
        <li className={style.task}>
            <Checkbox checked={props.isDone} onChange={onChangeStatusHandler}/>
            <EditableSpan title={props.title} onChangeTitle={onChangeTitleHandler}/>
            <DeleteItem deleteItem={removeTaskHandler}/>
        </li>
    );
});

export default Task;