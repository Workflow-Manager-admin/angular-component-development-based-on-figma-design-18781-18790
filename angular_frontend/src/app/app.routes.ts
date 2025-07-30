import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./login/login.component').then((m) => m.LoginComponent),
    title: 'Login'
  },
  // Example application private/home route placeholder:
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login'
  },
  // Wildcard route:
  { path: '**', redirectTo: 'login' }
];
