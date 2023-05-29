import { todolistActions, FilterType, TodoListDomainType, todolistsReducer } from "./todolists-reducer";
import { v1 } from "uuid";
import { RequestType } from "../../../../app/app-reducer";
import { TodoListType } from "../../../../api/todolistAPI";

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
  const newTodolist: TodoListType = {
    id: "1",
    title: "new todolist",
    order: 0,
    addedDate: "",
  };
  const action = todolistActions.addTodolist({ todolist: newTodolist });
  const endState = todolistsReducer(startState, action);

  expect(endState.length).toBe(3);
  expect(endState[0].title).toBe("new todolist");
  expect(endState[0].filter).toBe("all");
});

test("correct todolist should be removed", () => {
  const action = todolistActions.removeTodolist({ todolistId: TodolistId1 });
  const endState = todolistsReducer(startState, action);

  expect(endState.length).toBe(1);
  expect(endState[0].id).toBe(TodolistId2);
  expect(endState[0].title).toBe("Travel to Poland");
  expect(endState[0].filter).toBe("completed");
});

test("should change todolist title", () => {
  const newTitle = "Hello";

  const action = todolistActions.changeTodolistTitle({
    todolistId: TodolistId1,
    title: newTitle,
  });
  const endState = todolistsReducer(startState, action);

  expect(endState[0].id).toBe(TodolistId1);
  expect(endState[0].title).toBe("Hello");
  expect(endState[0].filter).toBe("active");
});

test("should change todolist filter value", () => {
  const newFilter: FilterType = "completed";

  const action = todolistActions.changeTodolistFilter({
    todolistId: TodolistId1,
    filter: newFilter,
  });
  const endState = todolistsReducer(startState, action);

  expect(endState.length).toBe(2);
  expect(endState[0].id).toBe(TodolistId1);
  expect(endState[0].title).toBe("What to learn");
  expect(endState[0].filter).toBe(newFilter);
});
test("should change todolist status", () => {
  const newEntityStatus: RequestType = "success";

  const action = todolistActions.setTodolistStatus({
    todolistId: TodolistId1,
    status: newEntityStatus,
  });
  const endState = todolistsReducer(startState, action);

  expect(endState.length).toBe(2);
  expect(endState[0].id).toBe(TodolistId1);
  expect(endState[0].title).toBe("What to learn");
  expect(endState[0].entityStatus).toBe(newEntityStatus);
});