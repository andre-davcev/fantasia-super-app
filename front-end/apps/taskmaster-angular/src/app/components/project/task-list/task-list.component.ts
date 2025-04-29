import { CommonModule, DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { Task } from '../../../models';
import { TaskService } from '../../../services';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskListComponent {
  public tasks: Array<Task> = [];

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

  public deleteTask(id: number): void {
    this.tasks = this.taskService.delete(id);
  }
}
