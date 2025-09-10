import { AsyncPipe, NgClass } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { RouterModule } from '@angular/router';
import { Store } from '@ngxs/store';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

import { IconSize, MaterialBreakpoint } from '../../enums';
import { AppProperties } from '../../models';
import { ActionAppNavToHome, StateApp } from '../../state';
import { LogoComponent } from '../logo';
import { MenuItemComponent } from '../menu-item';

@Component({
  selector: 'app-menu',
  imports: [
    AsyncPipe,
    RouterModule,
    MatGridListModule,
    LogoComponent,
    MenuItemComponent,
    NgClass,
  ],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  private store = inject(Store);

  private home$: Observable<boolean> = inject(Store).select(StateApp.home);
  public apps$: Observable<Array<AppProperties>> = inject(Store).select(
    StateApp.apps
  );
  public breakpoint$: Observable<MaterialBreakpoint | undefined> = inject(
    Store
  ).select(StateApp.mediaBreakpoint);

  public breakpointColumns: Record<string, number> = {
    [MaterialBreakpoint.ExtraSmall]: 1,
    [MaterialBreakpoint.Small]: 2,
    [MaterialBreakpoint.Medium]: 2,
    [MaterialBreakpoint.Large]: 2,
    [MaterialBreakpoint.ExtraLarge]: 2,
  };

  public columns$!: Observable<number>;
  public gridClass$!: Observable<string>;
  public alignGrid$!: Observable<string>;
  public iconSize$!: Observable<IconSize>;

  public ngOnInit(): void {
    this.columns$ = combineLatest([this.breakpoint$, this.home$]).pipe(
      map(([breakpoint, home]) =>
        home && breakpoint != null ? this.breakpointColumns[breakpoint] : 1
      )
    );

    this.gridClass$ = this.breakpoint$.pipe(
      map((breakpoint: MaterialBreakpoint | undefined) => `cpt-${breakpoint}`)
    );

    this.alignGrid$ = this.columns$.pipe(
      map((count: number) =>
        count === 1
          ? 'tw-justify-start tw-content-start'
          : 'tw-justify-center tw-content-center'
      )
    );

    this.iconSize$ = this.columns$.pipe(
      map((count: number) => (count === 1 ? IconSize.Small : IconSize.Large))
    );
  }

  public home(): void {
    this.store.dispatch(new ActionAppNavToHome());
  }
}
