import React, {FC, useEffect} from 'react';
import './App.css';
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import MenuIcon from '@mui/icons-material/Menu';
import Container from "@mui/material/Container";
import TodoLists from "../features/TodoLists/TodoLists";
import {Message} from "../components/Message/Message";
import Preloader from "../components/Preloader/Preloader";
import {Navigate, Route, Routes} from 'react-router-dom';
import {Login} from "../features/Login/Login";
import {Page404} from "./page404/page404";
import {useAppDispatch, useAppSelector} from "./store/store";
import {logoutTC, meTC} from "../features/Login/reducers/auth-reducer";
import CircularProgress from "@mui/material/CircularProgress";

type AppPropsType = {
    demo?: boolean
}

const App: FC<AppPropsType> = ({demo = false}) => {

    const dispatch = useAppDispatch()
    const isLoggedIn = useAppSelector<boolean>(state => state.auth.isLoggedIn)
    const isInitialized = useAppSelector<boolean>(state => state.app.isInitialized)

    useEffect(() => {
        dispatch(meTC())
    }, [])

    if (!isInitialized) {
        return (
            <div
                style={{position: 'fixed', top: '40%', textAlign: 'center', width: '100%'}}>
                <CircularProgress/>
            </div>
        )
    }

    const logout = () => {
        dispatch(logoutTC())
    }

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
                    {isLoggedIn && <Button variant={'contained'} onClick={logout}>Log out</Button>}
                </Toolbar>
                <Preloader/>
            </AppBar>
            <Container fixed>
                <Routes>
                    <Route path={'*'} element={<Navigate to={'/404_NOT_FOUND'}/>}/>
                    <Route path={'/404_NOT_FOUND'} element={<Page404/>}/>
                    <Route path={'/login'} element={<Login/>}/>
                    <Route path={'/'} element={<TodoLists demo={demo}/>}/>
                </Routes>
            </Container>
            <Message/>
        </div>
    );
}

export default App;