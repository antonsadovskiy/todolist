import React, {ChangeEvent, KeyboardEvent, FC, useState} from 'react';
import {TextField} from "@mui/material";

export type EditableSpanPropsType = {
    title: string
    onChangeTitle: (newTitle: string) => void
}

const EditableSpan:FC<EditableSpanPropsType> = (props) => {

    const [title, setTitle] = useState<string>('')
    const [isEditModeOn, setIsEditModeOn] = useState<boolean>(false)


    const completeChanges = () => {
        props.onChangeTitle(title)
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onDoubleClickHandler = () => {
        setIsEditModeOn(true)
        setTitle(props.title)
    }
    const onBlurHandler = () => {
        setIsEditModeOn(false)
        completeChanges()
    }
    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter'){
            completeChanges()
            setIsEditModeOn(false)
        }
    }

    return isEditModeOn
        ? <TextField variant={'standard'}
                     type="text"
                     value={title}
                     onChange={onChangeHandler}
                     onBlur={onBlurHandler}
                     onKeyDown={onKeyDownHandler}
                     autoFocus/>
        : <span onDoubleClick={onDoubleClickHandler}>{props.title}</span>
};

export default EditableSpan;