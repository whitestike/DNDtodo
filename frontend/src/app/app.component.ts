import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from './reducers';
import { AuthActions } from './auth/action-types';
import { Observable } from 'rxjs';
import { isLoggedIn, isLoggedOut } from './auth/auth.selectors';
import { TodoActions } from './home/todo/action-types';
 
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit{
  isLoggedIn$: Observable<boolean> = new Observable<boolean>;

  isLoggedOut$: Observable<boolean> = new Observable<boolean>;

  constructor(
    private store: Store<AppState>,
  ){}

  ngOnInit(){

    const userProfile = localStorage.getItem("user");

    if(userProfile){
      this.store.dispatch(AuthActions.login({user: JSON.parse(userProfile)}));
    }

    this.isLoggedIn$ = this.store.pipe(
      select(isLoggedIn)
    )

    this.isLoggedOut$ = this.store.pipe(
      select(isLoggedOut)
    )
  }

  logout(){
    this.store.dispatch(AuthActions.logout());
    this.store.dispatch(TodoActions.clearTodos());
  }
}
