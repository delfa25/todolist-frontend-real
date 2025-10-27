import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../services/task.service';
import { Task } from '../models/task.model';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  loading = false;
  error: string | null = null;

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.loading = true;
    this.error = null;
    
    this.taskService.getTasks().subscribe({
      next: (response) => {
        this.tasks = response.data;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Erreur lors du chargement des tâches';
        this.loading = false;
        console.error('Error loading tasks:', error);
      }
    });
  }

  toggleTask(task: Task): void {
    if (task.id) {
      this.taskService.updateTask(task.id, { completed: !task.completed }).subscribe({
        next: (response) => {
          task.completed = response.data.completed;
        },
        error: (error) => {
          console.error('Error updating task:', error);
        }
      });
    }
  }

  deleteTask(task: Task): void {
    if (task.id && confirm('Êtes-vous sûr de vouloir supprimer cette tâche ?')) {
      this.taskService.deleteTask(task.id).subscribe({
        next: () => {
          this.tasks = this.tasks.filter(t => t.id !== task.id);
        },
        error: (error) => {
          console.error('Error deleting task:', error);
        }
      });
    }
  }

  get completedTasks(): Task[] {
    return this.tasks.filter(task => task.completed);
  }

  get pendingTasks(): Task[] {
    return this.tasks.filter(task => !task.completed);
  }
}