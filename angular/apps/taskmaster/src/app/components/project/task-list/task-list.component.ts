import { CommonModule, DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Task } from '../../../models';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskListComponent {
  @Input()
  public tasks: Array<Task> = [
    {
      id: 1,
      name: 'Design wireframe',
      description: 'Setup a wireframe',
      completed: false,
      dueDate: new Date('2023-07-31'),
      project: 1,
    },
    {
      id: 2,
      name: 'Develop frontend',
      description: 'Setup frontend',
      completed: true,
      dueDate: new Date('2023-06-15'),
      project: 1,
    },
    {
      id: 3,
      name: 'Develop backend',
      description: 'Setup backend',
      completed: false,
      dueDate: new Date('2023-07-21'),
      project: 1,
    },
  ];

  public handleCheckbox(id: number) {
    const taskIndex: number = this.tasks.findIndex(
      (task: Task) => task.id === id
    );

    this.tasks[taskIndex].completed = !this.tasks[taskIndex].completed;
  }
}
