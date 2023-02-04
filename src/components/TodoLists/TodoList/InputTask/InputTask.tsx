import React, {ChangeEvent, FC, useState} from 'react';
import s from './InputTask.module.css'

type InputTaskPropsType = {
    addTask: (value: string) => void
}

export const InputTask:FC<InputTaskPropsType> = (props) => {

    let [text, setText] = useState('')

    const onChangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setText(event.currentTarget.value)
    }

    const onClickButtonHandler = () => {
        props.addTask(text)
        setText('')
    }


    return (
        <div className={s.input}>
            <input onChange={onChangeInputHandler} value={text}/>
            <button onClick={onClickButtonHandler}>+</button>
        </div>
    );
};