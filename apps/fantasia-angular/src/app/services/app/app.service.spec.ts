import { SpectatorService } from '@ngneat/spectator';
import { createServiceFactory } from '@ngneat/spectator/jest';

import { AppList } from '../../constants';
import { App } from '../../enums';
import { AppProperties } from '../../models';
import { AppService } from './app.service';

describe('AppService', () => {
  let spectator: SpectatorService<AppService>;
  const createService = createServiceFactory(AppService);

  beforeEach(() => (spectator = createService()));

  it('should be created', () => {
    expect(spectator.service).toBeTruthy();
  });

  it('should generate an app lookup', () => {
    const lookup: Record<App, AppProperties> =
      spectator.service.generateLookup(AppList);

    const original: AppProperties = AppList[0];
    const app: AppProperties = lookup[original.key as App];

    expect(Object.keys(lookup).length).toBe(AppList.length);
    expect(app.key).toBe(original.key);
    expect(app.link).toBe(original.link);
    expect(app.order).toBe(0);
    expect(app.iconExtension).toBe(original.iconExtension);
    expect(app.display).toBe(`app.${app.key}.title`);
    expect(app.description).toBe(`app.${app.key}.description`);
    expect(app.icon).toBe(`/icons/128/${app.key}.png`);
  });

  it('should convert lookup to ordered array', () => {
    AppList[1].iconExtension = 'jpg';

    const secondKey: string = AppList[1].key;
    const apps: Array<AppProperties> = AppService.toArray(
      spectator.service.generateLookup(AppList)
    );
    const app: AppProperties = apps[1];

    expect(app.key).toBe(secondKey);
    expect(app.icon).toBe(`/icons/128/${app.key}.${app.iconExtension}`);
  });
});
