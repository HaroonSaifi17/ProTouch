import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AdminComponent } from './pages/admin/admin.component';
import { HeroSectionComponent } from './pages/home/hero-section/hero-section.component';
import { ServicesComponent } from './pages/home/services/services.component';
import { ProductComponent } from './pages/home/product/product.component';
import { CartComponent } from './pages/home/cart/cart.component';
import { AdminloginComponent } from './pages/adminlogin/adminlogin.component';
import { AdminAuthGuard } from './admin-auth.guard';

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
    canActivate:[AdminAuthGuard]
  },
  {
    path: 'adminlogin',
    component: AdminloginComponent,
  },
];
