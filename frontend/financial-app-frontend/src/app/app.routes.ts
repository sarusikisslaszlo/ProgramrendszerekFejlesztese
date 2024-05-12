import { Routes } from '@angular/router';
import { authGuard } from './shared/guards/auth.guard';

export const routes: Routes = [
    { path : '', redirectTo: 'login', pathMatch: 'full' },
    { path : 'signup', loadComponent: () => import('./signup/signup.component').then((c) => c.SignupComponent) },
    { path : 'login', loadComponent: () => import('./login/login.component').then((c) => c.LoginComponent) },
    { path : 'dashboard', loadComponent: () => import('./dashboard/dashboard.component').then((c) => c.DashboardComponent), canActivate: [authGuard] },
    { path : 'manage-expenses', loadComponent: () => import('./manage-expenses/manage-expenses.component').then((c) => c.ManageExpensesComponent), canActivate: [authGuard] },
    { path : 'financial-goals', loadComponent: () => import('./financial-goals/financial-goals.component').then((c) => c.FinancialGoalsComponent), canActivate: [authGuard] },
    { path : 'savings-goals', loadComponent: () => import('./savings-goals/savings-goals.component').then((c) => c.SavingsGoalsComponent), canActivate: [authGuard] },
    { path: '**', redirectTo: 'login' }
];
