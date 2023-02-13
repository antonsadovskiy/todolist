import React, {ChangeEvent, FC, KeyboardEvent, useState} from 'react';
import {FilterType, TaskType} from "../../App";
import {TasksList} from "./TasksList/TasksList";
import style from './TodoList.module.css'

type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
    changeFilter: (filterValue: FilterType) => void
    removeTask: (id: string) => void
    addTask: (title: string) => void
}

export const TodoList:FC<TodoListPropsType> = ({title, tasks, ...props}) => {

    const [text, setText] = useState<string>('')

    const onchangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setText(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (text.length <= 15 && e.key === 'Enter'){
            addTask()
        }
    }
    const addTask = () => {
        const trimmedTask = text.trim()
        if (trimmedTask){
            props.addTask(trimmedTask)
        }
        setText('')
    }
    const setAll = () => {
        props.changeFilter('all')
    }
    const setActive = () => {
        props.changeFilter('active')
    }
    const setCompleted = () => {
        props.changeFilter('completed')
    }

    return (
        <div className={style.listContainer}>
            <h3>{title}</h3>
            <div className={style.newTaskContainer}>
                <input placeholder={"Enter task"} onChange={onchangeHandler} onKeyPress={onKeyPressHandler} value={text}/>
                <button disabled={!text.length || text.length > 15} onClick={addTask}>+</button>
                {text.length > 15 && <div className={style.warning}>Title is too long</div>}
            </div>
            <TasksList tasks={tasks} removeTask={props.removeTask}/>
            <div>
                <button onClick={setAll}>All</button>
                <button onClick={setActive}>Active</button>
                <button onClick={setCompleted}>Completed</button>
            </div>
        </div>
    );
};