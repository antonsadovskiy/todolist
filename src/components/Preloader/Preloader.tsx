import React from "react";
import LinearProgress from "@mui/material/LinearProgress";
import { useAppSelector } from "../../app/store/store";
import style from "./Preloader.module.scss";
import { selectorStatus } from "../../features/App/selectors";

const Preloader = () => {
  const status = useAppSelector(selectorStatus);

  return (
    <div className={style.progress}>
      {status === "loading" && <LinearProgress />}
    </div>
  );
};

export default Preloader;
