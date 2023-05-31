import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent {
  
  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService
  ) {}

  loginForm = this.formBuilder.group({
    email: '',
    password: ''
  });

  onSubmit(): void {
    if(this.loginForm.value.password != null && this.loginForm.value.password != undefined && this.loginForm.value.email != null && this.loginForm.value.email != undefined){
      let user = this.loginService.Login(this.loginForm.value.password, this.loginForm.value.email);
      user.subscribe(user => {
        console.log(user);
      })
    }
  }

}
