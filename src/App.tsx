import React, {useState} from 'react';
import './App.css';
import {TodoList} from "./components/TodoList/TodoList";
import {v1} from "uuid";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type FilterType = 'all' | 'active' | 'completed'

const App = () => {

    const todolistTitle: string = "What to do"
    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: "Math", isDone: false},
        {id: v1(), title: "C++", isDone: true},
        {id: v1(), title: "React", isDone: false},
    ])

    const [filter, setFilter] = useState<FilterType>('all')
    const changeFilter = (filterValue: FilterType) => {
        setFilter(filterValue)
    }

    const addTask = (title: string) => {
        const newTask: TaskType = {
            id: v1(),
            title: title,
            isDone: false
        }
        setTasks([newTask, ...tasks])
    }
    const removeTask = (id: string) => {
        const newTasks = tasks.filter( task => task.id !== id )
        setTasks([...newTasks])
    }
    const changeStatus = (id: string, isDone: boolean) => {
        setTasks( tasks.map(task => task.id === id? {...task, isDone: isDone} : task) )
    }

    const getTasksBuFilter = (filter: FilterType):Array<TaskType> => {
        switch (filter){
            case "active":
                return tasks.filter(task => !task.isDone)
            case "completed":
                return tasks.filter(task => task.isDone)
            default:
                return tasks
        }
    }
    const tasksForList = getTasksBuFilter(filter)

    return (
        <div className="App">
            <TodoList title={todolistTitle}
                      tasks={tasksForList}
                      filter={filter}
                      changeFilter={changeFilter}
                      removeTask={removeTask}
                      addTask={addTask}
                      changeStatus={changeStatus}/>
        </div>
    );
}

export default App;
