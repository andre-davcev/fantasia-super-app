import { Route } from '@angular/router';
import { RegisterComponent } from './components/auth/register/register.component';
import { ProjectComponent } from './components/project/project.component';

export const appRoutes: Route[] = [
  { path: '', component: ProjectComponent },
  { path: 'register', component: RegisterComponent },
];
