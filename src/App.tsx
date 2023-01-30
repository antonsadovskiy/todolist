import React from 'react';
import './App.css';
import TodoList, {TaskType} from "./components/TodoList";

const App = () => {

    const todoListTitle: string = "Homework"

    const todoListTasks: Array<TaskType> = [
        {id: 1, title: "React", isDone: false},
        {id: 2, title: "JS & TS", isDone: true},
        {id: 3, title: "Math", isDone: true},
    ]

    return (
        <div className="App">
            <TodoList title={todoListTitle} tasks={todoListTasks}/>
        </div>
    );
}

export default App;
