import {useEffect, useState} from "react";
import {tasksAPI} from "../../api/todolistAPI";

export default {
    title: 'API/TASKS'
}

export const GetTasks = () => {
    const [state, setState] = useState<any>()

    useEffect(() => {

        const payload = {todolistId: '3ca09cfe-3f32-49de-8ab0-d364bfc703c5'}

        tasksAPI.getTasks(payload.todolistId)
            .then(res => setState(res.data.items))
    }, [])

    return (
        <div>
            {JSON.stringify(state)}
        </div>
    )
}

export const AddTask = () => {
    const [state, setState] = useState<any>()

    const addTaskHandler = () => {
        const payload = {todolistId: '3ca09cfe-3f32-49de-8ab0-d364bfc703c5', title: 'nnnnn task'}

        tasksAPI.addTask(payload.todolistId, payload.title)
            .then(res => {
                console.log('successfully added')
                setState(res.data.data.item)
            })
    }

    return (
        <div>
            <button onClick={addTaskHandler}>add task</button>
            {JSON.stringify(state)}
        </div>
    )
}

export const RemoveTask = () => {
    const [state, setState] = useState<any>()

    const removeTaskHandler = () => {
        const payload = {
            todolistId: '3ca09cfe-3f32-49de-8ab0-d364bfc703c5',
            taskId: '2959af8c-51f5-49ab-983c-79b6b0f70286'
        }

        tasksAPI.deleteTask(payload.todolistId, payload.taskId)
            .then(res => {
                if (res.data.resultCode === 0) {
                    console.log('successfully deleted')
                    setState(res.data.data)
                }
            })
    }

    return (
        <div>
            <button onClick={removeTaskHandler}>delete task</button>
            {JSON.stringify(state)}
        </div>
    )
}

export const UpdateTaskTitle = () => {
    const [state, setState] = useState<any>()

    const updateTaskHandler = () => {

        const payload = {
            todolistId: '3ca09cfe-3f32-49de-8ab0-d364bfc703c5',
            taskId: '4446b43d-d711-4a62-a35a-cf1810782139',
            title: 'new TITLEEEE'
        }

        tasksAPI.updateTaskTitle(payload.todolistId, payload.taskId, payload.title)
            .then(res => {
                if (res.data.resultCode === 0) {
                    console.log('successfully updated')
                    setState(res.data.data)
                }
            })
    }

    return (
        <div>
            <button onClick={updateTaskHandler}>update task title</button>
            {JSON.stringify(state)}
        </div>
    )
}