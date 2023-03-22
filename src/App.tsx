import React, {useReducer} from 'react';
import './App.css';
import {TodoList} from "./components/TodoList/TodoList";
import {v1} from "uuid";
import {Input} from "./components/Input/Input";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import {
    addTodolistAC, changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer
} from "./state/todolists/todolists-reducer";
import {
    addEmptyTodolistAC,
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC, removeTasksFromTodolistAC,
    tasksReducer
} from "./state/tasks/tasks-reducer";

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

    const TodolistId1 = v1()
    const TodolistId2 = v1()

    const [todolists, dispatchTodolists] = useReducer(todolistsReducer,[
        {id: TodolistId1, title: "What to learn", filter: 'all'},
        {id: TodolistId2, title: "Future plans", filter: 'active'},
    ])
    const [tasks, dispatchTasks] = useReducer(tasksReducer, {
        [TodolistId1]: [
            {id: v1(), title: "Redux", isDone: false},
            {id: v1(), title: "TypeScript", isDone: true},
            {id: v1(), title: "React", isDone: false},
        ],
        [TodolistId2]: [
            {id: v1(), title: "Get a job", isDone: false},
            {id: v1(), title: "become React Developer", isDone: false},
            {id: v1(), title: "Happy parents", isDone: false},
        ]
    })

    const addTask = (todolistId: string, title: string) => {
        dispatchTasks(addTaskAC(todolistId, title))
    }
    const removeTask = (todolistId: string, taskId: string) => {
        dispatchTasks(removeTaskAC(todolistId, taskId))
    }
    const changeTaskTitle = (todolistId: string, taskId: string, title: string) => {
        dispatchTasks(changeTaskTitleAC(todolistId, taskId, title))
    }
    const changeTaskStatus = (todolistId: string, taskId: string, isDone: boolean) => {
        dispatchTasks(changeTaskStatusAC(todolistId, taskId, isDone))
    }

    const addList = (title: string) => {
        const newTodolistId = v1()
        dispatchTodolists(addTodolistAC(newTodolistId, title))
        dispatchTasks(addEmptyTodolistAC(newTodolistId))
    }
    const removeList = (todolistId: string) => {
        dispatchTodolists(removeTodolistAC(todolistId))
        dispatchTasks(removeTasksFromTodolistAC(todolistId))
    }
    const changeListTitle = (todolistId: string, title: string) => {
        dispatchTodolists(changeTodolistTitleAC(todolistId, title))
    }
    const changeFilter = (todolistId: string, filterValue: FilterType) => {
        dispatchTodolists(changeTodolistFilterAC(todolistId, filterValue))
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
