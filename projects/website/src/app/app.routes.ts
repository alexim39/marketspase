import { Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';

export const routes: Routes = [
  //{ path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: '', component: IndexComponent },
  { path: 'about-us', loadComponent: () => import('./about/about.component').then(c => c.AboutComponent) },
  { path: 'faq', loadComponent: () => import('./faq/faq.component').then(c => c.faqsComponent) },
  { path: 'plans', loadComponent: () => import('./packages/packages.component').then(c => c.PackagesComponent) },
  { path: 'testimonials', loadComponent: () => import('./testimonials/testimonials.component').then(c => c.TestimonialsComponent) },
  { path: 'contacts', loadComponent: () => import('./contacts/contacts.component').then(c => c.ContactComponent) },
  { path: 'booking', loadComponent: () => import('./booking/booking.component').then(c => c.BookingComponent) },
  { path: 'get-started', loadChildren: () => import('./get-started/get-started-routes').then(r => r.getStartedRoutes) },
  { path: 'legal', loadChildren: () => import('./legal/legal-routes').then(r => r.legalRoutes) },
  { path: 'videos', loadChildren: () => import('./resources/videos/videos-routes').then(r => r.videosRoutes) },
  { path: 'guide-download', loadComponent: () => import('./resources/guide/guide.component').then(c => c.GuideDownloadComponent) },
  { path: ':partnerUsername', loadChildren: () => import('./partners/partners-routes').then(r => r.partnersRoutes) },

];
