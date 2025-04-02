import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';
import { MatNativeDateModule } from '@angular/material/core';

if (!appConfig.providers) {
  appConfig.providers = [];
}

appConfig.providers.push(importProvidersFrom(MatNativeDateModule));

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
