import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../types/users';
 
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  users: User[] | undefined;

  constructor(private http: HttpClient){}

  ngOnInit(){
    this.http.get<User[]>('http://localhost:8000/users').subscribe(users => {
      this.users = users;
    })
  }
}
