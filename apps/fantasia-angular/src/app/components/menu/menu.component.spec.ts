import { DebugElement } from '@angular/core';
import { waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import {
  createComponentFactory,
  createServiceFactory,
  Spectator,
  SpectatorService,
  SpectatorServiceFactory,
} from '@ngneat/spectator';
import { TranslateModule } from '@ngx-translate/core';
import { NgxsModule, Store } from '@ngxs/store';
import { of } from 'rxjs';
import { take } from 'rxjs/operators';

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
import { MenuComponent, MenuComponentModule } from './menu.component';

describe('MenuComponent', () => {
  let store: SpectatorService<Store>;
  const createStore: SpectatorServiceFactory<Store> =
    createServiceFactory<Store>(Store);

  let spectator: Spectator<MenuComponent>;

  const createComponent = createComponentFactory<MenuComponent>({
    component: MenuComponent,
    imports: [
      MenuComponentModule,
      RouterTestingModule,
      NgxsModule.forRoot([StateApp]),
      TranslateModule.forRoot(),
      NoopAnimationsModule,
    ],
    declareComponent: false,
  });

  beforeEach(() => {
    store = createStore();
    store.service.reset({ [StateApp.name]: StateAppOptions.defaults });
    store.service.dispatch(new ActionAppLoad(AppList));

    spectator = createComponent();
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('should create grid', waitForAsync(() => {
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

  it('should have 1 column', waitForAsync(() => {
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

  it('should navigate home', waitForAsync(() => {
    store.service.dispatch(new ActionAppNavToChild(App.Memories));
    spectator.fixture.detectChanges();

    spectator.component.home();
    spectator.fixture.detectChanges();

    store.service
      .selectOnce((state: any) => state[StateAppOptions.name as string])
      .subscribe((state: StateAppModel) => {
        expect(StateApp.home(state)).toBe(true);
      });
  }));
});
