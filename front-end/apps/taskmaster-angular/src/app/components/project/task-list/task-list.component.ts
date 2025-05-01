import { CommonModule, DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { Task } from '../../../models';
import { TaskService } from '../../../services';
import { FormType } from '../shared/enums';
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
  imports: [CommonModule, DatePipe, TaskFormComponent],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskListComponent {
  public tasks: Array<Task> = [];
  public showModal: boolean = false;
  public taskSelected: Task = TASK_EMPTY;
  public formType: FormType = FormType.Create;

  constructor(private taskService: TaskService) {
    this.tasks = this.taskService.getAll();
  }

  public handleCheckbox(id: number): void {
    const taskIndex: number = this.tasks.findIndex(
      (task: Task) => task.id === id
    );

    const updated: Task = this.tasks[taskIndex];

    updated.completed = !updated.completed;

    this.tasks = this.taskService.update(updated);
  }

  public updateTask(task: Task) {
    this.taskSelected = task;
    this.formType = FormType.Update;
    this.showModal = true;
  }

  public deleteTask(id: number): void {
    this.tasks = this.taskService.delete(id);
  }
}
