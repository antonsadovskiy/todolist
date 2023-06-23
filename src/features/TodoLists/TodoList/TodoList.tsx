import React, { FC, memo } from "react";
import style from "./TodoList.module.css";
import { Input } from "../../../components/Input/Input";
import Buttons from "./Buttons/Buttons";
import { useTodolist } from "./hooks/useTodolist";
import Title from "./Title/Title";
import Tasks from "./Tasks/Tasks";
import TasksPagination from "./MyPagination/TasksPagination";
import { TodoListDomainType } from "../types";

type TodoListPropType = {
  todolist: TodoListDomainType;
  demo?: boolean;
};

export const TodoList: FC<TodoListPropType> = memo(
  ({ todolist, demo = false }) => {
    const { id, title, filter, entityStatus, pageCount, page, totalCount } =
      todolist;
    const {
      tasksForTodolist,
      setFilter,
      changePageCountHandler,
      changePageHandler,
      removeTodolistHandler,
      changeTodolistTitleHandler,
      addTaskHandler,
    } = useTodolist(demo, id, filter, pageCount, page);

    return (
      <div className={style.listContainer}>
        <div>
          <Title
            title={title}
            entityStatus={entityStatus}
            removeTodolistHandler={removeTodolistHandler}
            changeTodolistTitleHandler={changeTodolistTitleHandler}
          />
        </div>
        <Input addItem={addTaskHandler} disabled={entityStatus === "loading"} />
        <Tasks
          tasks={tasksForTodolist}
          isLoading={entityStatus === "loading"}
        />
        <TasksPagination
          page={page}
          pageCount={pageCount}
          tasksTotalCount={totalCount}
          changePageHandler={changePageHandler}
          changePageCountHandler={changePageCountHandler}
        />
        <Buttons filter={filter} setFilter={setFilter} />
      </div>
    );
  }
);
