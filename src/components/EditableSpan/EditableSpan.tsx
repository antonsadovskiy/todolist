import React, {ChangeEvent, FC, useState} from 'react';
import {TextField} from "@mui/material";

export type EditableSpanPropsType = {
    title: string
    onChangeTitle: (newTitle: string) => void
}

const EditableSpan:FC<EditableSpanPropsType> = (props) => {

    const [title, setTitle] = useState<string>('')
    const [isEditModeOn, setIsEditModeOn] = useState<boolean>(false)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onDoubleClickHandler = () => {
        setIsEditModeOn(true)
        setTitle(props.title)
    }
    const onBlurHandler = () => {
        setIsEditModeOn(false)
        props.onChangeTitle(title)
    }

    return isEditModeOn
        ? <TextField variant={'standard'} type="text" value={title} onChange={onChangeHandler} onBlur={onBlurHandler} autoFocus/>
        : <span onDoubleClick={onDoubleClickHandler}>{props.title}</span>
};

export default EditableSpan;