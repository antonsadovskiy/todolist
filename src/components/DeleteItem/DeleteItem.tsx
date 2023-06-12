import React, { FC, memo } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";

type DeleteItemPropsType = {
  deleteItem: () => void;
  disabled: boolean;
};

const DeleteItem: FC<DeleteItemPropsType> = memo((props) => {
  const onClickHandler = () => props.deleteItem();

  return (
    <IconButton onClick={onClickHandler} disabled={props.disabled}>
      <DeleteIcon />
    </IconButton>
  );
});

export default DeleteItem;