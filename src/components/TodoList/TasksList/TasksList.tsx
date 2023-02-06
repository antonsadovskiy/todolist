import React, {FC} from 'react';
import {TasksType} from "../../../App";

type TasksListPropsType = {
    tasks: Array<TasksType>
    removeTask: (id: number) => void
}

export const TasksList:FC<TasksListPropsType> = (props) => {

    const tasks: JSX.Element | JSX.Element[] = props.tasks.map((task) =>
        <li key={task.id}>
            <input type="checkbox" checked={task.isDone}/>
            <span>{task.title}</span>
            <button onClick={ () => props.removeTask(task.id) }>x</button>
        </li>
    )

    return (
        <ul>
            {tasks}
        </ul>
    );
};
