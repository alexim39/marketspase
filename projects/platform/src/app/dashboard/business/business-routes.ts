import { Routes } from '@angular/router';
import { NewBuyContainerComponent } from './new-buy/new-buy-container.component';
import { ManagePlanContainerComponent } from './manage-plan/manage-plan-container.component';

export const BusinessRoutes: Routes = [
  {
    path: '',
    redirectTo: 'new',
    pathMatch: 'full',
  },
  {
    path: '',
    children: [
      {
        path: 'new',
        component: NewBuyContainerComponent,
        title: "New Spase Plan - Buy a new digital space",
      },
      {
        path: 'plans',
        component: ManagePlanContainerComponent,
        title: "Manage Plan - Manage all your spase plans",
      },
     
    ],
  },
];