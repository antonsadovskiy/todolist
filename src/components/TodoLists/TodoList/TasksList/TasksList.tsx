import React, {FC} from 'react';
import {TaskType} from "../../../../App";
import s from './TasksList.module.css'

type TaskListPropsType = {
    tasks: Array<TaskType>
}

const TasksList:FC<TaskListPropsType> = (props) => {

    const tasks: JSX.Element[] | JSX.Element = props.tasks.map((item) =>
            <li key={item.id}>
                <input type="checkbox" checked={item.isDone}/>
                <span> {item.title}</span>
            </li>)

    return (
        <ul className={s.tasks}>
            {tasks}
        </ul>
    );
};

export default TasksList;