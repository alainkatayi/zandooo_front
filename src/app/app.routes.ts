import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        title: 'Home',
        loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)
    },
    {
        path: 'login',
        title: 'Login',
        loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent)
    },
    {
        path: 'register',
        title: 'Register',
        loadComponent: () => import('./pages/user-register/user-register.component').then(m => m.UserRegisterComponent)
    },
    {
        path: 'register/delivery',
        title: 'Register',
        loadComponent: () => import('./pages/delivery-register/delivery-register.component').then(m => m.DeliveryRegisterComponent)
    },

    {
        path: 'shop/overview',
        title: '0verview',
        loadComponent: () => import('./pages/shop/overview/overview.component').then(m => m.OverviewComponent)
    },
    {
        path: 'shop/create',
        title: 'create',
        loadComponent: () => import('./pages/shop/create/create.component').then(m => m.CreateComponent)
    },
    {
        path: 'shop/explorer',
        title: 'Explorer',
        loadComponent: () => import('./pages/shop/explorer/explorer.component').then(m => m.ExplorerComponent)
    },
    {
        path: 'product/create',
        title: 'Product',
        loadComponent: () => import('./pages/product/create/create.component').then(m => m.CreateComponent)
    },

    {
        path: 'admin/dashboard',
        title: 'ADMIN',
        loadComponent: () => import('./pages/admin/dashboard/dashboard.component').then(m => m.DashboardComponent)
    },
];
