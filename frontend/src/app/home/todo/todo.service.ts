import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Todo } from "src/types/todos";

@Injectable({
    providedIn: 'root',
  })
export class TodoService{
    constructor(
        private http: HttpClient,
    ){}

    GetAllTodos(): Observable<Todo[]>{
        return this.http.get<Todo[]>('http://localhost:8000/todos');
    }
}