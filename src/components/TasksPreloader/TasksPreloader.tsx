import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import style from "./TasksPreloader.module.scss";

const TasksPreloader = () => {
  return (
    <div className={style.tasksPreloader}>
      <CircularProgress size={30} />
    </div>
  );
};

export default TasksPreloader;
