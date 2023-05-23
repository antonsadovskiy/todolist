import React, {FC, useCallback, useEffect} from 'react';
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import {TodoList} from "./TodoList/TodoList";
import {addTodolistTC, getTodolistsTC, TodoListDomainType} from "./reducers/todolist-reducer/todolists-reducer";
import {Input} from "../../components/Input/Input";
import {AppStateType, useAppDispatch, useAppSelector} from "../../app/store/store";
import {useSelector} from "react-redux";
import {Navigate} from 'react-router-dom';

type TodoListsPropsType = { demo?: boolean }

const TodoLists: FC<TodoListsPropsType> = ({demo = false}) => {

    const dispatch = useAppDispatch()
    const todolists = useSelector<AppStateType, Array<TodoListDomainType>>(state => state.todolists)
    const isLoggedIn = useAppSelector<boolean>(state => state.auth.isLoggedIn)

    useEffect(() => {
        if (demo || !isLoggedIn) return
        dispatch(getTodolistsTC())
    }, [dispatch])

    const addTodolist = useCallback((title: string) => {
        dispatch(addTodolistTC(title))
    }, [dispatch])

    if (!isLoggedIn) return <Navigate to={'/login'}/>

    return (
        <>
            <Grid container style={{padding: '20px'}}>
                <Input addItem={addTodolist}/>
            </Grid>
            <Grid container spacing={6}>
                {
                    todolists.map(list =>
                        <Grid item key={list.id}>
                            <Paper elevation={6}>
                                <TodoList todolist={list} demo={demo}/>
                            </Paper>
                        </Grid>)
                }
            </Grid>
        </>
    )

};

export default TodoLists;