import { Injectable } from '@angular/core';
import { Task } from '../../models';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private tasks: Array<Task> = [
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

  public getAll(): Array<Task> {
    return this.tasks;
  }

  public create(task: Task): Array<Task> {
    this.tasks.push(task);

    return this.tasks;
  }

  public update(taskNew: Task) {
    const taskIndex: number = this.tasks.findIndex(
      (task: Task) => task.id === taskNew.id
    );

    this.tasks[taskIndex] = taskNew;

    return this.tasks;
  }

  public delete(id: number): Array<Task> {
    const taskIndex: number = this.tasks.findIndex(
      (task: Task) => task.id === id
    );

    this.tasks.splice(taskIndex, 1);

    return this.tasks;
  }
}
