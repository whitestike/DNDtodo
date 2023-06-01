import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { AuthActions } from '../action-types';
import { Router } from '@angular/router';
import { AppState } from 'src/app/reducers';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent {
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private store: Store<AppState>
  ) {}

  loginForm = this.formBuilder.group({
    email: ['', [Validators.required]],
    name: ['', [Validators.required]],
    password: ['', [Validators.required]]
  });

  onSubmit(): void {
    const email = this.loginForm.value.email;
    const name = this.loginForm.value.name;
    let password = this.loginForm.value.password;


    if(password != null && password != undefined && email != null && email != undefined && name != null && name != undefined){
      let encryptedPassword = CryptoJS.SHA256(password).toString();
      this.authService.Register(email, encryptedPassword, name)
        .pipe(
          tap(user => {
            this.store.dispatch(AuthActions.login({user}));

            this.router.navigateByUrl('/home');
          })
        )
      .subscribe();
    }
  }
}
