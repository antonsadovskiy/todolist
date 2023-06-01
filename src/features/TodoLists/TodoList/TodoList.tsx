import React, { FC, memo } from "react";
import style from "./TodoList.module.css";
import { Input } from "../../../components/Input/Input";
import { EditableSpan } from "../../../components/EditableSpan/EditableSpan";
import {
  TodoListDomainType
} from "../reducers/todolist-reducer/todolists-reducer";
import Buttons from "./Buttons/Buttons";
import DeleteItem from "../../../components/DeleteItem/DeleteItem";
import Task from "./Task/Task";
import { useTodolist } from "./hooks/useTodolist";

type TodoListPropType = {
  todolist: TodoListDomainType;
  demo?: boolean;
};

export const TodoList: FC<TodoListPropType> = memo(
  ({ todolist, demo = false }) => {

    const { id, title, filter } = todolist;
    const {
      tasksForTodolist,
      setAll,
      setActive,
      setCompleted,
      removeTodolistHandler,
      changeTodolistTitleHandler,
      addTaskHandler,
      removeTaskHandler,
      changeTaskTitleHandler,
      changeTaskStatusHandler
    } = useTodolist(demo, id, filter);


    return (
      <div className={style.listContainer}>
        <div className={style.titleContainer}>
          <h3>
            <EditableSpan
              title={title}
              onChangeTitle={changeTodolistTitleHandler}
              disabled={todolist.entityStatus === "loading"}
            />
          </h3>
          <DeleteItem
            deleteItem={removeTodolistHandler}
            disabled={todolist.entityStatus === "loading"}
          />
        </div>
        <Input
          addItem={addTaskHandler}
          disabled={todolist.entityStatus === "loading"}
        />
        <ul className={style.tasksContainer}>
          {tasksForTodolist.map((task) => (
            <Task
              key={task.id}
              task={task}
              removeTask={removeTaskHandler}
              changeTaskStatus={changeTaskStatusHandler}
              changeTaskTitle={changeTaskTitleHandler}
            />
          ))}
        </ul>
        <Buttons
          filter={filter}
          setAll={setAll}
          setActive={setActive}
          setCompleted={setCompleted}
        />
      </div>
    );
  }
);
