import React, {ChangeEvent, FC} from 'react';
import {TaskType} from "../../../App";
import style from './TasksList.module.css'

type TasksListPropsType = {
    tasks: Array<TaskType>
    removeTask: (id: string) => void
    changeStatus: (id: string, isDone: boolean) => void
}

export const TasksList:FC<TasksListPropsType> = (props) => {


    const tasks = props.tasks.map( task => {
        const onClickHandler = () => {
            props.removeTask(task.id)
        }

        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeStatus(task.id, e.currentTarget.checked)
        }

        return <li key={task.id} className={task.isDone? style.isDone : ''}>
            <input type={"checkbox"} onChange={onChangeHandler} checked={task.isDone}/>
            <span>{task.title}</span>
            <button onClick={onClickHandler}>X</button>
        </li>}
    )

    return (
        <ul>
            {tasks}
        </ul>
    );
};