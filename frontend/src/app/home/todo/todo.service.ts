import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Todo } from "src/types/todos";
import { User } from "src/types/users";

@Injectable({
    providedIn: 'root',
  })
export class TodoService{
    constructor(
        private http: HttpClient,
    ){}

    GetAllTodos(): Observable<Todo[]>{
        const userJson = localStorage.getItem("user");
        let userProfile: User | undefined = undefined;
        if(userJson != null)
        {
            userProfile = JSON.parse(userJson);
        }

        return this.http.get<Todo[]>(`http://localhost:8000/todos/?id=${userProfile?.id}`);
    }

    SaveTodo(id: string | number, changes: Partial<Todo>): Observable<any>{
        const todo = {
            id: id,
            ...changes
        }
        return this.http.put('http://localhost:8000/todo', {todo})
    }

    CreateTodo(todo: Todo): Observable<any>{
        return this.http.post('http://localhost:8000/todo', {todo})
    }
}