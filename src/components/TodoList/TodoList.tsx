import React, {FC} from 'react';
import {TasksList} from "./TasksList/TasksList";
import style from './TodoList.module.css'
import {Input} from "../Input/Input";
import EditableSpan from "../EditableSpan/EditableSpan";
import {Button, IconButton} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    TaskType
} from "../../redux/tasks/tasks-reducer";
import {
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    FilterType,
    removeTodolistAC,
    TodoListType
} from "../../redux/todolists/todolists-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../redux/store/store";

type TodoListPropType = {
    todolist: TodoListType
}

export const TodoList: FC<TodoListPropType> = ({todolist}) => {

    const dispatch = useDispatch()
    const {id, title, filter} = todolist
    const tasks = useSelector<AppStateType, Array<TaskType>>(state => state.tasks[id])

    const removeTodolist = () => {
        dispatch(removeTodolistAC(id))
    }
    const changeTodolistTitle = (newTitle: string) => {
        dispatch(changeTodolistTitleAC(id, newTitle))
    }
    const changeTodolistFilter = (newFilterValue: FilterType) => {
        dispatch(changeTodolistFilterAC(id, newFilterValue))
    }
    const addTask = (taskTitle: string) => {
        dispatch(addTaskAC(id, taskTitle))
    }
    const removeTask = (taskId: string) => {
        dispatch(removeTaskAC(id, taskId))
    }
    const changeTaskTitle = (taskId: string, newTaskTitle: string) => {
        dispatch(changeTaskTitleAC(id, taskId, newTaskTitle))
    }
    const changeTaskStatus = (taskId: string, newTaskStatus: boolean) => {
        dispatch(changeTaskStatusAC(id, taskId, newTaskStatus))
    }

    const setAll = () => changeTodolistFilter('all')
    const setActive = () => changeTodolistFilter('active')
    const setCompleted = () => changeTodolistFilter('completed')

    const getTasksByFilter = (filter: FilterType) => {
        switch (filter) {
            case "active":
                return tasks.filter(task => !task.isDone)
            case "completed":
                return tasks.filter(task => task.isDone)
            default:
                return tasks
        }
    }

    const tasksToTodolist = getTasksByFilter(filter)


    return (
        <div className={style.listContainer}>
            <div className={style.titleContainer}>
                <div>
                    <h3><EditableSpan title={title} onChangeTitle={changeTodolistTitle}/></h3>
                </div>
                <IconButton onClick={removeTodolist}>
                    <DeleteIcon/>
                </IconButton>
            </div>
            <Input addItem={addTask}/>
            <TasksList tasks={tasksToTodolist}
                       removeTask={removeTask}
                       changeTaskStatus={changeTaskStatus}
                       changeTaskTitle={changeTaskTitle}/>
            <div className={style.buttonContainer}>
                <Button variant={filter === 'all' ? "contained" : "outlined"}
                        onClick={setAll}
                        size={'small'}>
                    all
                </Button>
                <Button variant={filter === 'active' ? "contained" : "outlined"}
                        onClick={setActive}
                        size={'small'}>
                    active
                </Button>
                <Button variant={filter === 'completed' ? "contained" : "outlined"}
                        onClick={setCompleted}
                        size={'small'}>
                    completed
                </Button>
            </div>
        </div>
    );
};