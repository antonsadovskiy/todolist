import React, {ChangeEvent, FC, KeyboardEvent, useState} from 'react';
import {FilterType, TaskType} from "../../App";
import {TasksList} from "./TasksList/TasksList";
import style from './TodoList.module.css'

type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
    filter: FilterType
    changeFilter: (filterValue: FilterType) => void
    removeTask: (id: string) => void
    addTask: (title: string) => void
    changeStatus: (id: string, isDone: boolean) => void
}

export const TodoList:FC<TodoListPropsType> = ({title, tasks,filter, ...props}) => {

    const [text, setText] = useState<string>('')
    const [error, setError] = useState<string | null>(null)
    const inputMaxLength: number = 15
    const isUserMessageTooLong: boolean = text.length > inputMaxLength

    const onchangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setText(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (text.length <= 15 && e.key === 'Enter'){
            addTask()
        }
    }
    const addTask = () => {
        if (text.trim()){
            props.addTask(text.trim())
            setText('')
        } else {
            setError('Title is required')
        }
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

    const errorLength = isUserMessageTooLong && <div className={style.warning}>Title is too long</div>
    const errorZeroInput = error && <div className={style.warning}>{error}</div>
    const isButtonDisabled = text.length > 15 || text.length === 0

    return (
        <div className={style.listContainer}>
            <h3>{title}</h3>
            <div className={style.newTaskContainer}>
                <input placeholder={"Enter task"} onChange={onchangeHandler} onKeyPress={onKeyPressHandler} value={text}/>
                <button disabled={isButtonDisabled} onClick={addTask}>+</button>
                {errorZeroInput}
                {errorLength}
            </div>
            <TasksList tasks={tasks} removeTask={props.removeTask} changeStatus={props.changeStatus}/>
            <div>
                <button className={filter === 'all'? style.isActive : ''} onClick={setAll}>All</button>
                <button className={filter === 'active'? style.isActive : ''} onClick={setActive}>Active</button>
                <button className={filter === 'completed'? style.isActive : ''} onClick={setCompleted}>Completed</button>
            </div>
        </div>
    );
};