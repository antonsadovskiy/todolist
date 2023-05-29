import { todolistActions, TodoListDomainType, todolistsReducer } from "../todolist-reducer/todolists-reducer";
import { tasksReducer, TasksType } from "../tasks-reducer/tasks-reducer";

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

  const action = todolistActions.addTodolist({ todolist: newTodolist });

  const endTasksState = tasksReducer(startTasksState, action);
  const endTodolistsState = todolistsReducer(startTodolistsState, action);

  const keys = Object.keys(endTasksState);
  const idFromTasks = keys[0];
  const idFromTodolists = endTodolistsState[0].id;

  expect(idFromTasks).toBe(action.payload.todolist.id);
  expect(idFromTodolists).toBe(action.payload.todolist.id);
});
