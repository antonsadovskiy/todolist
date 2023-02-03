import React, {FC, useState} from "react";
import TasksList from "./TasksList/TasksList";
import {TaskType} from "../../../App";

type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
}

type FilterType = 'all' | 'active' | 'completed'

const TodoList: FC<TodoListPropsType> = (props) => {

    const [filter, setFilter] = useState<FilterType>('all')

    let filteredTasks = props.tasks

    if (filter === 'active'){
        filteredTasks = props.tasks.filter(task => !task.isDone)
    }
    if (filter === 'completed'){
        filteredTasks = props.tasks.filter(task => task.isDone)
    }

    const changeFilter = (value: FilterType) => {
        setFilter(value)
    }

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <TasksList tasks={filteredTasks} />
            <div>
                <button onClick={() => {changeFilter('all')}}>All</button>
                <button onClick={() => {changeFilter('active')}}>Active</button>
                <button onClick={() => {changeFilter('completed')}}>Completed</button>
            </div>
        </div>
    )
}

export default TodoList