import React, {FC} from 'react';
import style from './TasksList.module.css'
import {TaskType} from "../../../redux/tasks/tasks-reducer";
import Task from "./Task/Task";

type TasksListPropsType = {
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean) => void
    changeTaskTitle: (taskId: string, title: string) => void
}

export const TasksList: FC<TasksListPropsType> = React.memo((props) => {

    const tasks = props.tasks.map(task =>
        <Task key={task.id}
              id={task.id}
              title={task.title}
              isDone={task.isDone}
              removeTask={props.removeTask}
              changeTaskStatus={props.changeTaskStatus}
              changeTaskTitle={props.changeTaskTitle}/>
    )

    return (
        <ul className={style.tasksContainer}>
            {tasks}
        </ul>
    );
});