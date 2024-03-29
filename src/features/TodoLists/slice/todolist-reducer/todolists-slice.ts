import { appActions } from "../../../App/slice/app-slice";
import { AxiosError } from "axios";
import {
  handlerAppNetworkError,
  handlerAppServerError,
} from "../../../../utils/error-utils";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ClearTasksAndTodolists } from "../../../../common/actions/common-actions";
import { createAppAsyncThunk } from "../../../../common/utils";
import { tasksThunks } from "../tasks-reducer/tasks-slice";
import { todolistAPI } from "../../../../api/todolistsAPI";
import { FilterType, TodoListDomainType, TodoListType } from "../../types";
import { RequestType } from "../../../App/types";
import { ResultCode } from "../../../../api/types";

const initialState: Array<TodoListDomainType> = [];

const slice = createSlice({
  name: "todolists",
  initialState: initialState,
  reducers: {
    changePage(
      state,
      action: PayloadAction<{ todolistId: string; page: number }>
    ) {
      const index = state.findIndex((t) => t.id === action.payload.todolistId);
      if (index !== -1) state[index].page = action.payload.page;
    },
    changePageCount(
      state,
      action: PayloadAction<{ todolistId: string; pageCount: number }>
    ) {
      const index = state.findIndex((t) => t.id === action.payload.todolistId);
      if (index !== -1) state[index].pageCount = action.payload.pageCount;
    },
    changeTodolistFilter(
      state,
      action: PayloadAction<{ todolistId: string; filter: FilterType }>
    ) {
      const index = state.findIndex((t) => t.id === action.payload.todolistId);
      if (index !== -1) state[index].filter = action.payload.filter;
    },
    setTodolistStatus(
      state,
      action: PayloadAction<{ todolistId: string; status: RequestType }>
    ) {
      const index = state.findIndex((t) => t.id === action.payload.todolistId);
      if (index !== -1) state[index].entityStatus = action.payload.status;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTodolists.fulfilled, (state, action) => {
        return action.payload.todolists.map((l) => ({
          ...l,
          filter: "all",
          entityStatus: "idle",
          totalCount: 0,
          pageCount: 4,
          page: 1,
        }));
      })
      .addCase(addTodolist.fulfilled, (state, action) => {
        state.unshift({
          ...action.payload.todolist,
          filter: "all",
          entityStatus: "idle",
          totalCount: 0,
          pageCount: 4,
          page: 1,
        });
      })
      .addCase(deleteTodolist.fulfilled, (state, action) => {
        const index = state.findIndex((t) => t.id === action.payload.id);
        if (index !== -1) state.splice(index, 1);
      })
      .addCase(updateTodolist.fulfilled, (state, action) => {
        const index = state.findIndex((t) => t.id === action.payload.id);
        if (index !== -1) state[index].title = action.payload.newTitle;
      })
      .addCase(ClearTasksAndTodolists.type, () => {
        return [];
      })
      .addCase(tasksThunks.getTasks.fulfilled, (state, action) => {
        const index = state.findIndex(
          (t) => t.id === action.payload.todolistId
        );
        if (index !== -1) state[index].totalCount = action.payload.totalCount;
      });
  },
});

// thunks
const getTodolists = createAppAsyncThunk<
  { todolists: Array<TodoListType> },
  void
>("todolists/get", async (arg, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI;
  dispatch(appActions.setAppStatus({ status: "loading" }));
  try {
    const res = await todolistAPI.getTodolists();
    dispatch(appActions.setAppStatus({ status: "success" }));
    return { todolists: res.data };
  } catch (e) {
    handlerAppNetworkError(dispatch, e as AxiosError);
    return rejectWithValue(e as AxiosError);
  }
});
const addTodolist = createAppAsyncThunk<
  { todolist: TodoListType },
  { title: string }
>("todolists/add", async (arg, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI;
  dispatch(appActions.setAppStatus({ status: "loading" }));
  try {
    const res = await todolistAPI.addTodolist(arg.title);
    if (res.data.resultCode === ResultCode.OK) {
      dispatch(appActions.setAppStatus({ status: "success" }));
      return { todolist: res.data.data.item };
    } else {
      handlerAppServerError(dispatch, res.data);
      return rejectWithValue(null);
    }
  } catch (e) {
    handlerAppNetworkError(dispatch, e as AxiosError);
    return rejectWithValue(null);
  }
});
const deleteTodolist = createAppAsyncThunk<{ id: string }, { id: string }>(
  "todolists/delete",
  async (arg, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI;
    dispatch(appActions.setAppStatus({ status: "loading" }));
    dispatch(
      todolistsActions.setTodolistStatus({
        todolistId: arg.id,
        status: "loading",
      })
    );
    try {
      const res = await todolistAPI.deleteTodolist(arg.id);
      if (res.data.resultCode === ResultCode.OK) {
        dispatch(appActions.setAppStatus({ status: "success" }));
        dispatch(
          todolistsActions.setTodolistStatus({
            todolistId: arg.id,
            status: "success",
          })
        );
        return { id: arg.id };
      } else {
        return rejectWithValue(null);
      }
    } catch (e) {
      handlerAppNetworkError(dispatch, e as AxiosError);
      dispatch(
        todolistsActions.setTodolistStatus({
          todolistId: arg.id,
          status: "error",
        })
      );
      return rejectWithValue(null);
    }
  }
);

const updateTodolist = createAppAsyncThunk<
  { id: string; newTitle: string },
  { id: string; newTitle: string }
>("todolists/update", async (arg, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI;
  dispatch(appActions.setAppStatus({ status: "loading" }));
  dispatch(
    todolistsActions.setTodolistStatus({
      todolistId: arg.id,
      status: "loading",
    })
  );
  try {
    const res = await todolistAPI.updateTodolist(arg.id, arg.newTitle);
    if (res.data.resultCode === ResultCode.OK) {
      dispatch(appActions.setAppStatus({ status: "success" }));
      dispatch(
        todolistsActions.setTodolistStatus({
          todolistId: arg.id,
          status: "success",
        })
      );
      return { id: arg.id, newTitle: arg.newTitle };
    } else {
      handlerAppServerError(dispatch, res.data);
      return rejectWithValue(null);
    }
  } catch (e) {
    handlerAppNetworkError(dispatch, e as AxiosError);
    return rejectWithValue(null);
  }
});

export const todolistsReducer = slice.reducer;
export const todolistsActions = slice.actions;
export const todolistsThunks = {
  getTodolists,
  addTodolist,
  deleteTodolist,
  updateTodolist,
};
