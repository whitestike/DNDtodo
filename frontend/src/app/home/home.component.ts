import { Component } from '@angular/core';
import { TodoService } from './todo.service';
import { Todo } from 'src/types/todos';
import { Observable, tap } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent {

  todos: Todo[] = [];
  displayedColumns: string[] = ['id', 'description', 'done'];

  constructor(
    private todoService: TodoService
  ){}

  ngOnInit(){
    this.todoService.GetAllTodos().subscribe(todos => {
      this.todos = todos;
    });
  }

}
