import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { provideHttpClient } from '@angular/common/http';
import {
  MemoriesPageComponent,
  MemoriesPageComponentModule,
} from './memories.page';
describe('MemoriesPageComponent', () => {
  let spectator: Spectator<MemoriesPageComponent>;
  const createComponent = createComponentFactory({
    component: MemoriesPageComponent,
    imports: [MemoriesPageComponentModule],
    providers: [provideHttpClient()],
    declareComponent: false,
  });
  beforeEach(() => (spectator = createComponent()));
  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
