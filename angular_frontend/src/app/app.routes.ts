import { Routes } from '@angular/router';

/**
 * App Routes
 * - Navigating to the root path ('') will redirect the user to the LoginComponent.
 * - This ensures the login page is always the default landing page.
 */
export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login'
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./login/login.component').then((m) => m.LoginComponent),
    title: 'Login'
  },
  // Wildcard route: redirect anything else to Login
  { path: '**', redirectTo: 'login' }
];
