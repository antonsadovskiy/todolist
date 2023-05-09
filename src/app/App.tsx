import React, {useEffect} from 'react';
import './App.css';
import {AppBar, Button, Container, IconButton, Toolbar, Typography} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import {getTodolistsTC} from "../features/TodoLists/todolists/todolists-reducer";
import {useAppDispatch} from "./store/store";
import TodoLists from "../features/TodoLists/TodoLists";

const App = () => {

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getTodolistsTC())
    }, [dispatch])

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
                <TodoLists/>
            </Container>
        </div>
    );
}

export default App;
