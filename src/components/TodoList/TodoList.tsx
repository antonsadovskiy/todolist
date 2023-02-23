import React, {ChangeEvent, FC, KeyboardEvent, useState} from 'react';
import {TasksList} from "./TasksList/TasksList";
import style from './TodoList.module.css'
import {FilterType, TaskType} from "../../App";

type TodoListPropType = {
    id: string
    title: string
    tasks: Array<TaskType>
    filter: FilterType
    changeFilter: (todolistId: string, filterValue: FilterType) => void
    removeTask: (todolistId: string, taskId: string) => void
    addTask: (todolistId: string, title: string) => void
    changeStatus: (todolistId: string, taskId: string, isDone: boolean) => void
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
            props.addTask(props.id, title.trim())
            setTitle('')
        } else {
            setError('Title is required')
        }
    }
    const onClickRemoveListHandler = () => {
        props.removeList(props.id)
    }

    const setAll = () => {
        props.changeFilter(props.id,'all')
    }
    const setActive = () => {
        props.changeFilter(props.id, 'active')
    }
    const setCompleted = () => {
        props.changeFilter(props.id, 'completed')
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