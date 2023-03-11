import React, {FC} from 'react';
import {TasksList} from "./TasksList/TasksList";
import style from './TodoList.module.css'
import {FilterType, TaskType} from "../../App";
import {Input} from "../Input/Input";
import EditableSpan from "../EditableSpan/EditableSpan";
import {Button, IconButton} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

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
    changeTaskTitle: (todolistId: string, taskId: string, title: string) => void
    changeListTitle: (todolistId: string, title: string) => void
}

export const TodoList:FC<TodoListPropType> = (props) => {

    const onClickRemoveListHandler = () => {
        props.removeList(props.id)
    }
    const onChangeTitleHandler = (newTitle: string) => {
        props.changeListTitle(props.id, newTitle)
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

    const addTask = (title: string) => {
        props.addTask(props.id, title)
    }

    return (
        <div className={style.listContainer}>
            <div className={style.titleContainer}>
                <div>
                    <h3><EditableSpan title={props.title} onChangeTitle={onChangeTitleHandler}/></h3>
                </div>
                <IconButton onClick={onClickRemoveListHandler}>
                    <DeleteIcon/>
                </IconButton>
            </div>
            <Input addItem={addTask}/>
            <TasksList todolistId={props.id}
                       tasks={props.tasks}
                       removeTask={props.removeTask}
                       changeStatus={props.changeStatus}
                       changeTaskTitle={props.changeTaskTitle}/>
            <div className={style.buttonContainer}>
                <Button variant={props.filter === 'all'? "contained" : "outlined"}
                        onClick={setAll}
                        size={'small'}>
                    all
                </Button>
                <Button variant={props.filter === 'active'? "contained" : "outlined"}
                        onClick={setActive}
                        size={'small'}>
                    active
                </Button>
                <Button variant={props.filter === 'completed'? "contained" : "outlined"}
                        onClick={setCompleted}
                        size={'small'}>
                    completed
                </Button>
            </div>
        </div>
    );
};