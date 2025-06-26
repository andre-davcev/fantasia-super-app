import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';
import { ProjectTitleComponent } from './project-title/project-title.component';
import { TaskListComponent } from './task-list/task-list.component';

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [
    CommonModule,
    ProjectTitleComponent,
    TaskListComponent,
    ProgressBarComponent,
  ],
  templateUrl: './project.component.html',
  styleUrl: './project.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectComponent {
  public completed: number = 0;

  public completedChanged(completed: number): void {
    this.completed = completed;
  }
}
