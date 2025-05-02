import { AsyncPipe, CommonModule, DatePipe } from '@angular/common';
import { Component } from '@angular/core';

import { Observable } from 'rxjs';
import { Task } from '../../../models';
import { TaskService } from '../../../services';
import { FormType } from '../shared/enums';
import { TaskFormSubmit } from '../task-form';
import { TaskFormComponent } from '../task-form/task-form.component';

const TASK_EMPTY: Task = {
  name: '',
  description: '',
  completed: false,
  project: 0,
  id: 0,
};

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, DatePipe, TaskFormComponent, AsyncPipe],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss',
})
export class TaskListComponent {
  public tasks: Array<Task> = [];
  public tasks$!: Observable<Array<Task>>;
  public showModal: boolean = false;
  public taskSelected: Task = TASK_EMPTY;
  public formType: FormType = FormType.Create;

  constructor(private taskService: TaskService) {
    this.getTasks();
  }

  public handleCheckbox(task: Task): void {
    task.completed = !task.completed;

    this.taskService.update(task).subscribe(() => this.getTasks());
  }

  public getTasks(): void {
    this.tasks$ = this.taskService.getAll();
  }

  public updateTask(task: Task) {
    this.taskSelected = task;
    this.formType = FormType.Update;
    this.showModal = true;
  }

  public deleteTask(id: number): void {
    this.taskService.delete(id).subscribe(() => this.getTasks());
  }

  public handleModalClose(type: TaskFormSubmit): void {
    if (type === TaskFormSubmit.Submit) {
      this.getTasks();
    }

    this.showModal = false;
  }
}
