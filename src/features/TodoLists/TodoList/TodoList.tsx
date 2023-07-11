import React, { FC, useCallback, useEffect } from "react";
import style from "./TodoList.module.css";
import { Input } from "../../../components/Input/Input";
import { EditableSpan } from "../../../components/EditableSpan/EditableSpan";
import { updateTaskTC } from "../reducers/tasks-reducer/tasks-reducer";
import {
  changeTodolistFilterAC,
  changeTodolistTitleTC,
  deleteTodolistTC,
  FilterType,
  TodoListDomainType,
} from "../reducers/todolist-reducer/todo-lists-reducer";
import { useSelector } from "react-redux";
import { AppStateType, useAppDispatch } from "../../../app/store/store";
import Buttons from "./Buttons/Buttons";
import DeleteItem from "../../../components/DeleteItem/DeleteItem";
import Task from "./Task/Task";
import { TaskDomainType, TaskStatus } from "../../../api/todolistAPI";
import { tasksSagasActions } from "../reducers/tasks-reducer/tasks-sagas";

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
      if (demo) {
        return;
      }
      dispatch(tasksSagasActions.getTasks(id));
    }, []);

    const removeTodolist = useCallback(() => {
      dispatch(deleteTodolistTC(id));
    }, [dispatch, id]);

    const changeTodolistTitle = useCallback(
      (newTitle: string) => {
        dispatch(changeTodolistTitleTC(id, newTitle));
      },
      [dispatch, id]
    );

    const changeTodolistFilter = useCallback(
      (newFilterValue: FilterType) => {
        dispatch(changeTodolistFilterAC(id, newFilterValue));
      },
      [dispatch, id]
    );

    const addTask = useCallback(
      (taskTitle: string) => {
        dispatch(tasksSagasActions.addTask(id, taskTitle));
      },
      [dispatch, id]
    );

    const removeTask = useCallback(
      (taskId: string) => {
        dispatch(tasksSagasActions.deleteTask(id, taskId));
      },
      [dispatch, id]
    );

    const changeTaskTitle = useCallback(
      (taskId: string, newTaskTitle: string) => {
        dispatch(updateTaskTC(id, taskId, { title: newTaskTitle }));
      },
      [dispatch, id]
    );

    const changeTaskStatus = useCallback(
      (taskId: string, newTaskStatus: TaskStatus) => {
        dispatch(updateTaskTC(id, taskId, { status: newTaskStatus }));
      },
      [dispatch, id]
    );

    const setAll = useCallback(
      () => changeTodolistFilter("all"),
      [changeTodolistFilter]
    );
    const setActive = useCallback(
      () => changeTodolistFilter("active"),
      [changeTodolistFilter]
    );
    const setCompleted = useCallback(
      () => changeTodolistFilter("completed"),
      [changeTodolistFilter]
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
              onChangeTitle={changeTodolistTitle}
              disabled={todolist.entityStatus === "loading"}
            />
          </h3>
          <DeleteItem
            deleteItem={removeTodolist}
            disabled={todolist.entityStatus === "loading"}
          />
        </div>
        <Input
          addItem={addTask}
          disabled={todolist.entityStatus === "loading"}
        />
        <ul className={style.tasksContainer}>
          {tasksForTodolist.map((task) => (
            <Task
              key={task.id}
              task={task}
              removeTask={removeTask}
              changeTaskStatus={changeTaskStatus}
              changeTaskTitle={changeTaskTitle}
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
