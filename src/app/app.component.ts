import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskFormComponent } from './task-form/task-form.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HttpClientModule, TaskListComponent, TaskFormComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'todolist-frontend';

  onTaskAdded(): void {
    // Cette méthode sera appelée quand une nouvelle tâche est ajoutée
    // Le composant TaskListComponent écoutera cet événement et rechargera les tâches
  }
}