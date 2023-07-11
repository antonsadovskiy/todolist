import React, { FC } from "react";
import style from "./Buttons.module.css";
import Button from "@mui/material/Button";
import { FilterType } from "../../reducers/todolist-reducer/todolists-reducer";

type ButtonsPropsType = {
  filter: FilterType;
  setAll: () => void;
  setActive: () => void;
  setCompleted: () => void;
};

const Buttons: FC<ButtonsPropsType> = React.memo((props) => {
  const setAll = () => props.setAll();
  const setActive = () => props.setActive();
  const setCompleted = () => props.setCompleted();

  return (
    <div className={style.buttonsContainer}>
      <Button
        variant={props.filter === "all" ? "contained" : "outlined"}
        onClick={setAll}
        size={"small"}
      >
        all
      </Button>
      <Button
        variant={props.filter === "active" ? "contained" : "outlined"}
        onClick={setActive}
        size={"small"}
      >
        active
      </Button>
      <Button
        variant={props.filter === "completed" ? "contained" : "outlined"}
        onClick={setCompleted}
        size={"small"}
      >
        completed
      </Button>
    </div>
  );
});

export default Buttons;