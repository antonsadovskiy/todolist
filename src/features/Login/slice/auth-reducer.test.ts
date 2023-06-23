import { authActions, authReducer } from "./auth-slice";

let startState: ReturnType<typeof authReducer>;

beforeEach(() => {
  startState = {
    isLoggedIn: false,
  };
});

test("should set isLoggedIn", () => {
  const action = authActions.setIsLoggedIn({ isLoggedIn: true });
  const endState = authReducer(startState, action);

  expect(endState.isLoggedIn).toBeTruthy();
});
