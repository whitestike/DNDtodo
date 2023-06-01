import { EntityState, createEntityAdapter } from "@ngrx/entity";
import { createReducer, on } from "@ngrx/store";
import { Todo } from "src/types/todos";
import { TodoActions } from "../action-types";

export interface TodoState extends EntityState<Todo>{
}

export const adapter = createEntityAdapter<Todo>();

export const initialTodoState = adapter.getInitialState();

export const TodoReducer = createReducer(
    initialTodoState,


    on(TodoActions.allTodosLoaded,
        (state: any, action: any) => adapter.addMany(action.todos, state)),

    on(TodoActions.todoUpdated,
        (state: any, action: any) => adapter.updateOne(action.update, state))
);

export const {selectAll} = adapter.getSelectors();