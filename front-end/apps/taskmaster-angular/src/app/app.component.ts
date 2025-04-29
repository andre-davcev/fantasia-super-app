import { Component } from '@angular/core';
import { ProjectComponent } from './components/project/project.component';

@Component({
  standalone: true,
  imports: [ProjectComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'taskmaster-angular';
}
