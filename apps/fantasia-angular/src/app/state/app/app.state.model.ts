import { MediaChange } from '@angular/flex-layout';

import { AppProperties } from '../../models';

export interface StateAppModel {
  home: boolean;
  apps: Record<string, AppProperties>;
  loading: boolean;
  stateName: string;
  mediaChanges: Array<MediaChange>;
}
