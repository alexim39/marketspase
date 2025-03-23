import { Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found.component';
import { AccountActivationComponent } from './account-activation.component';

export const routes: Routes = [
  { path: '', loadChildren: () => import('./index/index-routes').then(r => r.IndexRoutes) },
  { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard-routes').then(r => r.dashboardRoutes) },
  { path: 'partners/activation/:id', 
    component: AccountActivationComponent, 
    title: "Account Activation Page"
  },

    // should be the last path on routes
  {path: '**', component: PageNotFoundComponent}

];
