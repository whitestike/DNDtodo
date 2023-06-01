import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { tap } from 'rxjs';
import { Router } from '@angular/router';
import { AppState } from 'src/app/reducers';
import { Store } from '@ngrx/store';
import { AuthActions } from '../action-types';
import * as CryptoJS from 'crypto-js';

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
    email: ['', [Validators.required]],
    password: ['', [Validators.required]]
  });

  onSubmit(): void {
    const email = this.loginForm.value.email;
    let password = this.loginForm.value.password;
    
    if(password != null && password != undefined && email != null && email != undefined){
      let encryptedPassword = CryptoJS.SHA256(password).toString();
      this.authService.Login(encryptedPassword, email)
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
