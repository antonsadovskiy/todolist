import { authReducer, setIsLoggedIn } from "./auth-reducer";

let startState: ReturnType<typeof authReducer>;

beforeEach(() => {
  startState = {
    isLoggedIn: false,
  };
});

test("should set isLoggedIn", () => {
  const action = setIsLoggedIn({ isLoggedIn: true });
  const endState = authReducer(startState, action);

  expect(endState.isLoggedIn).toBeTruthy();
});