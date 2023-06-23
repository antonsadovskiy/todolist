import React, { FC } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import TodoLists from "../TodoLists/TodoLists";
import { Message } from "../../components/Message/Message";
import Preloader from "../../components/Preloader/Preloader";
import { Navigate, Route, Routes } from "react-router-dom";
import { Login } from "../Login/Login";
import { Page404 } from "../../components/Page404/Page404";
import InitializedPreloader from "../../components/InitializedPreloader/InitializedPreloader";
import { useApp } from "./hooks/useApp";

type AppPropsType = { demo?: boolean };

const App: FC<AppPropsType> = ({ demo = false }) => {
  const { isLoggedIn, isInitialized, logout } = useApp(demo);

  if (!isInitialized) return <InitializedPreloader />;

  return (
    <div>
      <AppBar position={"static"}>
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Menu
          </Typography>
          {isLoggedIn && (
            <Button variant={"contained"} onClick={logout}>
              Log out
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <Preloader />
      <Container fixed>
        <Routes>
          <Route path={"*"} element={<Navigate to={"/404_NOT_FOUND"} />} />
          <Route path={"/404_NOT_FOUND"} element={<Page404 />} />
          <Route path={"/"} element={<Navigate to={"/lists"} />} />
          <Route path={"/login"} element={<Login />} />
          <Route path={"/lists"} element={<TodoLists demo={demo} />} />
        </Routes>
      </Container>
      <Message />
    </div>
  );
};

export default App;
