import { Routes } from '@angular/router';

import { App } from '../../enums';
import { MainComponent } from './main.component';

export const MainComponentRoutes: Routes = [
  { path: App.Root, redirectTo: App.Home, pathMatch: 'full' },
  { path: App.Home, component: MainComponent }
];
