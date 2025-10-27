import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent {
  @Output() taskAdded = new EventEmitter<void>();
  
  newTaskTitle = '';
  loading = false;
  error: string | null = null;

  constructor(private taskService: TaskService) { }

  onSubmit(): void {
    if (!this.newTaskTitle.trim()) {
      this.error = 'Le titre de la tâche ne peut pas être vide';
      return;
    }

    this.loading = true;
    this.error = null;

    const task = {
      title: this.newTaskTitle.trim(),
      completed: false
    };

    this.taskService.createTask(task).subscribe({
      next: (response) => {
        this.newTaskTitle = '';
        this.loading = false;
        this.taskAdded.emit();
      },
      error: (error) => {
        this.error = 'Erreur lors de la création de la tâche';
        this.loading = false;
        console.error('Error creating task:', error);
      }
    });
  }

  onKeyPress(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.onSubmit();
    }
  }
}