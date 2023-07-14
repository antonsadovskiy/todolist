import React, { FC, memo } from "react";
import DeleteIcon from "../../assets/icons/delete-icon";
import clsx from "clsx";
import s from "./DeleteItem.module.scss";

type DeleteItemPropsType = {
  deleteItem: () => void;
  disabled: boolean;
  className?: string;
};

const DeleteItem: FC<DeleteItemPropsType> = memo((props) => {
  const onClickHandler = () => props.deleteItem();

  const classNames = {
    deleteIcon: clsx(
      s.deleteIcon,
      props.disabled && s.disabled,
      props.className
    ),
  };

  return (
    <div className={classNames.deleteIcon} onClick={onClickHandler}>
      <DeleteIcon />
    </div>
  );
});

export default DeleteItem;
