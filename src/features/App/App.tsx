import React, { FC } from "react";
import TodoLists from "../TodoLists/TodoLists";
import { Message } from "../../components/Message/Message";
import Preloader from "../../components/Preloader/Preloader";
import { Navigate, Route, Routes } from "react-router-dom";
import { Login } from "../Login/Login";
import { Page404 } from "../../components/Page404/Page404";
import InitializedPreloader from "../../components/InitializedPreloader/InitializedPreloader";
import { useApp } from "./hooks/useApp";
import { Header } from "../../components/ui/header";
import s from "./App.module.scss";

type AppPropsType = { demo?: boolean };

const App: FC<AppPropsType> = ({ demo = false }) => {
  const { isLoggedIn, isInitialized, logout } = useApp(demo);

  if (!isInitialized) return <InitializedPreloader />;

  return (
    <div>
      <Header isLoggedIn={isLoggedIn} onLogout={logout} />
      <Preloader />
      <div className={s.container}>
        <Routes>
          <Route path={"*"} element={<Navigate to={"/404_NOT_FOUND"} />} />
          <Route path={"/404_NOT_FOUND"} element={<Page404 />} />
          <Route path={"/"} element={<Navigate to={"/lists"} />} />
          <Route path={"/login"} element={<Login />} />
          <Route path={"/lists"} element={<TodoLists demo={demo} />} />
        </Routes>
      </div>
      <Message />
    </div>
  );
};

export default App;
