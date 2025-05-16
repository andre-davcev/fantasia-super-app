import { Component } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';

import { AuthService } from './services';

@Component({
  standalone: true,
  imports: [RouterModule, RouterLink],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'Taskmaster (Angular)';

  constructor(public auth: AuthService) {}

  public logout(): void {
    this.auth.logout();
  }
}
