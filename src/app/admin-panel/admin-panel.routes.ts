import { Routes } from '@angular/router';
import { AdminPanelLayoutComponent } from './pages/admin-panel-layout/admin-panel-layout.component';
import { ProductAdminPageComponent } from './pages/product-admin-page/product-admin-page.component';
import { ProductAdminListPageComponent } from './pages/product-admin-list-page/product-admin-list-page.component';
import { IsAdminGuard } from '@auth/guards/is-admin.guard';

export const adminPanelRoutes: Routes = [
  {
    path: '',
    component: AdminPanelLayoutComponent,
    canMatch: [
      IsAdminGuard
    ],
    children: [
      {
        path: 'products',
        component: ProductAdminListPageComponent,
      },
      {
        path: 'products/:id',
        component: ProductAdminPageComponent,
      },
      {
        path: '**',
        redirectTo: 'products',
      }
    ]

  }
]

export default adminPanelRoutes;