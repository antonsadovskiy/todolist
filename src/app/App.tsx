import React, {useEffect} from 'react';
import './App.css';
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import LinearProgress from "@mui/material/LinearProgress";
import MenuIcon from '@mui/icons-material/Menu';
import Container from "@mui/material/Container";
import {getTodolistsTC} from "../features/TodoLists/todolists/todolists-reducer";
import {useAppDispatch, useAppSelector} from "./store/store";
import TodoLists from "../features/TodoLists/TodoLists";
import {RequestType} from "./store/app-reducer";
import {Message} from "../components/Message/Message";

const App = () => {

    const dispatch = useAppDispatch()
    const status = useAppSelector<RequestType | null>(state => state.app.status)

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
            {status === 'loading' && <LinearProgress />}
            <Container fixed>
                <TodoLists/>
            </Container>
            <Message/>
        </div>
    );
}

export default App;
