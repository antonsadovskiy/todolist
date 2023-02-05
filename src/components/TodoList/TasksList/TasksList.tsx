import React, {FC} from 'react';
import {TasksType} from "../../../App";

type TasksListPropsType = {
    tasks: Array<TasksType>
}

export const TasksList:FC<TasksListPropsType> = (props) => {

    const tasks: JSX.Element | JSX.Element[] = props.tasks.map((task) =>
        <li key={task.id}>
            <input type="checkbox" checked={task.isDone}/>
            <span>{task.title}</span>
        </li>
    )

    return (
        <ul>
            {tasks}
        </ul>
    );
};
