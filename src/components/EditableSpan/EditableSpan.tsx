import React, { FC, memo } from "react";
import style from "./EditableSpan.module.scss";
import { useEditableSpan } from "./hooks/useEditableSpan";
import { Typography, TypographyProps } from "../ui/typography";
import { TextField } from "../ui/text-field";
import clsx from "clsx";

export type EditableSpanPropsType = {
  title: string;
  taskStatus?: string;
  onChangeTitle: (newTitle: string) => void;
  disabled: boolean;
  className?: string;
  editInputWidth?: number;
} & Pick<TypographyProps, "variant">;

export const EditableSpan: FC<EditableSpanPropsType> = memo((props) => {
  const {
    title,
    isEditModeOn,
    onChangeHandler,
    onDoubleClickHandler,
    onBlurHandler,
    onKeyDownHandler,
  } = useEditableSpan(props.title, props.onChangeTitle);

  const classNames = {
    spanStyle: clsx(
      props.disabled ? style.disabledSpan : style.span,
      props.className
    ),
  };

  return isEditModeOn ? (
    <TextField
      value={title}
      onChange={onChangeHandler}
      onBlur={onBlurHandler}
      onKeyDown={onKeyDownHandler}
      autoFocus
      style={{ width: props.editInputWidth }}
    />
  ) : (
    <Typography
      className={classNames.spanStyle}
      onDoubleClick={onDoubleClickHandler}
      style={{ opacity: props.taskStatus }}
      variant={props.variant}
    >
      {props.title}
    </Typography>
  );
});
