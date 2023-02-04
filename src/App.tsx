import React from 'react';
import './App.css';
import {TodoLists} from "./components/TodoLists/TodoLists";

export type DataType = {
    lists: Array<ListType>
}

export type ListType = {
    id: number
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
                id: 1,
                title: "Homework",
                tasks: [
                    {id: 1, title: "React", isDone: false},
                    {id: 2, title: "JS & TS", isDone: false},
                    {id: 3, title: "HTML & CSS", isDone: true},
                ]
            },
            {
                id: 2,
                title: "Exams",
                tasks: [
                    {id: 1, title: "Math", isDone: true},
                    {id: 2, title: "English", isDone: true},
                    {id: 3, title: "Physics", isDone: true},
                ]
            },
            {
                id: 3,
                title: "Work",
                tasks: [
                    {id: 1, title: "add blue button", isDone: true},
                    {id: 2, title: "typification props", isDone: true},
                    {id: 3, title: "create universal button", isDone: true},
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
