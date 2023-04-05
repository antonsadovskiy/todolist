import React, {ChangeEvent, FC} from 'react';
import style from './TasksList.module.css'
import EditableSpan from "../../EditableSpan/EditableSpan";
import DeleteIcon from "@mui/icons-material/Delete";
import {Checkbox, IconButton} from "@mui/material";
import {TaskType} from "../../../redux/tasks/tasks-reducer";

type TasksListPropsType = {
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean) => void
    changeTaskTitle: (taskId: string, title: string) => void
}

export const TasksList:FC<TasksListPropsType> = (props) => {

    const tasks = props.tasks.map( task => {

        const onClickHandler = () => {
            props.removeTask(task.id)
        }
        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeTaskStatus(task.id, e.currentTarget.checked)
        }
        const onChangeTitleHandler = (newTitle: string) => {
            props.changeTaskTitle(task.id, newTitle)
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