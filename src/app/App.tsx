import React, {FC} from 'react';
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

type AppPropsType = {
    demo?: boolean
}

const App:FC<AppPropsType> = ({demo = false}) => {

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
                <Preloader/>
            </AppBar>
            <Container fixed>
                <TodoLists demo={demo}/>
            </Container>
            <Message/>
        </div>
    );
}

export default App;
