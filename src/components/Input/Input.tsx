import {IconButton, TextField} from '@mui/material';
import React, {ChangeEvent, FC, KeyboardEvent, useState} from 'react';
import style from './Input.module.css'
import {ControlPoint} from "@mui/icons-material";

export type InputPropsType = {
    addItem: (title: string) => void
    disabled?: boolean
}

export const Input: FC<InputPropsType> = React.memo((props) => {

    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<string | null>(null)
    const isButtonDisabled = title.length === 0

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
        if (e.key === 'Enter') {
            addItem()
        }
    }


    return (
        <div>
            <TextField label="Enter title"
                       variant="outlined"
                       value={title}
                       disabled={props.disabled}
                       onChange={onChangeHandler}
                       onKeyDown={onKeyPressHandler}
                       error={!!error}
                       helperText={error}/>
            <IconButton className={style.addItem} disabled={isButtonDisabled}
                        onClick={onClickHandler}
                        color={'primary'}>
                <ControlPoint/>
            </IconButton>
        </div>
    );
});
