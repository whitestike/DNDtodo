import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './reducers';
import { AuthActions } from './auth/action-types';
 
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  constructor(
    private store: Store<AppState>
  ){}

  logout(){
    this.store.dispatch(AuthActions.logout());
    console.log("login out");
  }
}
