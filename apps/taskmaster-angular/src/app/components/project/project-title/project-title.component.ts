import { ChangeDetectionStrategy, Component } from '@angular/core';


@Component({
  selector: 'app-project-title',
  standalone: true,
  imports: [],
  templateUrl: './project-title.component.html',
  styleUrl: './project-title.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectTitleComponent {}
