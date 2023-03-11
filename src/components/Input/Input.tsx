import {IconButton, TextField} from '@mui/material';
import React, {ChangeEvent, FC, KeyboardEvent, useState} from 'react';
import style from './Input.module.css'
import {ControlPoint} from "@mui/icons-material";

export type InputPropsType = {
    addItem: (title: string) => void
}

export const Input: FC<InputPropsType> = (props) => {

    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<string | null>(null)
    const titleMaxLength: number = 15
    const isUserMessageIsTooLong: boolean = title.length > titleMaxLength
    const isButtonDisabled = title.length > 15 || title.length === 0


    const addItem = () => {
        if (title.trim()) {
            props.addItem(title.trim())
            setTitle('')
        } else {
            setError('Title is required')
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onClickHandler = () => {
        addItem()
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (title.length <= 15 && e.key === 'Enter') {
            addItem()
        }
    }


    return (
        <div className={style.newTaskContainer}>
            <TextField label="Enter title"
                       variant="outlined"
                       value={title}
                       onChange={onChangeHandler}
                       onKeyDown={onKeyPressHandler}
                       error={isUserMessageIsTooLong || !!error}
                       helperText={isUserMessageIsTooLong? 'title is too long' : '' || error}/>
            <IconButton disabled={isButtonDisabled}
                        onClick={onClickHandler}
                        color={'primary'}>
                <ControlPoint/>
            </IconButton>
        </div>
    );
};
