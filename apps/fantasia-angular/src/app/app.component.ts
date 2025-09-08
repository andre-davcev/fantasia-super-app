import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import { MenuComponent } from './components';

@Component({
  selector: 'app-main',
  imports: [RouterModule, MenuComponent],
  templateUrl: 'app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  private store = inject(Store);
  private translate = inject(TranslateService);

  constructor() {
    const translate = this.translate;

    translate.setDefaultLang('en');
    translate.use('en');
  }
}
