import React, {useState} from 'react';
import './App.css';
import {v1} from "uuid";
import {TodoList} from "./components/TodoList/TodoList";

export type FilterType = 'all' | 'active' | 'completed'

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

const App = () => {

    const todoListTitle: string = "What to learn"
    const [tasks, setTasks] = useState<Array<TaskType>>([
        { id: v1(), title: "Math", isDone: true },
        { id: v1(), title: "English", isDone: true },
        { id: v1(), title: "OOP", isDone: false },
    ])

    const [filter, setFilter] = useState<FilterType>('all')

    const changeFilter = (filterValue: FilterType) => {
        setFilter(filterValue)
    }

    const getFilteredTasks = (tasks: Array<TaskType>, filter: FilterType):Array<TaskType> => {
        switch (filter) {
            case "active":
                return tasks.filter( task => !task.isDone )
            case "completed":
                return tasks.filter( task => task.isDone )
            default:
                return tasks
        }
    }
    const todoListTasks = getFilteredTasks(tasks, filter)

    const removeTask = (id: string) => {
        let newTasks = tasks.filter( task => task.id !== id )
        setTasks(newTasks)
    }

    const addTask = (title: string) => {
        const newTask = {
            id: v1(),
            title: title,
            isDone: false,
        }
        setTasks([newTask,...tasks])
    }

    return (
        <div className="App">
            <TodoList title={todoListTitle}
                      tasks={todoListTasks}
                      changeFilter={changeFilter}
                      removeTask={removeTask}
                      addTask={addTask}/>
        </div>
    );
}

export default App;
