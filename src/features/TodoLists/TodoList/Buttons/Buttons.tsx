import React, { FC, memo } from "react";
import style from "./Buttons.module.css";
import Button from "@mui/material/Button";
import { FilterType } from "../../types";

type ButtonsPropsType = {
  filter: FilterType;
  setFilter: (filterValue: FilterType) => void;
};

const Buttons: FC<ButtonsPropsType> = memo((props) => {
  const setFilter = (filterValue: FilterType) => props.setFilter(filterValue);

  const renderButton = (filterValue: FilterType) => {
    return (
      <Button
        variant={props.filter === filterValue ? "contained" : "outlined"}
        onClick={() => setFilter(filterValue)}
        size={"small"}
      >
        {filterValue}
      </Button>
    );
  };

  return (
    <div className={style.buttonsContainer}>
      {renderButton("all")}
      {renderButton("active")}
      {renderButton("completed")}
    </div>
  );
});

export default Buttons;
