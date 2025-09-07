import { Component, inject } from '@angular/core';
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
  private auth: AuthService = inject(AuthService);

  title = 'Taskmaster (Angular)';

  public logout(): void {
    this.auth.logout();
  }
}
