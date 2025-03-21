import { Routes } from '@angular/router';
import { NewBuyContainerComponent } from './new-buy/new-buy-container.component';

export const BusinessRoutes: Routes = [
  {
    path: '',
    redirectTo: 'buy',
    pathMatch: 'full',
  },
  {
    path: '',
    children: [
      {
        path: 'plan',
        component: NewBuyContainerComponent,
        title: "Buy New Spase Plan - Buy a new digital space",
      },
      /* {
        path: 'rent',
        component: NewRentContainerComponent,
        title: "Rent New Spase Plan - Rent a new digital space",
      }, */
     
    ],
  },
];