import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import style from "./TasksPreloader.module.css";

const TasksPreloader = () => {
  return (
    <div className={style.tasksPreloader}>
      <CircularProgress size={30} />
    </div>
  );
};

export default TasksPreloader;
