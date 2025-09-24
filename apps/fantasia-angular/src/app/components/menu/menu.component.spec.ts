import { DebugElement } from '@angular/core';
import { waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {
  createComponentFactory,
  createServiceFactory,
  Spectator,
  SpectatorService,
  SpectatorServiceFactory,
} from '@ngneat/spectator';
import { TranslateModule } from '@ngx-translate/core';
import { provideStore, Store } from '@ngxs/store';
import { of } from 'rxjs';
import { take } from 'rxjs/operators';

import { provideHttpClient } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { provideRouter } from '@angular/router';

import { withNgxsRouterPlugin } from '@ngxs/router-plugin';
import { AppList } from '../../constants';
import { App, MaterialBreakpoint } from '../../enums';
import {
  ActionAppLoad,
  ActionAppNavToChild,
  ActionAppNavToHome,
  StateApp,
  StateAppModel,
  StateAppOptions,
} from '../../state';
import { MenuComponent } from './menu.component';

describe('MenuComponent', () => {
  let store: SpectatorService<Store>;
  const createStore: SpectatorServiceFactory<Store> =
    createServiceFactory<Store>(Store);

  let spectator: Spectator<MenuComponent>;

  const createComponent = createComponentFactory<MenuComponent>({
    component: MenuComponent,
    imports: [
      MenuComponent,
      TranslateModule.forRoot(),
      NoopAnimationsModule,
      FlexLayoutModule,
    ],
    providers: [
      provideRouter([]),
      provideHttpClient(),
      provideStore([StateApp], withNgxsRouterPlugin()),
    ],
    declareComponent: false,
  });

  beforeEach(() => {
    store = createStore();
    store.service.reset({ [StateApp.name]: StateAppOptions.defaults });
    store.service.dispatch(new ActionAppLoad(AppList));

    spectator = createComponent();
  });

  it.skip('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  it.skip('should create grid', waitForAsync(() => {
    store.service.dispatch(new ActionAppNavToHome());
    const breakpoint: MaterialBreakpoint = MaterialBreakpoint.Large;
    Object.defineProperty(spectator.component, 'breakpoint$', {
      value: of(breakpoint),
    });

    spectator.component.ngOnInit();
    spectator.fixture.whenStable().then(() => {
      spectator.fixture.detectChanges();

      const grid: HTMLElement = spectator.debugElement.query(
        By.css('mat-grid-list')
      ).nativeElement;
      const tiles: Array<DebugElement> = spectator.debugElement.queryAll(
        By.css('mat-grid-tile')
      );

      expect(grid.classList.contains(`cpt-${breakpoint}`)).toBe(true);
      expect(tiles.length).toBe(AppList.length);

      spectator.component.columns$
        .pipe(take(1))
        .subscribe((columns: number) => {
          expect(grid.getAttribute('ng-reflect-cols')).toBe(
            `${spectator.component.breakpointColumns[breakpoint]}`
          );
          expect(columns).toBe(
            spectator.component.breakpointColumns[breakpoint]
          );
        });
    });
  }));

  it.skip('should have 1 column', waitForAsync(() => {
    store.service.dispatch(new ActionAppNavToChild(App.Memories));
    const breakpoint: MaterialBreakpoint = MaterialBreakpoint.Large;
    Object.defineProperty(spectator.component, 'breakpoint$', {
      value: of(breakpoint),
    });
    spectator.component.ngOnInit();

    spectator.fixture.whenStable().then(() => {
      spectator.fixture.detectChanges();

      spectator.component.columns$
        .pipe(take(1))
        .subscribe((columns: number) => {
          expect(columns).toBe(1);
        });
    });
  }));

  it.skip('should navigate home', waitForAsync(() => {
    store.service.dispatch(new ActionAppNavToChild(App.Memories));
    spectator.fixture.detectChanges();

    spectator.component.home();
    spectator.fixture.detectChanges();

    store.service
      .selectOnce((state) => state[StateAppOptions.name as string])
      .subscribe((state: StateAppModel) => {
        expect(StateApp.home(state)).toBe(true);
      });
  }));
});
