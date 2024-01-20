import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AdminComponent } from './pages/admin/admin.component';
import { HeroSectionComponent } from './pages/home/hero-section/hero-section.component';
import { ServicesComponent } from './pages/home/services/services.component';
import { ProductComponent } from './pages/home/product/product.component';

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
    ],
  },
  {
    path: 'admin',
    component: AdminComponent,
  },
];
