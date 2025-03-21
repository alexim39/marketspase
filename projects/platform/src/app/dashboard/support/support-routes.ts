import { Routes } from '@angular/router';
import { SubmitRequestContainerComponent } from './contacts/contacts-container.component';

export const SupportRoutes: Routes = [
  {
    path: '',
    redirectTo: 'contact',
    pathMatch: 'full',
  },
  {
    path: '',
    children: [
      {
        path: 'contact',
        component: SubmitRequestContainerComponent,
        title: "Contact Support - New support",
      },
     /*  {
        path: 'ads',
        component: ManageAdsContainerComponent,
        title: "Ads Details - Manage all your ads",
      }, */
     
    ],
  },
];
