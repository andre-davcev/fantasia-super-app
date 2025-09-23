import { of } from 'rxjs';

import { MaterialBreakpoint } from '../enums';

export class MockMediaObserver {
  isActive(mqAlias: string) {
    return mqAlias === MaterialBreakpoint.ExtraLarge;
  }

  asObservable() {
    return of([{ mqAlias: MaterialBreakpoint.ExtraSmall }]);
  }

  mediaChanges() {
    return [];
  }
}
