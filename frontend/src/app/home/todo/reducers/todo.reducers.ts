import { EntityState, createEntityAdapter } from "@ngrx/entity";
import { createReducer, on } from "@ngrx/store";
import { Todo } from "src/types/todos";
import { TodoActions } from "../action-types";
import { AuthActions } from "src/app/auth/action-types";

export interface TodoState extends EntityState<Todo>{
}

export const adapter = createEntityAdapter<Todo>();

export const initialTodoState = adapter.getInitialState();

export const TodoReducer = createReducer(
    initialTodoState,


    on(TodoActions.allTodosLoaded,
        (state: any, action: any) => adapter.addMany(action.todos, state)),
    on(TodoActions.todoUpdated,
        (state: any, action: any) => adapter.updateOne(action.update, state)),
    on(TodoActions.clearTodos, 
        (state: any, action: any) => adapter.removeAll(state)),
    on(TodoActions.createTodos, 
        (state: any, action: any) => adapter.addOne(action.create, state))
);

export const {selectAll} = adapter.getSelectors();