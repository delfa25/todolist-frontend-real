import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'http://localhost:8000/api/tasks';

  constructor(private http: HttpClient) { }

  getTasks(): Observable<{success: boolean, data: Task[]}> {
    return this.http.get<{success: boolean, data: Task[]}>(this.apiUrl);
  }

  getTask(id: number): Observable<{success: boolean, data: Task}> {
    return this.http.get<{success: boolean, data: Task}>(`${this.apiUrl}/${id}`);
  }

  createTask(task: Partial<Task>): Observable<{success: boolean, message: string, data: Task}> {
    return this.http.post<{success: boolean, message: string, data: Task}>(this.apiUrl, task);
  }

  updateTask(id: number, task: Partial<Task>): Observable<{success: boolean, message: string, data: Task}> {
    return this.http.put<{success: boolean, message: string, data: Task}>(`${this.apiUrl}/${id}`, task);
  }

  deleteTask(id: number): Observable<{success: boolean, message: string}> {
    return this.http.delete<{success: boolean, message: string}>(`${this.apiUrl}/${id}`);
  }
}
