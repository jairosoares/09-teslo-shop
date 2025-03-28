import { NotAuthenticatedGuard } from './auth/guards/not-authenticated.guard';
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.routes'),
    canMatch: [NotAuthenticatedGuard],
  },
  {
    path: '',
    loadChildren: () => import('./store-front/store-front.routes'),
  }
];
