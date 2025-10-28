import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TaskFormComponent } from './task-form.component';
import { TaskService } from '../services/task.service';
import { of, throwError } from 'rxjs';

describe('TaskFormComponent', () => {
  let component: TaskFormComponent;
  let fixture: ComponentFixture<TaskFormComponent>;
  let taskService: jasmine.SpyObj<TaskService>;

  beforeEach(async () => {
    const taskServiceSpy = jasmine.createSpyObj('TaskService', ['createTask']);

    // Configurer le mock pour retourner un observable immédiatement
    taskServiceSpy.createTask.and.returnValue(of({
      success: true,
      message: 'Task created successfully',
      data: { id: 1, title: 'New Task', completed: false }
    }));

    await TestBed.configureTestingModule({
      imports: [TaskFormComponent, HttpClientTestingModule],
      providers: [
        { provide: TaskService, useValue: taskServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TaskFormComponent);
    component = fixture.componentInstance;
    taskService = TestBed.inject(TaskService) as jasmine.SpyObj<TaskService>;
    fixture.detectChanges(); // Déclenche ngOnInit s'il y en a un
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create task successfully', () => {
    const taskData = { title: 'New Task', completed: false };
    
    spyOn(component.taskAdded, 'emit');
    component.newTaskTitle = 'New Task';
    component.onSubmit();
    fixture.detectChanges();

    expect(taskService.createTask).toHaveBeenCalledWith(taskData);
    expect(component.newTaskTitle).toBe('');
    expect(component.loading).toBe(false);
    expect(component.taskAdded.emit).toHaveBeenCalled();
  });

  it('should handle error when creating task', () => {
    taskService.createTask.and.returnValue(throwError(() => new Error('API Error')));
    
    component.newTaskTitle = 'New Task';
    component.onSubmit();
    fixture.detectChanges();

    expect(component.error).toBe('Erreur lors de la création de la tâche');
    expect(component.loading).toBe(false);
  });

  it('should not submit empty task', () => {
    component.newTaskTitle = '';
    component.onSubmit();
    fixture.detectChanges();

    expect(component.error).toBe('Le titre de la tâche ne peut pas être vide');
    expect(taskService.createTask).not.toHaveBeenCalled();
  });

  it('should not submit task with only whitespace', () => {
    component.newTaskTitle = '   ';
    component.onSubmit();
    fixture.detectChanges();

    expect(component.error).toBe('Le titre de la tâche ne peut pas être vide');
    expect(taskService.createTask).not.toHaveBeenCalled();
  });

  it('should submit on Enter key press', () => {
    const taskData = { title: 'New Task', completed: false };
    taskService.createTask.and.returnValue(of({
      success: true,
      message: 'Task created successfully',
      data: { id: 1, ...taskData }
    }));

    component.newTaskTitle = 'New Task';
    const event = new KeyboardEvent('keypress', { key: 'Enter' });
    component.onKeyPress(event);
    fixture.detectChanges();

    expect(taskService.createTask).toHaveBeenCalledWith(taskData);
  });

  it('should not submit on other key press', () => {
    component.newTaskTitle = 'New Task';
    const event = new KeyboardEvent('keypress', { key: 'Space' });
    component.onKeyPress(event);
    fixture.detectChanges();

    expect(taskService.createTask).not.toHaveBeenCalled();
  });
});
