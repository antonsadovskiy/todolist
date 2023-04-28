import {useEffect, useState} from "react";
import {todolistAPI} from "../../api/todolistAPI";

export default {
    title: 'API/TODOLISTS'
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>()

    useEffect(() => {
        todolistAPI.getTodolists()
            .then(res => {
                setState(res.data)
            })
    }, [])

    return (
        <div>{JSON.stringify(state)}</div>
    )
}

export const AddTodolist = () => {
    const [state, setState] = useState<any>()

    const addTodolistHandler = () => {

        const payload = {title: 'new todolist'}

        todolistAPI.addTodolist(payload.title)
            .then(res => {
                if (res.data.resultCode === 0) {
                    console.log('successfully added')
                    setState(res.data.data.item)
                }
            })
    }

    return (
        <div>
            <button onClick={addTodolistHandler}>add list</button>
            <div>{JSON.stringify(state)}</div>
        </div>
    )
}

export const RemoveTodolist = () => {
    const [state, setState] = useState<any>()

    const removeTodolistHandler = () => {

        const payload = {todolistId: 'c7134632-c2ac-4f68-9140-c3b2a3900c5e'}

        todolistAPI.deleteTodolist(payload.todolistId)
            .then(res => {
                if (res.data.resultCode === 0) {
                    console.log('successfully deleted')
                    setState(res.data.data)
                }
            })
    }

    return (
        <div>
            <button onClick={removeTodolistHandler}>delete list</button>
            <div>{JSON.stringify(state)}</div>
        </div>
    )
}

export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>()

    const updateTodolistHandler = () => {

        const payload = {todolistId: '3ca09cfe-3f32-49de-8ab0-d364bfc703c5', title: 'nwwwww title'}

        todolistAPI.updateTodolist(payload.todolistId, payload.title)
            .then(res => {
                if (res.data.resultCode === 0) {
                    console.log('successfully updated')
                    setState(res.data.data)
                }
            })
    }

    return (
        <div>
            <button onClick={updateTodolistHandler}>update list title</button>
            <div>{JSON.stringify(state)}</div>
        </div>
    )
}