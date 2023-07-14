import React, { FC, memo, useState } from "react";
import style from "./Title.module.scss";
import { EditableSpan } from "../../../../components/EditableSpan/EditableSpan";
import { RequestType } from "../../../App/types";
import DeleteItem from "../../../../components/DeleteItem/DeleteItem";
import { Modal } from "../../../../components/ui/modals";
import { Typography } from "../../../../components/ui/typography";
import { Button } from "../../../../components/ui/button";

type TitlePropsType = {
  title: string;
  entityStatus: RequestType;
  changeTodolistTitleHandler: (newTitle: string) => void;
  removeTodolistHandler: () => void;
};

const Title: FC<TitlePropsType> = memo((props) => {
  const [open, setOpen] = useState(false);
  const openModalHandler = () => setOpen(true);
  const onCloseModalHandler = () => setOpen(false);

  return (
    <div className={style.titleContainer}>
      <EditableSpan
        title={props.title}
        onChangeTitle={props.changeTodolistTitleHandler}
        disabled={props.entityStatus === "loading"}
        variant={"h2"}
      />
      <DeleteItem
        deleteItem={openModalHandler}
        disabled={props.entityStatus === "loading"}
      />
      <Modal
        open={open}
        title={"Delete To do list"}
        onClose={onCloseModalHandler}
        renderCancelButton={() => (
          <Button variant={"secondary"} onClick={onCloseModalHandler}>
            Cancel
          </Button>
        )}
        renderActionButton={() => (
          <Button onClick={props.removeTodolistHandler}>Delete</Button>
        )}
      >
        <Typography>
          You really want to delete <b>{props.title}</b> list? <br />
          All tasks will be deleted
        </Typography>
      </Modal>
    </div>
  );
});

export default Title;
