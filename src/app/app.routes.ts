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
        path: 'admin/dashboard',
        title: 'ADMIN',
        loadComponent: () => import('./pages/admin/dashboard/dashboard.component').then(m => m.DashboardComponent)
    },
];
