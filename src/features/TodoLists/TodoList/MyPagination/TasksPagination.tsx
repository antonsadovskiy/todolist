import React, { FC } from "react";
import style from "./TasksPagination.module.css";
import Pagination from "@mui/material/Pagination";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

type TasksPaginationPropsType = {
  page: number;
  tasksTotalCount: number;
  pageCount: number;
  changePageCountHandler: (pageCount: number) => void;
  changePageHandler: (page: number) => void;
};

const TasksPagination: FC<TasksPaginationPropsType> = (props) => {
  const changePageCountHandler = (e: any) => {
    props.changePageCountHandler(e.target.value);
  };

  const changePageHandler = (e: any, page: number) => {
    props.changePageHandler(page);
  };

  const pages = Math.ceil(props.tasksTotalCount / props.pageCount);

  return (
    <div className={style.pagination}>
      <Pagination
        size={"small"}
        page={props.page}
        count={pages}
        onChange={changePageHandler}
      />
      <FormControl sx={{ m: 1, minWidth: 50 }} size="small">
        <Select value={props.pageCount} onChange={changePageCountHandler}>
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={7}>7</MenuItem>
          <MenuItem value={4}>4</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

export default TasksPagination;
