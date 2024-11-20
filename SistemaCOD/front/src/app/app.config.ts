import {APP_INITIALIZER, ApplicationConfig, LOCALE_ID, provideZoneChangeDetection} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {HttpClientModule, provideHttpClient} from "@angular/common/http";
import {provideAnimations} from "@angular/platform-browser/animations";
import {registerLocaleData} from "@angular/common";
import localePt from '@angular/common/locales/pt';
import {PrimeNGConfig} from "primeng/api";

registerLocaleData(localePt)

// const initializeAppFactory = (primeConfig: PrimeNGConfig) => () => {
//   primeConfig.ripple = true;
// };

export const appConfig: ApplicationConfig = {
  providers: [
    HttpClientModule,
    provideHttpClient(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimations(),
    // {
    //   provide: APP_INITIALIZER,
    //   useFactory: initializeAppFactory,
    //   deps: [PrimeNGConfig],
    //   multi: true,
    // },
    { provide: LOCALE_ID, useValue: 'pt-BR' } // Definindo o locale padrão
  ]
};
