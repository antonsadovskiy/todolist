import React, {FC} from 'react';
import {FilterType, TasksType} from '../../App';
import {TasksList} from "./TasksList/TasksList";

type TodoListPropsType = {
    title: string
    tasks: Array<TasksType>
    changeFilter: (filterValue: FilterType) => void
    removeTask: (id: number) => void
}

export const TodoList:FC<TodoListPropsType> = (props) => {

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input />
                <button>+</button>
            </div>
            <TasksList tasks={props.tasks} removeTask={props.removeTask} />
            <div>
                <button onClick={() => props.changeFilter('all')} >All</button>
                <button onClick={() => props.changeFilter('active')} >Active</button>
                <button onClick={() => props.changeFilter('completed')} >Completed</button>
            </div>
        </div>
    );
};