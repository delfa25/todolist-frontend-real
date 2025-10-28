import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TaskListComponent } from './task-list.component';
import { TaskService } from '../services/task.service';
import { Task } from '../models/task.model';
import { of, throwError } from 'rxjs';

describe('TaskListComponent', () => {
  let component: TaskListComponent;
  let fixture: ComponentFixture<TaskListComponent>;
  let taskService: jasmine.SpyObj<TaskService>;

  const mockTasks: Task[] = [
    { id: 1, title: 'Test Task 1', completed: false },
    { id: 2, title: 'Test Task 2', completed: true }
  ];

  beforeEach(async () => {
    const taskServiceSpy = jasmine.createSpyObj('TaskService', [
      'getTasks', 'updateTask', 'deleteTask'
    ]);

    // Configurer le mock pour retourner un observable immédiatement
    taskServiceSpy.getTasks.and.returnValue(of({ success: true, data: mockTasks }));

    await TestBed.configureTestingModule({
      imports: [TaskListComponent, HttpClientTestingModule],
      providers: [
        { provide: TaskService, useValue: taskServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TaskListComponent);
    component = fixture.componentInstance;
    taskService = TestBed.inject(TaskService) as jasmine.SpyObj<TaskService>;
    fixture.detectChanges(); // Déclenche ngOnInit et donc l'appel à getTasks
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load tasks on init', () => {
    // Le mock est déjà configuré dans beforeEach
    expect(taskService.getTasks).toHaveBeenCalled();
    expect(component.tasks).toEqual(mockTasks);
    expect(component.loading).toBe(false);
  });

  it('should handle error when loading tasks', () => {
    taskService.getTasks.and.returnValue(throwError(() => new Error('API Error')));
    component.loadTasks(); // Appeler explicitement après avoir configuré l'erreur
    fixture.detectChanges(); // Mettre à jour la vue
    expect(component.error).toBe('Erreur lors du chargement des tâches');
    expect(component.loading).toBe(false);
  });

  it('should toggle task completion', () => {
    const task = { ...mockTasks[0] }; // Cloner la tâche pour ne pas modifier l'originale
    const updatedTask = { ...task, completed: true };
    
    taskService.updateTask.and.returnValue(of({
      success: true,
      message: 'Task updated successfully',
      data: updatedTask
    }));

    component.toggleTask(task);
    fixture.detectChanges();

    expect(taskService.updateTask).toHaveBeenCalledWith(task.id as number, { completed: true });
    expect(task.completed).toBe(true);
  });

  it('should delete task', () => {
    const task = { ...mockTasks[0] }; // Cloner la tâche
    spyOn(window, 'confirm').and.returnValue(true);
    taskService.deleteTask.and.returnValue(of({
      success: true,
      message: 'Task deleted successfully'
    }));

    component.deleteTask(task);
    fixture.detectChanges();

    expect(taskService.deleteTask).toHaveBeenCalledWith(task.id as number);
    expect(component.tasks).not.toContain(task);
  });

  it('should not delete task if not confirmed', () => {
    const task = { ...mockTasks[0] }; // Cloner la tâche
    spyOn(window, 'confirm').and.returnValue(false);

    component.deleteTask(task);
    fixture.detectChanges();

    expect(taskService.deleteTask).not.toHaveBeenCalled();
  });

  it('should filter completed tasks', () => {
    component.tasks = mockTasks;
    fixture.detectChanges(); // Pour que les getters soient appelés avec les bonnes données
    const completedTasks = component.completedTasks;
    
    expect(completedTasks.length).toBe(1);
    expect(completedTasks[0].completed).toBe(true);
  });

  it('should filter pending tasks', () => {
    component.tasks = mockTasks;
    fixture.detectChanges(); // Pour que les getters soient appelés avec les bonnes données
    const pendingTasks = component.pendingTasks;
    
    expect(pendingTasks.length).toBe(1);
    expect(pendingTasks[0].completed).toBe(false);
  });
});
