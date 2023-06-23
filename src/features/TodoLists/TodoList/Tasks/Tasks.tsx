import React, { FC } from "react";
import style from "./Tasks.module.css";
import Task from "../Task/Task";
import TasksPreloader from "../../../../components/TasksPreloader/TasksPreloader";
import EmptyTodolist from "../../../../components/EmptyTodolist/EmptyTodolist";
import { TaskDomainType } from "../../types";

type TasksPropsType = {
  tasks: Array<TaskDomainType>;
  isLoading: boolean;
};

const Tasks: FC<TasksPropsType> = (props) => {
  return (
    <ul className={style.tasksContainer}>
      {props.tasks.length > 0 ? (
        props.tasks.map((task) => <Task key={task.id} task={task} />)
      ) : props.isLoading ? (
        <TasksPreloader />
      ) : (
        <EmptyTodolist />
      )}
    </ul>
  );
};

export default Tasks;
