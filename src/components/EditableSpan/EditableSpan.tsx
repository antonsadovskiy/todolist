import React, { FC, memo } from "react";
import TextField from "@mui/material/TextField";
import style from "./EditableSpan.module.css";
import { useEditableSpan } from "./hooks/useEditableSpan";

export type EditableSpanPropsType = {
  title: string;
  onChangeTitle: (newTitle: string) => void;
  disabled: boolean;
};

export const EditableSpan: FC<EditableSpanPropsType> = memo((props) => {

  const {
    title,
    isEditModeOn,
    onChangeHandler,
    onDoubleClickHandler,
    onBlurHandler,
    onKeyDownHandler
  } = useEditableSpan(props.title, props.onChangeTitle);

  const spanStyle = props.disabled ? style.disabledSpan : "";

  return isEditModeOn ? (
    <TextField
      variant={"standard"}
      type="text"
      value={title}
      onChange={onChangeHandler}
      onBlur={onBlurHandler}
      onKeyDown={onKeyDownHandler}
      autoFocus
    />
  ) : (
    <span className={spanStyle} onDoubleClick={onDoubleClickHandler}>
      {props.title}
    </span>
  );
});
