import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ApplicationRef, DoBootstrap, NgModule, inject } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PreloadAllModules, RouterModule } from '@angular/router';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsRouterPluginModule } from '@ngxs/router-plugin';
import { NgxsModule } from '@ngxs/store';

import { AppComponent } from './app.component';
import { AppRoutes } from './app.routes';
import { MenuComponent } from './components';
import { StateApp } from './state';

// AoT requires an exported function for factories
export function HttpLoaderFactory() {
  return new TranslateHttpLoader();
}

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    HttpClientModule,
    RouterModule.forRoot(AppRoutes, { preloadingStrategy: PreloadAllModules }),
    NgxsRouterPluginModule.forRoot(),
    NgxsModule.forRoot([StateApp], {
      selectorOptions: {
        suppressErrors: false,
        injectContainerState: true,
      },
    }),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
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
