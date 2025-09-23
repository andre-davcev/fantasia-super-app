import { provideHttpClient } from '@angular/common/http';
import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideTranslateService } from '@ngx-translate/core';
import {
  provideTranslateHttpLoader,
  TranslateHttpLoader,
} from '@ngx-translate/http-loader';
import { withNgxsRouterPlugin } from '@ngxs/router-plugin';
import { provideStore } from '@ngxs/store';

import { withNgxsReduxDevtoolsPlugin } from '@ngxs/devtools-plugin';
import { StateApp } from './state';

export function HttpLoaderFactory() {
  return new TranslateHttpLoader();
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),

    provideHttpClient(),
    provideStore(
      [StateApp],
      {
        selectorOptions: {
          suppressErrors: false,
          injectContainerState: true,
        },
      },
      withNgxsRouterPlugin(),
      withNgxsReduxDevtoolsPlugin()
    ),
    provideTranslateService({
      loader: provideTranslateHttpLoader({ prefix: '/i18n/' }),
      fallbackLang: 'en',
      lang: 'en',
    }),
  ],
};
