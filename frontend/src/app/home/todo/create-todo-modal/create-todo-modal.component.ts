import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Todo } from 'src/types/todos';
import { User } from 'src/types/users';

@Component({
  selector: 'app-create-todo-modal',
  templateUrl: './create-todo-modal.component.html',
  styleUrls: ['./create-todo-modal.component.sass']
})
export class CreateTodoModalComponent {
  user: Partial<User> = {};

  form = new FormGroup({
    description: new FormControl<string>('', [Validators.required]),
    room: new FormControl<string>('', [Validators.required])
  })

  @Input()
  open: boolean = false;

  @Output()
  handleCloseModal = new EventEmitter<boolean>();

  ngOnInit(){
    this.user = JSON.parse(localStorage.getItem("user")!);
  }

  onCancel(){
    this.open = false;
    this.handleCloseModal.emit(false);
  }

  handelSubmit(){
    const {description, room} = this.form.value;
    const todo: Partial<Todo> = {
      description: description!,
      userId: this.user.id,
      done: false,
      room: room!
    }

    this.open = false;
    this.handleCloseModal.emit(false);
  }
}
