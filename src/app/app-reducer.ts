export type RequestType = "idle" | "loading" | "error" | "success";

type SetAppStatusAT = ReturnType<typeof setAppStatusAC>;
type SetAppErrorAT = ReturnType<typeof setAppErrorAC>;
type ActionsType = SetAppStatusAT | SetAppErrorAT;

export type AppInitialStateType = {
  status: RequestType;
  error: string | null;
};

export const initialState: AppInitialStateType = {
  status: "idle",
  error: null,
};

export const appReducer = (
  state: AppInitialStateType = initialState,
  action: ActionsType
): AppInitialStateType => {
  switch (action.type) {
    case "SET-STATUS":
      return { ...state, status: action.payload.newStatus };
    case "SET-ERROR":
      return { ...state, error: action.payload.error };
    default:
      return state;
  }
};

export const setAppStatusAC = (newStatus: RequestType) => {
  return {
    type: "SET-STATUS",
    payload: {
      newStatus,
    },
  } as const;
};
export const setAppErrorAC = (error: string | null) => {
  return {
    type: "SET-ERROR",
    payload: {
      error,
    },
  } as const;
};
