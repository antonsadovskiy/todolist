import {
  addTodolistAC,
  changeTodolistFilterAC,
  changeTodolistTitleAC,
  FilterType,
  removeTodolistAC,
  setTodolistStatusAC,
  TodoListDomainType,
  todoListsReducer,
} from "./todo-lists-reducer";
import { v1 } from "uuid";
import { RequestType } from "../../../../app/app-reducer";

let startState: Array<TodoListDomainType>;
let TodolistId1: string;
let TodolistId2: string;

beforeEach(() => {
  TodolistId1 = v1();
  TodolistId2 = v1();
  startState = [
    {
      id: TodolistId1,
      title: "What to learn",
      filter: "active",
      addedDate: "",
      order: 0,
      entityStatus: "idle",
    },
    {
      id: TodolistId2,
      title: "Travel to Poland",
      filter: "completed",
      addedDate: "",
      order: 0,
      entityStatus: "idle",
    },
  ];
});

test("new todolist should be added", () => {
  const newTodolist: TodoListDomainType = {
    id: "1",
    title: "new todolist",
    order: 0,
    addedDate: "",
    filter: "all",
    entityStatus: "idle",
  };
  const action = addTodolistAC(newTodolist);
  const endState = todoListsReducer(startState, action);

  expect(endState.length).toBe(3);
  expect(endState[0].title).toBe("new todolist");
  expect(endState[0].filter).toBe("all");
});

test("correct todolist should be removed", () => {
  const action = removeTodolistAC(TodolistId1);
  const endState = todoListsReducer(startState, action);

  expect(endState.length).toBe(1);
  expect(endState[0].id).toBe(TodolistId2);
  expect(endState[0].title).toBe("Travel to Poland");
  expect(endState[0].filter).toBe("completed");
});

test("should change todolist title", () => {
  const newTitle = "Hello";

  const action = changeTodolistTitleAC(TodolistId1, newTitle);
  const endState = todoListsReducer(startState, action);

  expect(endState[0].id).toBe(TodolistId1);
  expect(endState[0].title).toBe("Hello");
  expect(endState[0].filter).toBe("active");
});

test("should change todolist filter value", () => {
  const newFilter: FilterType = "completed";

  const action = changeTodolistFilterAC(TodolistId1, newFilter);
  const endState = todoListsReducer(startState, action);

  expect(endState.length).toBe(2);
  expect(endState[0].id).toBe(TodolistId1);
  expect(endState[0].title).toBe("What to learn");
  expect(endState[0].filter).toBe(newFilter);
});
test("should change todolist status", () => {
  const newEntityStatus: RequestType = "success";

  const action = setTodolistStatusAC(TodolistId1, newEntityStatus);
  const endState = todoListsReducer(startState, action);

  expect(endState.length).toBe(2);
  expect(endState[0].id).toBe(TodolistId1);
  expect(endState[0].title).toBe("What to learn");
  expect(endState[0].entityStatus).toBe(newEntityStatus);
});
