import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-project-title',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './project-title.component.html',
  styleUrl: './project-title.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectTitleComponent {}
