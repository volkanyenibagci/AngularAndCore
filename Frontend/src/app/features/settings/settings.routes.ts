import { Routes } from '@angular/router';

export const SETTINGS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./settings/settings.component').then(m => m.SettingsComponent)
  }
]; 