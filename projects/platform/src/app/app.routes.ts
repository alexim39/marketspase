import { Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found.component';
import { AccountActivationComponent } from './auth/account-activation.component';
import { ForgotPasswordComponent } from './auth/forgot-password.component';
import { ChangePasswordComponent } from './auth/change-password.component';

export const routes: Routes = [
  { path: '', loadChildren: () => import('./index/index-routes').then(r => r.IndexRoutes) },
  { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard-routes').then(r => r.dashboardRoutes) },
  { path: 'partners/activation/:id', 
    component: AccountActivationComponent, 
    title: "Account Activation Page"
  },
  { path: 'forgot-password', 
    component: ForgotPasswordComponent, 
    title: "Forgot Password Page"
  },
  { path: 'change-password', 
    component: ChangePasswordComponent, 
    title: "Change Password Page"
  },

    // should be the last path on routes
  {path: '**', component: PageNotFoundComponent}

];
