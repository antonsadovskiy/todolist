import React, {FC, useState} from "react";
import TasksList from "./TasksList/TasksList";
import {TaskType} from "../../../App";
import StatusButtons from "./StatusButtons/StatusButtons";
import s from './TodoList.module.css'

type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
}

export type FilterType = 'all' | 'active' | 'completed'

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
        <div className={s.listContainer}>
            <h3>{props.title}</h3>
            <div className={s.input}>
                <input/>
                <button>+</button>
            </div>
            <TasksList tasks={filteredTasks} />
            <StatusButtons changeFilter={changeFilter}/>
        </div>
    )
}

export default TodoList