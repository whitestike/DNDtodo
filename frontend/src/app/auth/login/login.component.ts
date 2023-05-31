import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { tap } from 'rxjs';
import { Router } from '@angular/router';
import { AppState } from 'src/app/reducers';
import { Store } from '@ngrx/store';
import { AuthActions } from '../action-types';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent {
  
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private store: Store<AppState>
  ) {}

  loginForm = this.formBuilder.group({
    email: ['rickert.goyvaerts@gmail.com', [Validators.required]],
    password: ['password', [Validators.required]]
  });

  onSubmit(): void {
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;
    if(password != null && password != undefined && email != null && email != undefined){
      this.authService.Login(password, email)
      .pipe(
        tap(user => {
          this.store.dispatch(AuthActions.login({user}));

          this.router.navigateByUrl('/home');
        })
      )
      .subscribe()
    }
  }

}
