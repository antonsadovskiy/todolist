import React from 'react';
import './App.css';
import TodoList from "./components/TodoList";

const App = () => {
    return (
        <div className="App">
            <TodoList title={"Homework"}/>
            <TodoList title={"Exams"}/>
            <TodoList title={"Work"}/>
        </div>
    );
}

export default App;
