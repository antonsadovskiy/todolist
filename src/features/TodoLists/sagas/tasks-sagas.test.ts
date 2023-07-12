import {
  addTask,
  addTaskWorkerSaga,
  deleteTask,
  deleteTaskWorkerSaga,
  getTasks,
  getTasksWorkerSaga,
} from "./tasks-sagas";
import { setAppStatusAC } from "../../../app/app-reducer";
import { call, put } from "redux-saga/effects";
import {
  GetTasksResponseType,
  ResponseType,
  TaskPriority,
  tasksAPI,
  TaskStatus,
  TaskType,
} from "../../../api/todolistAPI";
import { v1 } from "uuid";
import {
  addTaskAC,
  removeTaskAC,
  setTasksAC,
  setTaskStatusAC,
} from "../reducers/tasks-reducer/tasks-reducer";

let task: TaskType;
beforeEach(() => {
  task = {
    id: v1(),
    title: "new title",
    status: TaskStatus.New,
    description: "",
    addedDate: "",
    deadline: "",
    order: 0,
    priority: TaskPriority.Low,
    startDate: "",
    todoListId: "1",
  };
});

test("get tasks success", () => {
  const action: ReturnType<typeof getTasks> = {
    type: "TASKS/GET-TASKS",
    id: "1",
  };
  const gen = getTasksWorkerSaga(action);
  expect(gen.next().value).toEqual(put(setAppStatusAC("loading")));

  expect(gen.next().value).toEqual(call(tasksAPI.getTasks, action.id));

  const fakeAPIResponse: GetTasksResponseType = {
    items: [task],
    error: "",
    totalCount: 1,
  };
  expect(gen.next(fakeAPIResponse).value).toEqual(
    put(setAppStatusAC("success"))
  );

  expect(gen.next().value).toEqual(
    put(setTasksAC(action.id, fakeAPIResponse.items))
  );
});

test("add task success", () => {
  const action: ReturnType<typeof addTask> = {
    type: "TASKS/ADD-TASK",
    id: "1",
    taskTitle: "new title",
  };
  const gen = addTaskWorkerSaga(action);
  expect(gen.next().value).toEqual(put(setAppStatusAC("loading")));

  expect(gen.next().value).toEqual(
    call(tasksAPI.addTask, action.id, action.taskTitle)
  );

  const addTaskResponse: ResponseType<{
    item: TaskType;
  }> = {
    resultCode: 0,
    data: {
      item: task,
    },
    messages: [],
  };

  expect(gen.next(addTaskResponse).value).toEqual(
    put(setAppStatusAC("success"))
  );
  expect(gen.next().value).toEqual(
    put(addTaskAC(action.id, addTaskResponse.data.item))
  );
});

test("delete task success", () => {
  const action: ReturnType<typeof deleteTask> = {
    type: "TASKS/DELETE-TASK",
    todolistId: "1",
    taskId: "1",
  };
  const gen = deleteTaskWorkerSaga(action);
  expect(gen.next().value).toEqual(put(setAppStatusAC("loading")));

  expect(gen.next().value).toEqual(
    put(setTaskStatusAC(action.todolistId, action.taskId, "loading"))
  );

  expect(gen.next().value).toEqual(
    call(tasksAPI.deleteTask, action.todolistId, action.taskId)
  );

  const deleteTaskResponse: ResponseType = {
    resultCode: 0,
    data: {},
    messages: [],
  };

  expect(gen.next(deleteTaskResponse).value).toEqual(
    put(setAppStatusAC("success"))
  );
  expect(gen.next().value).toEqual(
    put(setTaskStatusAC(action.todolistId, action.taskId, "success"))
  );
  expect(gen.next().value).toEqual(
    put(removeTaskAC(action.todolistId, action.taskId))
  );
});
