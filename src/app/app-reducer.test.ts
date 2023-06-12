import { appActions, appReducer, RequestType } from "./app-slice";
import { authActions, authThunks } from "../features/Login/reducers/auth-slice";

let startState: ReturnType<typeof appReducer>;

beforeEach(() => {
  startState = {
    status: "idle",
    error: null,
    isInitialized: false,
  };
});

test("should change error value", () => {
  const newError = "something went wrong";

  const action = appActions.setAppError({ error: newError });
  const endState = appReducer(startState, action);

  expect(endState.status).toBe("idle");
  expect(endState.error).toBe(newError);
});

test("should change status value", () => {
  const newStatus: RequestType = "loading";

  const action = appActions.setAppStatus({ status: newStatus });
  const endState = appReducer(startState, action);

  expect(endState.status).toBe("loading");
  expect(endState.error).toBe(null);
});
