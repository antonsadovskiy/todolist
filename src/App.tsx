import React, {useCallback, useEffect} from 'react';
import './App.css';
import {TodoList} from "./components/TodoList/TodoList";
import {Input} from "./components/Input/Input";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import {addTodolistTC, getTodolistsTC, TodoListDomainType} from "./redux/todolists/todolists-reducer";
import {useSelector} from "react-redux";
import {AppStateType, useAppDispatch} from "./redux/store/store";

const App = () => {

    const dispatch = useAppDispatch()
    const todolists = useSelector<AppStateType, Array<TodoListDomainType>>(state => state.todolists)

    useEffect(() => {
        dispatch(getTodolistsTC())
    }, [])

    const addList = useCallback((title: string) => {
        dispatch(addTodolistTC(title))
    }, [dispatch])

    const TodoLists = todolists.map(list =>
        <Grid item key={list.id}>
            <Paper elevation={6}>
                <TodoList todolist={list}/>
            </Paper>
        </Grid>
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
                <Grid container spacing={6}>
                    {TodoLists}
                </Grid>
            </Container>
        </div>
    );
}

export default App;
