import { Routes } from '@angular/router';
import { AnalyticsContainerComponent } from './analytics-container.component';
import { MonthlyIncomeGraphContainerComponent } from './graph/montly-income-graph-container.component';


export const AnalyticsRoutes: Routes = [
  {
    path: '',
    redirectTo: 'summary',
    pathMatch: 'full',
  },
  {
    path: '',
    children: [
      {
        path: 'summary',
        component: AnalyticsContainerComponent,
        title: "Business Analytics - Business analytics" 
      },
      {
        path: 'monthly-income',
        component: MonthlyIncomeGraphContainerComponent,
        title: "Ads Details - Manage all your ads",
      },
     /*  {
        path: 'ad/:id',
        component: ManageAdsDetailContainerComponent,
        title: "Ad Detail - Manage your ad",
      }, */
    ],
  },
];