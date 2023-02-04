import React, {ChangeEvent, FC, useState} from 'react';
import s from './InputList.module.css'


type InputListPropsType = {
    addList: (value: string) => void
}

const InputList:FC<InputListPropsType> = (props) => {

    let [text, setText] = useState('')

    const onChangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setText(event.currentTarget.value)
    }

    const onClickButtonHandler = () => {
        props.addList(text)
    }


    return (
        <div className={s.input}>
            <input onChange={onChangeInputHandler} value={text}/>
            <button onClick={onClickButtonHandler}>+</button>
        </div>
    );
};

export default InputList;