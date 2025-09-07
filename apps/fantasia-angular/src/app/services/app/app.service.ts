import { Injectable } from '@angular/core';

import { AppProperties } from '../../models';
import { App } from '../../enums';

@Injectable({ providedIn: 'root'})
export class AppService {

  public static toArray(lookup: Record<App, AppProperties>): Array<AppProperties> {
    return Object.
      keys(lookup).
      map(id => lookup[id as App]).
      sort((a: AppProperties, b: AppProperties) => (a.order || 0) - (b.order || 0));
  }

  public generateLookup(apps: Array<AppProperties>): Record<App, AppProperties> {
    const lookup: Record<string, AppProperties> = {};

    for (const i in apps) {
      const app: AppProperties = apps[i];
      const key: string = app.key;
      const ext: string = app.iconExtension ? app.iconExtension : 'png';

      lookup[key] = {
        ...app,
        order: parseInt(i, 10),
        display: `app.${key}.title`,
        description: `app.${key}.description`,
        icon: `assets/icons/128/${key}.${ext}`
      };
    }

    return lookup;
  }
}
