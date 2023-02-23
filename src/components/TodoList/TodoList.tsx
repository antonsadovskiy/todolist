import React, {ChangeEvent, FC, KeyboardEvent, useState} from 'react';
import {TasksList} from "./TasksList/TasksList";
import style from './TodoList.module.css'
import {FilterType, TaskType} from "../../App";

type TodoListPropType = {
    id: string
    title: string
    tasks: Array<TaskType>
    filter: FilterType
    changeFilter: (filterValue: FilterType, todolistId: string) => void
    removeTask: (taskId: string, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeStatus: (taskId: string, isDone: boolean, todolistId: string) => void
    removeList: (todolistId: string) => void
}

export const TodoList:FC<TodoListPropType> = (props) => {

    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<string | null>(null)
    const titleMaxLength: number = 15
    const isUserMessageIsTooLong: boolean = title.length > titleMaxLength

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onClickHandler = () => {
        addTask()
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (title.length <= 15 && e.key === 'Enter'){
            addTask()
        }
    }
    const addTask = () => {
        if (title.trim()){
            props.addTask(title.trim(), props.id)
            setTitle('')
        } else {
            setError('Title is required')
        }
    }
    const onClickRemoveListHandler = () => {
        props.removeList(props.id)
    }

    const setAll = () => {
        props.changeFilter('all', props.id)
    }
    const setActive = () => {
        props.changeFilter('active', props.id)
    }
    const setCompleted = () => {
        props.changeFilter('completed', props.id)
    }

    const errorTitleZero = error && <div className={style.warning}>{error}</div>
    const errorTitleLength = isUserMessageIsTooLong && <div className={style.warning}>Title is too long</div>
    const isButtonDisabled = title.length > 15 || title.length === 0

    return (
        <div className={style.listContainer}>
            <h3>{props.title} <button onClick={onClickRemoveListHandler}>x</button></h3>
            <div className={style.newTaskContainer}>
                <input placeholder={'Enter task'}
                       type="text"
                       value={title}
                       onChange={onChangeHandler}
                       onKeyDown={onKeyPressHandler}/>
                <button disabled={isButtonDisabled} onClick={onClickHandler}>+</button>
                {errorTitleZero}
                {errorTitleLength}
            </div>
            <TasksList todolistId={props.id}
                       tasks={props.tasks}
                       removeTask={props.removeTask}
                       changeStatus={props.changeStatus}/>
            <div>
                <button className={props.filter === 'all'? style.isActive : ''} onClick={setAll}>all</button>
                <button className={props.filter === 'active'? style.isActive : ''} onClick={setActive}>active</button>
                <button className={props.filter === 'completed'? style.isActive : ''} onClick={setCompleted}>complete</button>
            </div>
        </div>
    );
};