import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AdminComponent } from './pages/admin/admin.component';
import { HeroSectionComponent } from './pages/home/hero-section/hero-section.component';
import { ServicesComponent } from './pages/home/services/services.component';
import { ProductComponent } from './pages/home/product/product.component';
import { CartComponent } from './pages/home/cart/cart.component';
import { AdminloginComponent } from './pages/adminlogin/adminlogin.component';
import { AdminAuthGuard } from './admin-auth.guard';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { AdminServicesComponent } from './pages/admin/admin-services/admin-services.component';
import { ServiceListComponent } from './pages/admin/admin-services/service-list/service-list.component';
import { ProductListComponent } from './pages/admin/admin-services/product-list/product-list.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: '',
        component: HeroSectionComponent,
      },
      {
        path: 'services',
        component: ServicesComponent,
      },
      {
        path: 'product/:id',
        component: ProductComponent,
      },
      {
        path: 'cart',
        component: CartComponent,
      },
    ],
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AdminAuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'services',
        component: AdminServicesComponent,
        children: [
          {
            path: '',
            component: ServiceListComponent,
          },
          {
            path: 'products/:id',
            component: ProductListComponent,
          },
        ],
      },
    ],
  },
  {
    path: 'adminlogin',
    component: AdminloginComponent,
  },
];
