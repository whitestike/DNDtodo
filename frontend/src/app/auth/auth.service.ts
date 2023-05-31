import { HttpClient } from "@angular/common/http";
import { User } from "../../types/users";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { catchError } from 'rxjs/operators';
import { throwError, NEVER } from 'rxjs';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
    providedIn: 'root',
  })
export class AuthService{
    constructor(
        private http: HttpClient,
        private snackBar: MatSnackBar
    ){}

    Login(password: string, email: string): Observable<User>{
        return this.http.post<User>('http://localhost:8000/login', {"password": password, "email": email}).pipe(
            catchError(error => {
                if (!!error.status && error.status === 401) {
                    this.snackBar.open("email or password are wrong", "try again");
                    return NEVER;
                }
                return throwError(error);
            })
        );
    }
}