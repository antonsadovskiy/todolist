import React, {ChangeEvent, FC, KeyboardEvent, useState} from 'react';
import {FilterType, TaskType} from "../../App";
import {TasksList} from "./TasksList/TasksList";

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
        if (e.key === 'Enter'){
            addTask()
        }
    }
    const addTask = () => {
        props.addTask(text)
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
        <div>
            <h3>{title}</h3>
            <div>
                <input onChange={onchangeHandler} onKeyPress={onKeyPressHandler} value={text}/>
                <button onClick={addTask}>+</button>
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