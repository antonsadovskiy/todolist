import React, {FC, useCallback, useMemo} from 'react';
import {TasksList} from "./TasksList/TasksList";
import style from './TodoList.module.css'
import {Input} from "../Input/Input";
import {EditableSpan} from "../EditableSpan/EditableSpan";
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
import Buttons from "./Buttons/Buttons";
import DeleteItem from "../DeleteItem/DeleteItem";

type TodoListPropType = {
    todolist: TodoListType
}

export const TodoList: FC<TodoListPropType> = React.memo(({todolist}) => {

    const dispatch = useDispatch()
    const {id, title, filter} = todolist
    const tasks = useSelector<AppStateType, Array<TaskType>>(state => state.tasks[id])

    const removeTodolist = useCallback(() => {
        dispatch(removeTodolistAC(id))
    }, [dispatch, id])
    const changeTodolistTitle = useCallback((newTitle: string) => {
        dispatch(changeTodolistTitleAC(id, newTitle))
    }, [dispatch, id])
    const changeTodolistFilter = useCallback((newFilterValue: FilterType) => {
        dispatch(changeTodolistFilterAC(id, newFilterValue))
    }, [dispatch, id])
    const addTask = useCallback((taskTitle: string) => {
        dispatch(addTaskAC(id, taskTitle))
    }, [dispatch, id])
    const removeTask = useCallback((taskId: string) => {
        dispatch(removeTaskAC(id, taskId))
    }, [dispatch, id])
    const changeTaskTitle = useCallback((taskId: string, newTaskTitle: string) => {
        dispatch(changeTaskTitleAC(id, taskId, newTaskTitle))
    }, [dispatch, id])
    const changeTaskStatus = useCallback((taskId: string, newTaskStatus: boolean) => {
        dispatch(changeTaskStatusAC(id, taskId, newTaskStatus))
    }, [dispatch, id])

    const setAll = useCallback(() => changeTodolistFilter('all'), [changeTodolistFilter])
    const setActive = useCallback(() => changeTodolistFilter('active'), [changeTodolistFilter])
    const setCompleted = useCallback(() => changeTodolistFilter('completed'), [changeTodolistFilter])

    const getTasksByFilter = useCallback((filter: FilterType) => {
        switch (filter) {
            case "active":
                return tasks.filter(task => !task.isDone)
            case "completed":
                return tasks.filter(task => task.isDone)
            default:
                return tasks
        }
    }, [tasks])
    const tasksToTodolist = useMemo(() => getTasksByFilter(filter), [getTasksByFilter, filter])

    return (
        <div className={style.listContainer}>
            <div className={style.titleContainer}>
                <h3><EditableSpan title={title} onChangeTitle={changeTodolistTitle}/></h3>
                <DeleteItem deleteItem={removeTodolist}/>
            </div>
            <Input addItem={addTask}/>
            <TasksList tasks={tasksToTodolist}
                       removeTask={removeTask}
                       changeTaskStatus={changeTaskStatus}
                       changeTaskTitle={changeTaskTitle}/>
            <Buttons filter={filter}
                     setAll={setAll}
                     setActive={setActive}
                     setCompleted={setCompleted}/>
        </div>
    );
});