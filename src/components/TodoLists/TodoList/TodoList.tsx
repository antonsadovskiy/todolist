import React, {FC, useState} from "react";
import {TasksList} from "./TasksList/TasksList";
import {TaskType} from "../../../App";
import {StatusButtons} from "./StatusButtons/StatusButtons";
import s from './TodoList.module.css'
import {InputTask} from "./InputTask/InputTask";

type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
}

export type FilterType = 'all' | 'active' | 'completed'

export const TodoList: FC<TodoListPropsType> = (props) => {

    const [filter, setFilter] = useState<FilterType>('all')

    const [tasksForList, setTasksForList] = useState(props.tasks)

    let filteredTasks = tasksForList

    if (filter === 'active'){
        filteredTasks = tasksForList.filter(task => !task.isDone)
    }
    if (filter === 'completed'){
        filteredTasks = tasksForList.filter(task => task.isDone)
    }

    const changeFilter = (value: FilterType) => {
        setFilter(value)
    }

    const addTask = (value: string) => {
        let newTask = {
            id: new Date().getDate(),
            title: value,
            isDone: false,
        }
        setTasksForList([newTask, ...tasksForList])
    }

    const removeTask = (id: number) => {
        let tasks = tasksForList.filter( item => item.id !== id )
        setTasksForList(tasks)
    }



    return (
        <div className={s.listContainer}>
            <h3>{props.title}</h3>
            <InputTask addTask={addTask}/>
            <TasksList tasks={filteredTasks} removeTask={removeTask}/>
            <StatusButtons changeFilter={changeFilter}/>
        </div>
    )
}