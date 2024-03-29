import React, { FC, memo } from "react";
import style from "./TodoList.module.scss";
import { Input } from "../../../components/Input/Input";
import Buttons from "./Buttons/Buttons";
import { useTodolist } from "./hooks/useTodolist";
import Title from "./Title/Title";
import Tasks from "./Tasks/Tasks";
import { TodoListDomainType } from "../types";
import { Card } from "../../../components/ui/card";

type TodoListPropsType = {
  todolist: TodoListDomainType;
  demo?: boolean;
};

export const TodoList: FC<TodoListPropsType> = memo(
  ({ todolist, demo = false }) => {
    const { id, title, filter, entityStatus } = todolist;
    const {
      todolistTasks,
      setFilterHandler,
      addTaskHandler,
      removeTodolistHandler,
      changeTodolistTitleHandler,
    } = useTodolist(demo, id, filter);

    return (
      <Card className={style.card}>
        <Title
          title={title}
          entityStatus={entityStatus}
          removeTodolistHandler={removeTodolistHandler}
          changeTodolistTitleHandler={changeTodolistTitleHandler}
        />
        <Input
          addItem={addTaskHandler}
          disabled={entityStatus === "loading"}
          className={style.input}
        />
        <Tasks tasks={todolistTasks} isLoading={entityStatus === "loading"} />
        <Buttons filter={filter} setFilter={setFilterHandler} />
      </Card>
    );
  }
);
