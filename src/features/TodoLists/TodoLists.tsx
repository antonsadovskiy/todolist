import React, { FC } from "react";
import { TodoList } from "./TodoList/TodoList";
import { Input } from "../../components/Input/Input";
import { Navigate } from "react-router-dom";
import { useTodoLists } from "./hooks/useTodolists";
import s from "./TodoLists.module.scss";

type TodoListsPropsType = { demo?: boolean };

const TodoLists: FC<TodoListsPropsType> = ({ demo = false }) => {
  const { todoLists, isLoggedIn, addTodolistHandler } = useTodoLists(demo);

  if (!isLoggedIn) return <Navigate to={"/login"} />;
  return (
    <div className={s.todoListsPage}>
      <div className={s.input}>
        <Input addItem={addTodolistHandler} />
      </div>
      <div className={s.todoLists}>
        {todoLists.map((list) => (
          <TodoList todolist={list} demo={demo} />
        ))}
      </div>
    </div>
  );
};

export default TodoLists;
