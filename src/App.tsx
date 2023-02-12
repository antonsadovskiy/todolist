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

    let todoListTasks: Array<TaskType> = tasks
    if (filter === 'active'){
        todoListTasks = tasks.filter( task => !task.isDone )
    }
    if (filter === 'completed'){
        todoListTasks = tasks.filter( task => task.isDone )
    }

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
