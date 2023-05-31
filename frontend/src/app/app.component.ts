import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from './reducers';
import { AuthActions } from './auth/action-types';
import { Observable } from 'rxjs';
import { isLoggedIn, isLoggedOut } from './auth/auth.selectors';
import { Router } from '@angular/router';
 
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
    private router: Router
  ){}

  ngOnInit(){
    this.isLoggedIn$ = this.store.pipe(
      select(isLoggedIn)
    )

    this.isLoggedOut$ = this.store.pipe(
      select(isLoggedOut)
    )
  }

  logout(){
    this.router.navigateByUrl("/login");
    this.store.dispatch(AuthActions.logout());
  }
}
