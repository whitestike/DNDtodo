import { Component } from '@angular/core';
import { Todo } from 'src/types/todos';
import { Store, select } from '@ngrx/store';
import { AppState } from '../reducers';
import { selectAllTodos } from './todo/todo.selector';
import { TodoActions } from './todo/action-types';
import { Update } from '@ngrx/entity';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent {

  todos: Todo[] = [];
  displayTodos: Todo[] = [];
  showDone: boolean = false;

  createModalIsOpen: boolean = false;

  displayedColumns = ['id', 'description', 'done'];

  constructor(
    private store: Store<AppState>
  ){}

  ngOnInit(){
    const todos$ = this.store.pipe(select(selectAllTodos));

    todos$.subscribe(todos => {
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

  updateSelected(todo: Todo){

    const newTodo: Todo = {
      id: todo.id,
      description: todo.description,
      userId: todo.userId,
      room: todo.room,
      done: !todo.done
    }
    const update: Update<Todo> = {
      id: todo.id,
      changes: newTodo
    }

    this.store.dispatch(TodoActions.todoUpdated({update}));
  }

  openModal(){
    this.createModalIsOpen = true;
  }

  closeModal(event: boolean){
    this.createModalIsOpen = event;
  }
}
