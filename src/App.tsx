import React, {useState} from 'react';
import './App.css';
import {TodoList} from "./components/TodoList/TodoList";
import {v1} from "uuid";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type TodoListType = {
    id: string
    title: string
    filter: FilterType
}

export type FilterType = 'all' | 'active' | 'completed'

const App = () => {

    const TodolistId1 = v1()
    const TodolistId2 = v1()

    const [todolists, setTodolists] = useState<Array<TodoListType>>([
        {id: TodolistId1, title: "What to learn", filter: 'active'},
        {id: TodolistId2, title: "Travel to Poland", filter: 'completed'},
    ])

    const [tasks, setTasks] = useState({
        [TodolistId1]: [
            {id: v1(), title: "Redux", isDone: false},
            {id: v1(), title: "TypeScript", isDone: true},
            {id: v1(), title: "React", isDone: false},
        ],
        [TodolistId2]: [
            {id: v1(), title: "Get a job", isDone: false},
            {id: v1(), title: "Iphone", isDone: false},
            {id: v1(), title: "Happy parents", isDone: false},
        ]
    })

    const changeFilter = (todolistId: string, filterValue: FilterType) => {
        setTodolists(todolists.map(list => list.id === todolistId? {...list, filter: filterValue} : list))
    }
    const addTask = (todolistId: string, title: string) => {
        const newTask: TaskType = {
            id: v1(),
            title: title,
            isDone: false
        }
        setTasks({...tasks, [todolistId]: [newTask, ...tasks[todolistId]]})
    }
    const removeTask = (todolistId: string, taskId: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].filter(task => task.id !== taskId)})
    }
    const changeStatus = (todolistId: string, taskId: string, isDone: boolean) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(task => task.id === taskId? {...task, isDone: isDone} : task)})
    }
    const removeList = (todolistId: string) => {
        setTodolists(todolists.filter(list => list.id !== todolistId))
        delete tasks[todolistId]
    }

    const getTasksBuFilter = (filterValue: FilterType, tasks: Array<TaskType>) => {
        switch (filterValue) {
            case "active":
                return tasks.filter(task => !task.isDone)
            case "completed":
                return tasks.filter(task => task.isDone)
            default:
                return tasks
        }
    }



    const TodoLists = todolists.map(list => {

            const tasksForList = getTasksBuFilter(list.filter, tasks[list.id])

            return (
                <TodoList key={list.id}
                          id={list.id}
                          title={list.title}
                          tasks={tasksForList}
                          filter={list.filter}
                          changeFilter={changeFilter}
                          removeTask={removeTask}
                          addTask={addTask}
                          changeStatus={changeStatus}
                          removeList={removeList}/>
            )
        }
    )

    return (
        <div className="App">
            {TodoLists}
        </div>
    );
}

export default App;
