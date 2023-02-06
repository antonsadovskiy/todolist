import React, {useState} from 'react';
import './App.css';
import {TodoList} from "./components/TodoList/TodoList";

export type FilterType = 'all' | 'active' | 'completed'

export type TasksType = {
    id: number
    title: string
    isDone: boolean
}

const App = () => {

    const todoListTitle: string = "What to learn"
    const [tasks, setTasks] = useState<Array<TasksType>>([
        {id: 1, title: "HTML & CSS", isDone: true},
        {id: 2, title: "React", isDone: true},
        {id: 3, title: "TypeScript", isDone: false},
    ])

    const [filter, setFilter] = useState<FilterType>('all')

    const changeFilter = (filterValue: FilterType) => {
        setFilter(filterValue)
    }

    let filteredTasks: Array<TasksType> = tasks
    if (filter === 'active'){
        filteredTasks = tasks.filter( task => !task.isDone )
    }
    if (filter === 'completed'){
        filteredTasks = tasks.filter( task => task.isDone )
    }

    const removeTask = (id: number) => {
        let newTasks = tasks.filter( task => task.id !== id )
        setTasks(newTasks)
    }

    return (
        <div className="App">
            <TodoList title={todoListTitle}
                      tasks={filteredTasks}
                      changeFilter={changeFilter}
                      removeTask={removeTask}/>
        </div>
    );
}

export default App;
