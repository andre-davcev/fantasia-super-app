import { APP_BASE_HREF } from '@angular/common';
import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { provideTranslateService } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';
import { withNgxsRouterPlugin } from '@ngxs/router-plugin';
import { provideStore } from '@ngxs/store';
import { AppComponent } from './app.component';
import { AppComponentModule } from './app.module';
import { StateApp } from './state';
describe('AppComponent', () => {
  let spectator: Spectator<AppComponent>;
  const createComponent = createComponentFactory({
    component: AppComponent,
    imports: [AppComponentModule],
    providers: [
      provideRouter([]),
      provideHttpClient(),
      provideStore([StateApp], withNgxsRouterPlugin()),
      provideTranslateService({
        loader: provideTranslateHttpLoader({ prefix: '/i18n/' }),
        fallbackLang: 'en',
        lang: 'en',
      }),
      { provide: APP_BASE_HREF, useValue: '/' },
    ],
    declareComponent: false,
  });
  beforeEach(() => (spectator = createComponent()));
  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
