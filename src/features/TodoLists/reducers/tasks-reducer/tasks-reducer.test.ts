import { v1 } from "uuid";
import {
  addTaskAC,
  removeTaskAC,
  tasksReducer,
  TasksType,
  updateTaskAC,
} from "./tasks-reducer";
import {
  addTodolistAC,
  removeTodolistAC,
  setTodolistsAC,
  TodoListDomainType,
} from "../todolist-reducer/todo-lists-reducer";
import {
  TaskPriority,
  TaskStatus,
  TaskType,
} from "../../../../api/todolistAPI";

let TodolistId1: string;
let TodolistId2: string;
let startState: TasksType;

beforeEach(() => {
  TodolistId1 = v1();
  TodolistId2 = v1();

  startState = {
    [TodolistId1]: [
      {
        id: v1(),
        title: "Angular",
        status: TaskStatus.New,
        description: "",
        addedDate: "",
        deadline: "",
        order: 0,
        priority: TaskPriority.Low,
        startDate: "",
        todoListId: TodolistId1,
        entityStatus: "idle",
      },
      {
        id: v1(),
        title: "TypeScript",
        status: TaskStatus.Completed,
        description: "",
        addedDate: "",
        deadline: "",
        order: 0,
        priority: TaskPriority.Low,
        startDate: "",
        todoListId: TodolistId1,
        entityStatus: "idle",
      },
      {
        id: v1(),
        title: "React",
        status: TaskStatus.New,
        description: "",
        addedDate: "",
        deadline: "",
        order: 0,
        priority: TaskPriority.Low,
        startDate: "",
        todoListId: TodolistId1,
        entityStatus: "idle",
      },
    ],
    [TodolistId2]: [
      {
        id: v1(),
        title: "Get a job",
        status: TaskStatus.New,
        description: "",
        addedDate: "",
        deadline: "",
        order: 0,
        priority: TaskPriority.Low,
        startDate: "",
        todoListId: TodolistId2,
        entityStatus: "idle",
      },
      {
        id: v1(),
        title: "Iphone",
        status: TaskStatus.New,
        description: "",
        addedDate: "",
        deadline: "",
        order: 0,
        priority: TaskPriority.Low,
        startDate: "",
        todoListId: TodolistId2,
        entityStatus: "idle",
      },
      {
        id: v1(),
        title: "Happy parents",
        status: TaskStatus.New,
        description: "",
        addedDate: "",
        deadline: "",
        order: 0,
        priority: TaskPriority.Low,
        startDate: "",
        todoListId: TodolistId2,
        entityStatus: "idle",
      },
    ],
  };
});

test("should add new task to correct todolist", () => {
  const newTask: TaskType = {
    id: v1(),
    title: "new task title",
    status: TaskStatus.New,
    todoListId: "1",
    order: 0,
    startDate: "",
    deadline: "",
    addedDate: "",
    priority: TaskPriority.Later,
    description: "",
  };

  const action = addTaskAC(TodolistId1, newTask);
  const endState = tasksReducer(startState, action);

  expect(endState[TodolistId1].length).toBe(4);
  expect(endState[TodolistId1][0].title).toBe("new task title");
  expect(endState[TodolistId1][0].status).toBe(TaskStatus.New);
});
test("should remove task from correct todolist", () => {
  const taskId = startState[TodolistId1][0].id;

  const action = removeTaskAC(TodolistId1, taskId);
  const endState = tasksReducer(startState, action);

  expect(endState[TodolistId1].length).toBe(2);
  expect(endState[TodolistId1][0].title).toBe("TypeScript");
  expect(endState[TodolistId1][0].status).toBe(TaskStatus.Completed);
});
test("should change task title in correct todolist", () => {
  const taskId = startState[TodolistId2][2].id;
  const newTaskTitle = "Happy life";

  const action = updateTaskAC(TodolistId2, taskId, { title: newTaskTitle });
  const endState = tasksReducer(startState, action);

  expect(endState[TodolistId2].length).toBe(3);
  expect(endState[TodolistId2][2].title).toBe("Happy life");
  expect(endState[TodolistId2][2].status).toBe(TaskStatus.New);
});
test("should change task status in correct todolist", () => {
  const taskId = startState[TodolistId1][2].id;
  const newTaskStatus = TaskStatus.Completed;

  const action = updateTaskAC(TodolistId1, taskId, { status: newTaskStatus });
  const endState = tasksReducer(startState, action);

  expect(endState[TodolistId1].length).toBe(3);
  expect(endState[TodolistId1][2].title).toBe("React");
  expect(endState[TodolistId1][2].status).toBe(newTaskStatus);
});
test("new property with new array should be added when new todolist is added", () => {
  const newTodolist: TodoListDomainType = {
    id: "1",
    title: "new todolist",
    order: 0,
    addedDate: "",
    filter: "all",
    entityStatus: "idle",
  };

  const action = addTodolistAC(newTodolist);
  const endState = tasksReducer(startState, action);

  const keys = Object.keys(endState);
  const newKey = keys.find((k) => k !== TodolistId1 && k !== TodolistId2);
  if (!newKey) {
    throw Error("new key should be added");
  }

  expect(keys.length).toBe(3);
  expect(endState[newKey]).toEqual([]);
});
test("array of tasks-reducer should be deleted from correct todolist", () => {
  const action = removeTodolistAC(TodolistId1);
  const endState = tasksReducer(startState, action);

  const keys = Object.keys(endState);

  expect(keys.length).toBe(1);
  expect(endState[TodolistId1]).not.toBeDefined();
});
test("empty array should be added to tasks-reducer state", () => {
  const action = setTodolistsAC([
    { id: "1", title: "title1", order: 0, addedDate: "0" },
    { id: "2", title: "title1", order: 0, addedDate: "0" },
  ]);
  const endState = tasksReducer({}, action);

  const keys = Object.keys(endState);

  expect(keys.length).toBe(2);
  expect(endState["1"]).toStrictEqual([]);
  expect(endState["2"]).toStrictEqual([]);
});
