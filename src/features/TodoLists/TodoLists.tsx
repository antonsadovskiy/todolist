import React, { FC } from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { TodoList } from "./TodoList/TodoList";
import { Input } from "../../components/Input/Input";
import { Navigate } from "react-router-dom";
import { useTodolists } from "./hooks/useTodolists";

type TodoListsPropsType = { demo?: boolean };

const TodoLists: FC<TodoListsPropsType> = ({ demo = false }) => {

  const { todolists, isLoggedIn, addTodolistHandler } = useTodolists(demo);

  if (!isLoggedIn) return <Navigate to={"/login"} />;

  return (
    <>
      <Grid container style={{ padding: "20px" }}>
        <Input addItem={addTodolistHandler} />
      </Grid>
      <Grid container spacing={6}>
        {todolists.map((list) => (
          <Grid item key={list.id}>
            <Paper elevation={6}>
              <TodoList todolist={list} demo={demo} />
            </Paper>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default TodoLists;