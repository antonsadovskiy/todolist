import React, { FC, memo } from "react";
import style from "./Title.module.css";
import { EditableSpan } from "../../../../components/EditableSpan/EditableSpan";
import DeleteItem from "../../../../components/DeleteItem/DeleteItem";
import { RequestType } from "../../../../app/app-slice";

type TitlePropsType = {
  title: string;
  entityStatus: RequestType;
  changeTodolistTitleHandler: (newTitle: string) => void;
  removeTodolistHandler: () => void;
};

const Title: FC<TitlePropsType> = memo((props) => {
  return (
    <div className={style.titleContainer}>
      <h3>
        <EditableSpan
          title={props.title}
          onChangeTitle={props.changeTodolistTitleHandler}
          disabled={props.entityStatus === "loading"}
        />
      </h3>
      <DeleteItem
        deleteItem={props.removeTodolistHandler}
        disabled={props.entityStatus === "loading"}
      />
    </div>
  );
});

export default Title;
