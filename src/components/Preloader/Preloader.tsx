import React from "react";
import LinearProgress from "@mui/material/LinearProgress";
import { useAppSelector } from "../../app/store/store";
import { RequestType } from "../../app/app-slice";
import style from "./Preloader.module.css";

const Preloader = () => {
  const status = useAppSelector<RequestType>((state) => state.app.status);

  return (
    <div className={style.progress}>
      {status === "loading" && <LinearProgress />}
    </div>
  );
};

export default Preloader;