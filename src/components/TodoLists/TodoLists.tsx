import React, {FC} from 'react';
import {DataType} from "../../App";
import TodoList from "./TodoList/TodoList";
import s from './TodoLists.module.css'

type TodoListsPropsType = {
    data: DataType;
}

const TodoLists:FC<TodoListsPropsType> = (props) => {

    let lists = props.data.lists.map((list,index) =>
        <TodoList title={list.title} tasks={list.tasks}/>
    )

    return (
        <div className={s.listsWrapper}>
            {lists}
        </div>
    );
};

export default TodoLists;