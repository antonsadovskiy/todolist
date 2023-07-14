import React, { FC, memo } from "react";
import style from "./Input.module.scss";
import { useInput } from "./hooks/useInput";
import { TextField } from "../ui/text-field";
import AddIcon from "../../assets/icons/add-icon";
import clsx from "clsx";

export type InputPropsType = {
  addItem: (title: string) => void;
  disabled?: boolean;
  className?: string;
};

export const Input: FC<InputPropsType> = memo((props) => {
  const {
    title,
    error,
    isButtonDisabled,
    onChangeHandler,
    onKeyPressHandler,
    onClickHandler,
  } = useInput(props.addItem);

  const classNames = {
    input: clsx(style.input, props.className),
    addIcon: clsx(style.addItem, isButtonDisabled && style.disabled),
  };

  return (
    <div className={classNames.input}>
      <TextField
        label={"Enter title"}
        value={title}
        disabled={props.disabled}
        onChange={onChangeHandler}
        onKeyDown={onKeyPressHandler}
        errorMessage={error}
      />
      <div className={classNames.addIcon} onClick={onClickHandler}>
        <AddIcon />
      </div>
    </div>
  );
});
