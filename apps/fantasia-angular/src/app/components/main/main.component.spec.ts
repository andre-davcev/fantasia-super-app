import { provideHttpClient } from '@angular/common/http';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { TranslateModule } from '@ngx-translate/core';
import { provideStore } from '@ngxs/store';
import { StateApp } from '../../state';
import { MainComponent } from './main.component';
import { MainComponentModule } from './main.component.module';
describe('MainComponent', () => {
  let spectator: Spectator<MainComponent>;
  const createComponent = createComponentFactory({
    component: MainComponent,
    imports: [
      MainComponentModule,
      TranslateModule.forRoot(),
      NoopAnimationsModule,
    ],
    providers: [provideHttpClient(), provideStore([StateApp])],
    declareComponent: false,
  });
  beforeEach(() => (spectator = createComponent()));
  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
