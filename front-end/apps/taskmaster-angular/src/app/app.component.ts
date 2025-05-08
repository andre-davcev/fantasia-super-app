import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ProjectComponent } from './components/project/project.component';

@Component({
  standalone: true,
  imports: [ProjectComponent, RouterModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'taskmaster-angular';
}
