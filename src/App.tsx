import React from 'react';
import './App.css';
import {TodoList} from "./components/TodoList/TodoList";
import {Input} from "./components/Input/Input";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import {
    addTodolistAC, changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
} from "./state/todolists/todolists-reducer";
import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
} from "./state/tasks/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "./state/store";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type TodoListType = {
    id: string
    title: string
    filter: FilterType
}
export type TasksType = {
    [key: string]: Array<TaskType>
}
export type FilterType = 'all' | 'active' | 'completed'

const App = () => {

    const dispatch = useDispatch()
    const todolists = useSelector<AppStateType, Array<TodoListType>>(state => state.todolists)
    const tasks = useSelector<AppStateType, TasksType>(state => state.tasks)

    const addTask = (todolistId: string, title: string) => {
        dispatch(addTaskAC(todolistId, title))
    }
    const removeTask = (todolistId: string, taskId: string) => {
        dispatch(removeTaskAC(todolistId, taskId))
    }
    const changeTaskTitle = (todolistId: string, taskId: string, title: string) => {
        dispatch(changeTaskTitleAC(todolistId, taskId, title))
    }
    const changeTaskStatus = (todolistId: string, taskId: string, isDone: boolean) => {
        dispatch(changeTaskStatusAC(todolistId, taskId, isDone))
    }

    const addList = (title: string) => {
        dispatch(addTodolistAC(title))
    }
    const removeList = (todolistId: string) => {
        dispatch(removeTodolistAC(todolistId))
    }
    const changeListTitle = (todolistId: string, title: string) => {
        dispatch(changeTodolistTitleAC(todolistId, title))
    }
    const changeFilter = (todolistId: string, filterValue: FilterType) => {
        dispatch(changeTodolistFilterAC(todolistId, filterValue))
    }


    const getTasksByFilter = (filterValue: FilterType, tasks: Array<TaskType>) => {
        switch (filterValue) {
            case "active":
                return tasks.filter(task => !task.isDone)
            case "completed":
                return tasks.filter(task => task.isDone)
            default:
                return tasks
        }
    }


    const TodoLists = todolists.map(list => {

            const tasksForList = getTasksByFilter(list.filter, tasks[list.id])

            return (
                <Grid item>
                    <Paper elevation={6}>
                        <TodoList key={list.id}
                                  id={list.id}
                                  title={list.title}
                                  tasks={tasksForList}
                                  filter={list.filter}
                                  changeFilter={changeFilter}
                                  removeTask={removeTask}
                                  addTask={addTask}
                                  changeStatus={changeTaskStatus}
                                  removeList={removeList}
                                  changeTaskTitle={changeTaskTitle}
                                  changeListTitle={changeListTitle}/>
                    </Paper>
                </Grid>
            )
        }
    )

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" sx={{flexGrow: 1}}>
                        Menu
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: '20px'}}>
                    <Input addItem={addList}/>
                </Grid>
                <Grid container spacing={3}>
                    {TodoLists}
                </Grid>
            </Container>
        </div>
    );
}

export default App;
