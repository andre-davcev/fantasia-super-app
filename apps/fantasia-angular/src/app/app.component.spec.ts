import { APP_BASE_HREF } from '@angular/common';
import { createComponentFactory, Spectator } from '@ngneat/spectator';

import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app.component';
import { AppComponentModule } from './app.module';

describe('AppComponent', () => {
  let spectator: Spectator<AppComponent>;

  const createComponent = createComponentFactory({
    component: AppComponent,
    imports: [AppComponentModule],
    providers: [
      provideRouter([]),
      provideHttpClient(),
      { provide: APP_BASE_HREF, useValue: '/' },
    ],
    declareComponent: false,
  });

  beforeEach(() => (spectator = createComponent()));

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
