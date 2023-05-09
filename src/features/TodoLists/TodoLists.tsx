import React, {FC, useCallback} from 'react';
import {Grid, Paper} from "@mui/material";
import {TodoList} from "./TodoList/TodoList";
import {addTodolistTC, TodoListDomainType} from "./todolists/todolists-reducer";
import {Input} from "../../components/Input/Input";
import {AppStateType, useAppDispatch} from "../../app/store/store";
import {useSelector} from "react-redux";

const TodoLists: FC = () => {

    const dispatch = useAppDispatch()
    const todolists = useSelector<AppStateType, Array<TodoListDomainType>>(state => state.todolists)

    const addList = useCallback((title: string) => {
        dispatch(addTodolistTC(title))
    }, [dispatch])

    return (
        <>
            <Grid container style={{padding: '20px'}}>
                <Input addItem={addList}/>
            </Grid>
            <Grid container spacing={6}>
                {
                    todolists.map(list =>
                        <Grid item key={list.id}>
                            <Paper elevation={6}>
                                <TodoList todolist={list}/>
                            </Paper>
                        </Grid>)
                }
            </Grid>
        </>
    )

};

export default TodoLists;