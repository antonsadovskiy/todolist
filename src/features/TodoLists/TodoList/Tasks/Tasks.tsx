import React, { FC } from "react";
import style from "./Tasks.module.scss";
import Task from "../Task/Task";
import TasksPreloader from "../../../../components/TasksPreloader/TasksPreloader";
import EmptyTodolist from "../../../../components/EmptyTodolist/EmptyTodolist";
import { TaskDomainType } from "../../types";
import { Scrollbar } from "react-scrollbars-custom";

type TasksPropsType = {
  tasks: Array<TaskDomainType>;
  isLoading: boolean;
};

const Tasks: FC<TasksPropsType> = (props) => {
  return (
    <ul className={style.tasksContainer}>
      {props.tasks.length > 0 ? (
        props.tasks.length > 4 ? (
          <Scrollbar style={{ height: 200, width: 250 }}>
            {props.tasks.map((task) => (
              <Task key={task.id} task={task} />
            ))}
          </Scrollbar>
        ) : (
          props.tasks.map((task) => <Task key={task.id} task={task} />)
        )
      ) : props.isLoading ? (
        <TasksPreloader />
      ) : (
        <EmptyTodolist />
      )}
    </ul>
  );
};

export default Tasks;
