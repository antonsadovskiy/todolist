import React, {ChangeEvent, FC} from 'react';
import style from './TasksList.module.css'
import {TaskType} from "../../../App";

type TasksListPropsType = {
    todolistId: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistId: string) => void
    changeStatus: (taskId: string, isDone: boolean, todolistId: string) => void
}

export const TasksList:FC<TasksListPropsType> = (props) => {

    const tasks = props.tasks.map( task => {

        const onClickHandler = () => {
            props.removeTask(task.id, props.todolistId)
        }
        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeStatus(task.id, e.currentTarget.checked, props.todolistId)
        }

        return (
            <li key={task.id} className={style.task}>
                <input type="checkbox" checked={task.isDone} onChange={onChangeHandler}/>
                <span>{task.title}</span>
                <button onClick={onClickHandler}>x</button>
            </li>)}
    )

    return (
        <ul className={style.tasksContainer}>
            {tasks}
        </ul>
    );
};