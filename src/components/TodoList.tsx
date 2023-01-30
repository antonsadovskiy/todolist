import React, {FC} from "react";
import TasksList from "./TasksList/TasksList";

type TodoListPropsType = {
    title: string,
    tasks: Array<TaskType>,
}

export type TaskType = {
    id: number,
    title: string,
    isDone: boolean,
}

const TodoList: FC<TodoListPropsType> = (props) => {

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <TasksList tasks={props.tasks} />
            <div>
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>
    )
}

export default TodoList