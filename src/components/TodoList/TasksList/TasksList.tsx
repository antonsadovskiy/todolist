import React, {FC} from 'react';
import {TaskType} from "../../../App";

type TasksListPropsType = {
    tasks: Array<TaskType>
    removeTask: (id: string) => void
}

export const TasksList:FC<TasksListPropsType> = (props) => {

    const tasks = props.tasks.map( task =>
        <li key={task.id}>
            <input type={"checkbox"} checked={task.isDone}/>
            <span>{task.title}</span>
            <button onClick={() => props.removeTask(task.id)}>X</button>
        </li>
    )

    return (
        <ul>
            {tasks}
        </ul>
    );
};