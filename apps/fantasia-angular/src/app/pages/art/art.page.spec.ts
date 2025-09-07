import { RouterTestingModule } from '@angular/router/testing';
import { Spectator, createComponentFactory } from '@ngneat/spectator';

import { ArtPageComponent, ArtPageComponentModule } from './art.page';

describe('ArtPageComponent', () => {
  let spectator: Spectator<ArtPageComponent>;

  const createComponent = createComponentFactory({
    component: ArtPageComponent,
    imports: [RouterTestingModule, ArtPageComponentModule],
    declareComponent: false,
  });

  beforeEach(() => (spectator = createComponent()));

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
