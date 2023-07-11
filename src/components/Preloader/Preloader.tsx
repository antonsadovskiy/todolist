import React from "react";
import LinearProgress from "@mui/material/LinearProgress";
import { useAppSelector } from "../../app/store/store";
import { RequestType } from "../../app/app-reducer";
import style from "./Preloader.module.css";

const Preloader = () => {
  const status = useAppSelector<RequestType | null>(
    (state) => state.app.status
  );

  return (
    <div className={style.progress}>
      {status === "loading" && <LinearProgress />}
      {/*<LinearProgress/>*/}
    </div>
  );
};

export default Preloader;