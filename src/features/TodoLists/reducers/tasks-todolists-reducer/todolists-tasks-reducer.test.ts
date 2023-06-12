import {
  TodoListDomainType,
  todolistsReducer,
  todolistsThunks,
} from "../todolist-reducer/todolists-slice";
import { tasksReducer, TasksType } from "../tasks-reducer/tasks-slice";

test("ids should be equals", () => {
  const startTasksState: TasksType = {};
  const startTodolistsState: Array<TodoListDomainType> = [];

  const newTodolist: TodoListDomainType = {
    id: "1",
    title: "new todolist",
    order: 0,
    addedDate: "",
    filter: "all",
    entityStatus: "idle",
  };

  const action = todolistsThunks.addTodolist.fulfilled(
    { todolist: newTodolist },
    "requiredId",
    { title: "new todolist" }
  );

  const endTasksState = tasksReducer(startTasksState, action);
  const endTodolistsState = todolistsReducer(startTodolistsState, action);

  const keys = Object.keys(endTasksState);
  const idFromTasks = keys[0];
  const idFromTodolists = endTodolistsState[0].id;

  expect(idFromTasks).toBe(action.payload.todolist.id);
  expect(idFromTodolists).toBe(action.payload.todolist.id);
});
