import React, {ChangeEvent, FC} from 'react';
import style from './TasksList.module.css'
import {TaskType} from "../../../App";
import EditableSpan from "../../EditableSpan/EditableSpan";
import DeleteIcon from "@mui/icons-material/Delete";
import {Checkbox, IconButton} from "@mui/material";

type TasksListPropsType = {
    todolistId: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistId: string) => void
    changeStatus: (todolistId: string, taskId: string, isDone: boolean) => void
    changeTaskTitle: (todolistId: string, taskId: string, title: string) => void
}

export const TasksList:FC<TasksListPropsType> = (props) => {

    const tasks = props.tasks.map( task => {

        const onClickHandler = () => {
            props.removeTask(props.todolistId, task.id)
        }
        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeStatus(props.todolistId, task.id, e.currentTarget.checked)
        }
        const onChangeTitleHandler = (newTitle: string) => {
            props.changeTaskTitle(props.todolistId, task.id, newTitle)
        }

        return (
            <li key={task.id} className={style.task}>
                <Checkbox checked={task.isDone} onChange={onChangeHandler}/>
                <EditableSpan title={task.title} onChangeTitle={onChangeTitleHandler}/>
                <IconButton onClick={onClickHandler}>
                    <DeleteIcon/>
                </IconButton>
            </li>)}
    )

    return (
        <ul className={style.tasksContainer}>
            {tasks}
        </ul>
    );
};