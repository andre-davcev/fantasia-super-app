import { Route } from '@angular/router';

import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { ProjectComponent } from './components/project/project.component';
import { authGuard } from './guards';

export const appRoutes: Route[] = [
  { path: '', component: ProjectComponent, canActivate: [authGuard] },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
];
