import React, {FC} from 'react';
import DeleteIcon from "@mui/icons-material/Delete";
import {IconButton} from "@mui/material";
import {RequestType} from "../../app/store/app-reducer";

type DeleteItemPropsType = {
    deleteItem: () => void
    status?: RequestType
}

const DeleteItem: FC<DeleteItemPropsType> = React.memo((props) => {

    const onClickHandler = () => props.deleteItem()

    return (
        <IconButton onClick={onClickHandler} disabled={props.status === 'loading'}>
            <DeleteIcon/>
        </IconButton>
    );
});

export default DeleteItem;