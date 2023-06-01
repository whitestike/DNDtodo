import { Injectable } from "@angular/core";
import { Actions, act, createEffect, ofType } from "@ngrx/effects";
import { TodoActions } from "./action-types";
import { TodoService } from "./todo.service";
import { concatMap, map, tap } from "rxjs";

@Injectable()
export class TodoEffects{

    loadTodos$ = createEffect(() => this.actions$.pipe(
        ofType(TodoActions.loadAllTodos),
        concatMap(action => this.service.GetAllTodos()),
        map(todos => TodoActions.allTodosLoaded({todos}))
    ));


    saveTodo$ = createEffect(() => this.actions$.pipe(
        ofType(TodoActions.todoUpdated),
        concatMap(action => this.service.SaveTodo(action.update.id ,action.update.changes)),
        
    ),
    {dispatch: false}
    );

    constructor(
        private actions$: Actions,
        private service: TodoService
    ){}
}