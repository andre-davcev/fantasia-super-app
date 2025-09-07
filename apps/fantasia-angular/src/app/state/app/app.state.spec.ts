import { TestBed, waitForAsync } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxsModule, Store } from '@ngxs/store';

import { MediaObserver } from '@angular/flex-layout';
import {
  createServiceFactory,
  SpectatorService,
  SpectatorServiceFactory,
} from '@ngneat/spectator';
import { NgxsRouterPluginModule } from '@ngxs/router-plugin';
import { of } from 'rxjs';
import {
  ActionAppLoad,
  ActionAppNavToChild,
  ActionAppNavToHome,
  ActionAppWatchMediaBreakpoints,
} from './app.actions';
import { StateApp } from './app.state';
import { StateAppModel } from './app.state.model';
import { StateAppOptions } from './app.state.options';

import { AppRoutes } from '../../app.routes';
import { AppList } from '../../constants';
import { App, MaterialBreakpoint } from '../../enums';
import { AppProperties } from '../../models';

describe('StateApp', () => {
  let store: SpectatorService<Store>;
  const createStore: SpectatorServiceFactory<Store> =
    createServiceFactory<Store>(Store);

  let router: Router;

  class MockMediaObserver {
    isActive(mqAlias: string) {
      return mqAlias === MaterialBreakpoint.ExtraLarge;
    }

    asObservable() {
      return of([{ mqAlias: MaterialBreakpoint.ExtraSmall }]);
    }
  }
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes(AppRoutes),
        NgxsModule.forRoot([StateApp]),
        NgxsRouterPluginModule.forRoot(),
      ],
      providers: [{ provide: MediaObserver, useClass: MockMediaObserver }],
      teardown: { destroyAfterEach: false },
    }).compileComponents();

    router = TestBed.inject(Router);
    store = createStore();
    store.service.reset({
      [StateAppOptions.name as string]: StateAppOptions.defaults,
    });
  }));

  it('should load app data', waitForAsync(() => {
    store.service.dispatch(new ActionAppLoad(AppList));

    store.service
      .selectOnce((state: any) => state[StateAppOptions.name as string])
      .subscribe((state: StateAppModel) => {
        const original: AppProperties = AppList[0];
        const apps: Array<AppProperties> = StateApp.apps(state);
        const app: AppProperties = apps[0];

        expect(apps.length).toBe(AppList.length);
        expect(app.key).toBe(original.key);
        expect(app.link).toBe(original.link);
        expect(app.order).toBe(0);
        expect(app.iconExtension).toBe(original.iconExtension);
        expect(app.display).toBe(`app.${app.key}.title`);
        expect(app.description).toBe(`app.${app.key}.description`);
        expect(app.icon).toBe(`assets/icons/128/${app.key}.png`);
      });
  }));

  it('should navigate to home route', waitForAsync(() => {
    store.service.reset({
      [StateAppOptions.name as string]: {
        ...StateAppOptions.defaults,
        home: false,
      },
    });

    jest.spyOn(router, 'navigate');

    store.service.dispatch([
      new ActionAppLoad(AppList),
      new ActionAppNavToHome(),
    ]);

    store.service
      .selectOnce((state: any) => state[StateAppOptions.name as string])
      .subscribe((state: StateAppModel) => {
        expect(StateApp.home(state)).toBe(true);
        expect(StateApp.loading(state)).toBe(true);
        expect(router.navigate).toHaveBeenCalledWith(['/'], {
          queryParams: undefined,
        });
      });
  }));

  xit('should navigate to child route', waitForAsync(() => {
    jest.spyOn(router, 'navigate');

    store.service.dispatch([
      new ActionAppLoad(AppList),
      new ActionAppNavToChild(App.Art),
    ]);

    store.service
      .selectOnce((state: any) => state[StateAppOptions.name as string])
      .subscribe((state: StateAppModel) => {
        expect(StateApp.home(state)).toBe(false);
        expect(StateApp.loading(state)).toBe(true);
        expect(router.navigate).toHaveBeenCalledWith([App.Art], {
          queryParams: undefined,
        });
      });
  }));

  it('should open window tab', waitForAsync(() => {
    jest.spyOn(window, 'open');

    store.service.dispatch([
      new ActionAppLoad(AppList),
      new ActionAppNavToChild(App.Firefly),
    ]);

    store.service
      .selectOnce((state: any) => state[StateAppOptions.name as string])
      .subscribe((state: StateAppModel) => {
        expect(StateApp.home(state)).toBe(true);
        expect(window.open).toHaveBeenCalledWith(
          StateApp.appLookup(state)[App.Firefly].link
        );
      });
  }));

  it('should default breakpoint state', waitForAsync(() => {
    store.service
      .selectOnce((state: any) => state[StateAppOptions.name as string])
      .subscribe((state: StateAppModel) => {
        expect(StateApp.mediaBreakpoint(state)).toBeFalsy();
      });
  }));

  it('should change breakpoint alias', waitForAsync(() => {
    store.service.dispatch(new ActionAppWatchMediaBreakpoints());

    store.service
      .selectOnce((state: any) => state[StateAppOptions.name as string])
      .subscribe((state: StateAppModel) => {
        expect(StateApp.mediaBreakpoint(state)).toBe(
          MaterialBreakpoint.ExtraSmall
        );
      });
  }));
});
