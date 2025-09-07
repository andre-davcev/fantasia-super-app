import { ApplicationRef, DoBootstrap, NgModule, inject } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PreloadAllModules, RouterModule } from '@angular/router';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsRouterPluginModule } from '@ngxs/router-plugin';

import { AppComponent } from './app.component';
import { AppRoutes } from './app.routes';
import { MenuComponent } from './components';

// AoT requires an exported function for factories

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(AppRoutes, { preloadingStrategy: PreloadAllModules }),
    NgxsRouterPluginModule.forRoot(),
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
