import React, {FC} from 'react';
import {TaskType} from "../TodoList";

type TasksListPropsType = {
    tasks: Array<TaskType>
}

const TasksList: FC<TasksListPropsType> = (props) => {

    const tasks: JSX.Element[] | JSX.Element = props.tasks.length
        ? props.tasks.map((item) =>
            <li key={item.id}>
                <input type="checkbox" checked={item.isDone}/>
                <span> {item.title}</span>
            </li>)
        : <span>Your tasks list is empty</span>

    return (
        <ul>
            {tasks}
        </ul>
    );
};

export default TasksList;