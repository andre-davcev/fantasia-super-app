import { Spectator, createComponentFactory } from '@ngneat/spectator';

import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { ArtPageComponent, ArtPageComponentModule } from './art.page';

describe('ArtPageComponent', () => {
  let spectator: Spectator<ArtPageComponent>;

  const createComponent = createComponentFactory({
    component: ArtPageComponent,
    imports: [ArtPageComponentModule],
    providers: [provideRouter([]), provideHttpClient()],
    declareComponent: false,
  });

  beforeEach(() => (spectator = createComponent()));

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
