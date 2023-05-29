import { v1 } from "uuid";
import {
  tasksActions,
  tasksReducer,
  TasksType,
  UpdateDomainTaskModelType,
} from "./tasks-reducer";
import {
  todolistActions,
  TodoListDomainType,
} from "../todolist-reducer/todolists-reducer";
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

  const action = tasksActions.addTask({
    todolistId: TodolistId1,
    task: newTask,
  });
  const endState = tasksReducer(startState, action);

  expect(endState[TodolistId1].length).toBe(4);
  expect(endState[TodolistId1][0].title).toBe("new task title");
  expect(endState[TodolistId1][0].status).toBe(TaskStatus.New);
});
test("should remove task from correct todolist", () => {
  const taskId = startState[TodolistId1][0].id;

  const action = tasksActions.removeTask({ todolistId: TodolistId1, taskId });
  const endState = tasksReducer(startState, action);

  expect(endState[TodolistId1].length).toBe(2);
  expect(endState[TodolistId1][0].title).toBe("TypeScript");
  expect(endState[TodolistId1][0].status).toBe(TaskStatus.Completed);
});
test("should change task title in correct todolist", () => {
  const taskId = startState[TodolistId2][2].id;
  const newTaskTitle = "Happy life";

  const model: UpdateDomainTaskModelType = {
    title: newTaskTitle,
  };

  const action = tasksActions.updateTask({
    todolistId: TodolistId2,
    taskId,
    model,
  });
  const endState = tasksReducer(startState, action);

  expect(endState[TodolistId2].length).toBe(3);
  expect(endState[TodolistId2][2].title).toBe("Happy life");
  expect(endState[TodolistId2][2].status).toBe(TaskStatus.New);
});
test("should change task status in correct todolist", () => {
  const taskId = startState[TodolistId1][2].id;
  const newTaskStatus = TaskStatus.Completed;

  const model: UpdateDomainTaskModelType = {
    status: newTaskStatus,
  };

  const action = tasksActions.updateTask({
    todolistId: TodolistId1,
    taskId,
    model,
  });
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

  const action = todolistActions.addTodolist({ todolist: newTodolist });
  const endState = tasksReducer(startState, action);

  const keys = Object.keys(endState);
  const newKey = keys.find((k) => k !== TodolistId1 && k !== TodolistId2);
  if (!newKey) {
    throw Error("new key should be added");
  }

  expect(keys.length).toBe(3);
  expect(endState[newKey]).toEqual([]);
});
test("array of tasks-reducers should be deleted from correct todolist", () => {
  const action = todolistActions.removeTodolist({ todolistId: TodolistId1 });
  const endState = tasksReducer(startState, action);

  const keys = Object.keys(endState);

  expect(keys.length).toBe(1);
  expect(endState[TodolistId1]).not.toBeDefined();
});
test("empty array should be added to tasks-reducers state", () => {
  const action = todolistActions.setTodolists({
    todolists: [
      { id: "1", title: "title1", order: 0, addedDate: "0" },
      { id: "2", title: "title1", order: 0, addedDate: "0" },
    ],
  });
  const endState = tasksReducer({}, action);

  const keys = Object.keys(endState);

  expect(keys.length).toBe(2);
  expect(endState["1"]).toStrictEqual([]);
  expect(endState["2"]).toStrictEqual([]);
});