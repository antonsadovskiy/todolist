import React from 'react';
import './App.css';
import TodoLists from "./components/TodoLists/TodoLists";

export type DataType = {
    lists: Array<ListType>
}

export type ListType = {
    title: string
    tasks: Array<TaskType>
}

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

const App = () => {

    const data = {
        lists: [
            {
                title: "Homework",
                tasks: [
                    {id: 1, title: "React", isDone: false},
                    {id: 2, title: "JS & TS", isDone: true},
                    {id: 3, title: "Math", isDone: true},
                ]
            },
            {
                title: "Exams",
                tasks: [
                    {id: 1, title: "React", isDone: false},
                    {id: 2, title: "JS & TS", isDone: true},
                    {id: 3, title: "Math", isDone: true},
                ]
            },
            {
                title: "Work",
                tasks: [
                    {id: 1, title: "React", isDone: false},
                    {id: 2, title: "JS & TS", isDone: true},
                    {id: 3, title: "Math", isDone: true},
                ]
            },

        ]
    }

    return (
        <div className="App">
            <TodoLists data={data}/>
        </div>
    );
}

export default App;
