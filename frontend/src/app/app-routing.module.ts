import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth/auth.guard';
import { todoResolver } from './home/todo/todo.resolver';
import { EffectsModule } from '@ngrx/effects';
import { TodoEffects } from './home/todo/todo.effects';

const routes: Routes = [
  {
    path:"home",
    component: HomeComponent,
    canActivate: [AuthGuard],
    resolve: {
      todos: todoResolver
    }
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full' 
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    EffectsModule.forFeature([TodoEffects]),
  ],
  exports: [RouterModule],
  providers: [
    todoResolver
  ]
})
export class AppRoutingModule { }
