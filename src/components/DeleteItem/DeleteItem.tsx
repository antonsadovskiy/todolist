import React, {FC} from 'react';
import DeleteIcon from "@mui/icons-material/Delete";
import {IconButton} from "@mui/material";

type DeleteItemPropsType = {
    deleteItem: () => void
}

const DeleteItem: FC<DeleteItemPropsType> = React.memo((props) => {

    const onClickHandler = () => props.deleteItem()

    return (
        <IconButton onClick={onClickHandler}>
            <DeleteIcon/>
        </IconButton>
    );
});

export default DeleteItem;