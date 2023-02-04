import React, {FC, useState} from 'react';
import {DataType} from "../../App";
import TodoList from "./TodoList/TodoList";
import s from './TodoLists.module.css'
import InputList from "./InputList/InputList";

type TodoListsPropsType = {
    data: DataType
}

const TodoLists:FC<TodoListsPropsType> = (props) => {
    debugger
    let [listsForApp, setListsForApp] = useState(props.data.lists)

    const addList = (value: string) => {
        debugger
        let newList = {
            id: new Date().getDate(),
            title: value,
            tasks: []
        }
        setListsForApp([newList, ...listsForApp])
    }

    let lists = listsForApp.map(list =>
        <TodoList key={list.id} title={list.title} tasks={list.tasks} />
    )

    return (
        <div className={s.appContainer}>
            <div>
                <InputList addList={addList}/>
            </div>
            <div className={s.listsContainer}>
                {lists}
            </div>
        </div>
    );
};

export default TodoLists;