import { Routes } from '@angular/router';
import { MarketingChannelsComponent } from './create-ads/marketing-channels.component';
import { ManageAdsContainerComponent } from './manage-ads/manage-ads-container.component';
import { ManageAdsDetailContainerComponent } from './manage-ads/details/manage-ads-detail-container.component';

export const MarketingRoutes: Routes = [
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
        component: MarketingChannelsComponent,
        title: "Create New Ads - Market your business space",
      },
      {
        path: 'ads',
        component: ManageAdsContainerComponent,
        title: "Ads Details - Manage all your ads",
      },
      {
        path: 'ad/:id',
        component: ManageAdsDetailContainerComponent,
        title: "Ad Detail - Manage your ad",
      },
    ],
  },
];