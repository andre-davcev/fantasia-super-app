import { AsyncPipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatGridListModule } from '@angular/material/grid-list';
import { RouterModule } from '@angular/router';
import { Select, Store } from '@ngxs/store';
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
    FlexLayoutModule,
    MatGridListModule,
    LogoComponent,
    MenuItemComponent,
  ],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  private store = inject(Store);

  @Select(StateApp.apps) apps$!: Observable<Array<AppProperties>>;
  @Select(StateApp.home) home$!: Observable<boolean>;
  @Select(StateApp.mediaBreakpoint)
  breakpoint$!: Observable<MaterialBreakpoint>;

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
        home ? this.breakpointColumns[breakpoint] : 1
      )
    );

    this.gridClass$ = this.breakpoint$.pipe(
      map((breakpoint: MaterialBreakpoint) => `cpt-${breakpoint}`)
    );

    this.alignGrid$ = this.columns$.pipe(
      map((count: number) => (count === 1 ? 'start start' : 'center center'))
    );

    this.iconSize$ = this.columns$.pipe(
      map((count: number) => (count === 1 ? IconSize.Small : IconSize.Large))
    );
  }

  public home(): void {
    this.store.dispatch(new ActionAppNavToHome());
  }
}
