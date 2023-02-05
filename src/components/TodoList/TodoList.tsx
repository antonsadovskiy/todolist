import React, {FC} from 'react';
import { TasksType } from '../../App';
import {TasksList} from "./TasksList/TasksList";

type TodoListPropsType = {
    title: string
    tasks: Array<TasksType>
}

export const TodoList:FC<TodoListPropsType> = (props) => {

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input />
                <button>+</button>
            </div>
            <TasksList tasks={props.tasks}/>
            <div>
                <button>all</button>
                <button>active</button>
                <button>completed</button>
            </div>
        </div>
    );
};