import {
  ResultCode,
  todolistAPI,
  TodoListType,
} from "../../../../api/todolistAPI";
import { Dispatch } from "redux";
import { RequestType, setAppStatus } from "../../../../app/app-reducer";
import { AxiosError } from "axios";
import {
  handlerAppNetworkError,
  handlerAppServerError,
} from "../../../../utils/error-utils";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ClearTasksAndTodolists } from "../../../../common/actions/common-actions";
import { createAppAsyncThunk } from "../../../../common/utils/createAppAsyncThunk";

export type FilterType = "all" | "active" | "completed";
export type TodoListDomainType = TodoListType & {
  filter: FilterType;
  entityStatus: RequestType;
};

const initialState: Array<TodoListDomainType> = [];

const todolistsSlice = createSlice({
  name: "todolists",
  initialState: initialState,
  reducers: {
    setTodolists(
      state,
      action: PayloadAction<{ todolists: Array<TodoListType> }>
    ) {
      return action.payload.todolists.map((l) => ({
        ...l,
        filter: "all",
        entityStatus: "idle",
      }));
    },
    addTodolist(state, action: PayloadAction<{ todolist: TodoListType }>) {
      state.unshift({
        ...action.payload.todolist,
        filter: "all",
        entityStatus: "idle",
      });
    },
    removeTodolist(state, action: PayloadAction<{ todolistId: string }>) {
      const index = state.findIndex((t) => t.id === action.payload.todolistId);
      if (index !== -1) state.splice(index, 1);
    },
    changeTodolistTitle(
      state,
      action: PayloadAction<{ todolistId: string; title: string }>
    ) {
      const index = state.findIndex((t) => t.id === action.payload.todolistId);
      if (index !== -1) state[index].title = action.payload.title;
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
    builder.addCase(ClearTasksAndTodolists.type, () => {
      return [];
    });
  },
});

export const todolistsReducer = todolistsSlice.reducer;
export const todolistActions = todolistsSlice.actions;

// thunks
export const getTodolistsTC = () => (dispatch: Dispatch) => {
  dispatch(setAppStatus({ status: "loading" }));
  todolistAPI
    .getTodolists()
    .then((res) => {
      dispatch(setAppStatus({ status: "success" }));
      dispatch(todolistActions.setTodolists({ todolists: res.data }));
    })
    .catch((e: AxiosError) => {
      handlerAppNetworkError(dispatch, e);
    });
};
export const _getTodolistsTC = createAppAsyncThunk<any, any>(
  "todolists/get",
  async (arg, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI;
    dispatch(setAppStatus({ status: "loading" }));
    try {
      const res = await todolistAPI.getTodolists();
      dispatch(setAppStatus({ status: "success" }));
      return { todolists: res.data };
    } catch (e) {
      handlerAppNetworkError(dispatch, e as AxiosError);
      return rejectWithValue(e as AxiosError);
    }
  }
);
export const addTodolistTC = (title: string) => (dispatch: Dispatch) => {
  dispatch(setAppStatus({ status: "loading" }));
  todolistAPI
    .addTodolist(title)
    .then((res) => {
      if (res.data.resultCode === ResultCode.OK) {
        dispatch(setAppStatus({ status: "success" }));
        dispatch(todolistActions.addTodolist({ todolist: res.data.data.item }));
      } else {
        handlerAppServerError(dispatch, res.data);
      }
    })
    .catch((e: AxiosError) => {
      handlerAppNetworkError(dispatch, e);
    });
};
export const deleteTodolistTC =
  (todolistId: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatus({ status: "loading" }));
    dispatch(
      todolistActions.setTodolistStatus({
        todolistId,
        status: "loading",
      })
    );
    todolistAPI
      .deleteTodolist(todolistId)
      .then((res) => {
        if (res.data.resultCode === ResultCode.OK) {
          dispatch(setAppStatus({ status: "success" }));
          dispatch(
            todolistActions.setTodolistStatus({
              todolistId,
              status: "success",
            })
          );
          dispatch(todolistActions.removeTodolist({ todolistId }));
        }
      })
      .catch((e: AxiosError) => {
        handlerAppNetworkError(dispatch, e);
        dispatch(
          todolistActions.setTodolistStatus({
            todolistId,
            status: "error",
          })
        );
      });
  };
export const changeTodolistTitleTC =
  (todolistId: string, newTitle: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatus({ status: "loading" }));
    todolistAPI
      .updateTodolist(todolistId, newTitle)
      .then((res) => {
        if (res.data.resultCode === ResultCode.OK) {
          dispatch(setAppStatus({ status: "success" }));
          dispatch(
            todolistActions.changeTodolistTitle({
              todolistId,
              title: newTitle,
            })
          );
        } else {
          handlerAppServerError(dispatch, res.data);
        }
      })
      .catch((e: AxiosError) => {
        handlerAppNetworkError(dispatch, e);
      });
  };
