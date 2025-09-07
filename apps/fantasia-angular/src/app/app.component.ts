import { Component, inject } from '@angular/core';
import { Store } from '@ngxs/store';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-main',
  templateUrl: 'app.component.html',
  styleUrls: ['./app.component.scss']
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
