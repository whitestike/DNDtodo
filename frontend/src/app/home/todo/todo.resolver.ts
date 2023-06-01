import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable, finalize, first, tap } from "rxjs";
import { AppState } from "src/app/reducers";
import { Todo } from "src/types/todos";
import { TodoActions } from "./action-types";

@Injectable()
export class todoResolver implements Resolve<any>{

    loading = false;

    constructor(
        private store: Store<AppState>
    ){}

    resolve(route: ActivatedRouteSnapshot, 
        state: RouterStateSnapshot
    ): Observable<any> {
        return this.store.pipe(
            tap(() => {
                if(!this.loading){
                    this.loading = true;
                    this.store.dispatch(TodoActions.loadAllTodos());
                }
            }),
            first(),
            finalize(() => this.loading = false)
        )
    }
}