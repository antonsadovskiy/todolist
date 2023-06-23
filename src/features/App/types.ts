export type AppInitialStateType = {
  isInitialized: boolean;
  status: RequestType;
  error: null | string;
};

export type RequestType = "idle" | "loading" | "error" | "success";
