import React from 'react';
import './App.css';
import {TodoList} from "./components/TodoList/TodoList";

export type TasksType = {
    id: number
    title: string
    isDone: boolean
}

const App = () => {

    const todoListTitle: string = "What to learn"
    const todoListTasks: Array<TasksType> = [
        {id: 1, title: "HTML & CSS", isDone: true},
        {id: 2, title: "React", isDone: true},
        {id: 3, title: "TypeScript", isDone: false},
    ]

    return (
        <div className="App">
            <TodoList title={todoListTitle} tasks={todoListTasks}/>
        </div>
    );
}

export default App;
