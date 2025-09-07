import { CommonModule } from '@angular/common';
import {
  Component,
  HostBinding,
  HostListener,
  inject,
  Input,
} from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { Store } from '@ngxs/store';

import { Animation, IconSize } from '../../enums';
import { AppProperties } from '../../models';
import { ActionAppNavToChild } from '../../state';

@Component({
  selector: 'app-menu-item',
  imports: [CommonModule, TranslateModule],
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss'],
})
export class MenuItemComponent {
  private store = inject(Store);

  public animation: string = Animation.Default;
  public IconSize: any = IconSize;

  @Input()
  public app!: AppProperties;

  @Input()
  public size: IconSize | null = IconSize.Large;

  @HostBinding('class')
  public get classes(): string {
    return `cpt-${this.size}`;
  }

  @HostListener('click')
  public navigate(): void {
    this.store.dispatch(new ActionAppNavToChild(this.app.key));
  }
}
