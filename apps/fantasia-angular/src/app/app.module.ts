import { ApplicationRef, DoBootstrap, NgModule, inject } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PreloadAllModules, RouterModule } from '@angular/router';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';

import { AppComponent } from './app.component';
import { AppRoutes } from './app.routes';
import { MenuComponent } from './components';

// AoT requires an exported function for factories

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(AppRoutes, { preloadingStrategy: PreloadAllModules }),
    NgxsReduxDevtoolsPluginModule.forRoot(),

    MenuComponent,
    AppComponent,
  ],
})
export class AppComponentModule implements DoBootstrap {
  private applicationRef = inject(ApplicationRef);

  public ngDoBootstrap(): void {
    this.applicationRef.bootstrap(AppComponent);
  }
}
