import { Routes } from '@angular/router';

import { App } from './enums';

export const AppRoutes: Routes = [
  // { path: '**', component: ErrorComponent }
  {
    path: App.Root,
    loadChildren: () =>
      import('./components').then((m) => m.MainComponentModule),
  },
  {
    path: App.Memories,
    loadChildren: () =>
      import('./pages').then((m) => m.MemoriesPageComponentModule),
  },
  {
    path: App.Art,
    loadChildren: () => import('./pages').then((m) => m.ArtPageComponentModule),
  },
];
