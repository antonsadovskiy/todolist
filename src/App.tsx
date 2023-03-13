import React, {useState} from 'react';
import './App.css';
import {TodoList} from "./components/TodoList/TodoList";
import {v1} from "uuid";
import {Input} from "./components/Input/Input";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';

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

    const [todolists, setTodolists] = useState<Array<TodoListType>>([
        {id: TodolistId1, title: "What to learn", filter: 'active'},
        {id: TodolistId2, title: "Travel to Poland", filter: 'completed'},
    ])
    const [tasks, setTasks] = useState<TasksType>({
        [TodolistId1]: [
            {id: v1(), title: "Redux", isDone: false},
            {id: v1(), title: "TypeScript", isDone: true},
            {id: v1(), title: "React", isDone: false},
        ],
        [TodolistId2]: [
            {id: v1(), title: "Get a job", isDone: false},
            {id: v1(), title: "Iphone", isDone: false},
            {id: v1(), title: "Happy parents", isDone: false},
        ]
    })

    const addTask = (todolistId: string, title: string) => {
        const newTask: TaskType = {
            id: v1(),
            title: title,
            isDone: false
        }
        setTasks({...tasks, [todolistId]: [newTask, ...tasks[todolistId]]})

    }
    const removeTask = (todolistId: string, taskId: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].filter(task => task.id !== taskId)})

    }
    const changeTaskTitle = (todolistId: string, taskId: string, title: string) => {
        setTasks({
            ...tasks,
            [todolistId]: tasks[todolistId].map(task => task.id === taskId ? {...task, title: title} : task)
        })
    }
    const changeStatus = (todolistId: string, taskId: string, isDone: boolean) => {
        setTasks({
            ...tasks,
            [todolistId]: tasks[todolistId].map(task => task.id === taskId ? {...task, isDone: isDone} : task)
        })
    }

    const addList = (title: string) => {
        const newTodolist: TodoListType = {
            id: v1(),
            title: title,
            filter: "all"
        }
        setTodolists([newTodolist, ...todolists])
        setTasks({...tasks, [newTodolist.id]: []})
    }
    const removeList = (todolistId: string) => {
        setTodolists(todolists.filter(list => list.id !== todolistId))
        delete tasks[todolistId]
    }
    const changeListTitle = (todolistId: string, title: string) => {
        setTodolists(todolists.map(list => list.id === todolistId ? {...list, title: title} : list))
    }
    const changeFilter = (todolistId: string, filterValue: FilterType) => {
        setTodolists(todolists.map(list => list.id === todolistId ? {...list, filter: filterValue} : list))
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
                                  changeStatus={changeStatus}
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
