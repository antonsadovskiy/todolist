import React, { FC, useCallback, useEffect } from "react";
import style from "./TodoList.module.css";
import { Input } from "../../../components/Input/Input";
import { EditableSpan } from "../../../components/EditableSpan/EditableSpan";
import {
  addTaskTC,
  deleteTaskTC,
  getTasksTC,
  updateTaskTC,
} from "../reducers/tasks-reducer/tasks-reducer";
import {
  changeTodolistTitleTC,
  deleteTodolistTC,
  FilterType,
  todolistActions,
  TodoListDomainType,
} from "../reducers/todolist-reducer/todolists-reducer";
import { useSelector } from "react-redux";
import { AppStateType, useAppDispatch } from "../../../app/store/store";
import Buttons from "./Buttons/Buttons";
import DeleteItem from "../../../components/DeleteItem/DeleteItem";
import Task from "./Task/Task";
import { TaskDomainType, TaskStatus } from "../../../api/todolistAPI";

type TodoListPropType = {
  todolist: TodoListDomainType;
  demo?: boolean;
};

export const TodoList: FC<TodoListPropType> = React.memo(
  ({ todolist, demo = false }) => {
    const dispatch = useAppDispatch();
    const { id, title, filter } = todolist;
    const tasks = useSelector<AppStateType, Array<TaskDomainType>>(
      (state) => state.tasks[id]
    );

    useEffect(() => {
      if (demo) return;
      dispatch(getTasksTC(id));
    }, []);

    const removeTodolistHandler = useCallback(() => {
      dispatch(deleteTodolistTC(id));
    }, [dispatch, id]);

    const changeTodolistTitleHandler = useCallback(
      (newTitle: string) => {
        dispatch(changeTodolistTitleTC(id, newTitle));
      },
      [dispatch, id]
    );

    const changeTodolistFilterHandler = useCallback(
      (newFilterValue: FilterType) => {
        dispatch(
          todolistActions.changeTodolistFilter({
            todolistId: id,
            filter: newFilterValue,
          })
        );
      },
      [dispatch, id]
    );

    const addTaskHandler = useCallback(
      (taskTitle: string) => {
        dispatch(addTaskTC(id, taskTitle));
      },
      [dispatch, id]
    );

    const removeTaskHandler = useCallback(
      (taskId: string) => {
        dispatch(deleteTaskTC(id, taskId));
      },
      [dispatch, id]
    );

    const changeTaskTitleHandler = useCallback(
      (taskId: string, newTaskTitle: string) => {
        dispatch(updateTaskTC(id, taskId, { title: newTaskTitle }));
      },
      [dispatch, id]
    );

    const changeTaskStatusHandler = useCallback(
      (taskId: string, newTaskStatus: TaskStatus) => {
        dispatch(updateTaskTC(id, taskId, { status: newTaskStatus }));
      },
      [dispatch, id]
    );

    const setAll = useCallback(
      () => changeTodolistFilterHandler("all"),
      [changeTodolistFilterHandler]
    );
    const setActive = useCallback(
      () => changeTodolistFilterHandler("active"),
      [changeTodolistFilterHandler]
    );
    const setCompleted = useCallback(
      () => changeTodolistFilterHandler("completed"),
      [changeTodolistFilterHandler]
    );

    const getTasksByFilter = (filter: FilterType) => {
      switch (filter) {
        case "active":
          return tasks.filter((task) => task.status === TaskStatus.New);
        case "completed":
          return tasks.filter((task) => task.status === TaskStatus.Completed);
        default:
          return tasks;
      }
    };
    const tasksForTodolist = getTasksByFilter(filter);

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
