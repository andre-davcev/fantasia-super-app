import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Spectator, createComponentFactory } from '@ngneat/spectator';

import { LogoComponent } from './logo.component';

describe('LogoComponent', () => {
  let spectator: Spectator<LogoComponent>;

  const createComponent = createComponentFactory({
    component: LogoComponent,
    imports: [LogoComponent, NoopAnimationsModule],
    declareComponent: false,
  });

  beforeEach(() => (spectator = createComponent()));

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
