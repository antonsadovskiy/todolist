import { IconButton, TextField } from "@mui/material";
import React, { FC, memo } from "react";
import style from "./Input.module.css";
import { ControlPoint } from "@mui/icons-material";
import { useInput } from "./hooks/useInput";

export type InputPropsType = {
  addItem: (title: string) => void;
  disabled?: boolean;
};

export const Input: FC<InputPropsType> = memo((props) => {

  const {
    title,
    error,
    isButtonDisabled,
    onChangeHandler,
    onKeyPressHandler,
    onClickHandler
  } = useInput(props.addItem);

  return (
    <div>
      <TextField
        label="Enter title"
        variant="outlined"
        value={title}
        disabled={props.disabled}
        onChange={onChangeHandler}
        onKeyDown={onKeyPressHandler}
        error={!!error}
        helperText={error}
      />
      <IconButton
        className={style.addItem}
        disabled={isButtonDisabled}
        onClick={onClickHandler}
        color={"primary"}
      >
        <ControlPoint />
      </IconButton>
    </div>
  );
});
