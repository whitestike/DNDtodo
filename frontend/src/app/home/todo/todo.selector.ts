import { createFeatureSelector, createSelector } from "@ngrx/store";
import { TodoState } from "./reducers/todo.reducers";
import * as fromTodos from "./reducers/todo.reducers"
import { Todo } from "src/types/todos";

export const selectTodoState = createFeatureSelector<TodoState>("todos");

export const selectAllTodos = createSelector(
    selectTodoState,
    fromTodos.selectAll
)