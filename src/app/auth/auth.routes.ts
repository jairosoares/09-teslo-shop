import { Routes } from '@angular/router';

import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';

export const authRoutes: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        title: 'Login',
        path: 'login',
        component: LoginPageComponent,
      },
      {
        title: 'Register',
        path: 'register',
        component: RegisterPageComponent,
      },
      {
        path: '**',
        redirectTo: 'login',
      }

    ]

  },

]

export default authRoutes;