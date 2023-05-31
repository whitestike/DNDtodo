import { Component } from '@angular/core';
import { TodoService } from './todo.service';
import { Todo } from 'src/types/todos';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent {

  todos: Todo[] = [];
  displayTodos: Todo[] = [];
  showDone: boolean = false;

  displayedColumns = ['id', 'description', 'done'];

  constructor(
    private todoService: TodoService
  ){}

  ngOnInit(){
    const todoObservable = this.todoService.GetAllTodos();

    todoObservable.subscribe(todos => {
      this.filterTodos(todos);
    });

    
  }

  filterTodos(todos: Todo[]){
    this.todos = todos;
    if(this.showDone){
      this.displayTodos = todos.filter(todo => !todo.done);
    }else{
      this.displayTodos = todos;
    }
  }

  updateAllComplete(){
    this.filterTodos(this.todos);
  }

  updateSelected(id: number){
    this.todos[id - 1].done = !this.todos[id - 1].done

    this.filterTodos(this.todos);
  }
}
