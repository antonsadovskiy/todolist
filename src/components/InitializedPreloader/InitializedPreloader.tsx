import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import style from "./InitializedPreloader.module.scss";

const InitializedPreloader = () => {
  return (
    <div className={style.preloader}>
      <CircularProgress />
    </div>
  );
};

export default InitializedPreloader;
