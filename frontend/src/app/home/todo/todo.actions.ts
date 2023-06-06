import { Update } from "@ngrx/entity";
import { createAction, props } from "@ngrx/store";
import { Todo } from "src/types/todos";

export const loadAllTodos = createAction(
    "[Todos Resolver] Load All Todos"
)

export const allTodosLoaded = createAction(
    "[Load Todos Effect] All Todos have been Loaded",
    props<{todos: Todo[]}>()
)

export const todoUpdated = createAction(
    "[Home Screen] updated a todo",
    props<{update: Update<Todo>}>()
)

export const clearTodos = createAction(
    "[Header Logout Button] clear the todos",
)