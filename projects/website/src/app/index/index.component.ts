import { Component } from '@angular/core';
import { BannerComponent } from './banner/banner.component';
import { TestimonialsComponent } from './testimonials/testimonials.component';
import { LoadingSpinnerService } from '../_common/services/loader/spinner.service';
import { AboutWhyYouShouldJoinComponent } from './why-you-should-join/why-you-should-join.component';
import { WhyWeExistComponent } from './why-we-exist/why-we-exist.component';
import { VideoAdsComponent } from './video-ads/video-ads.component';
import { GrowthComponent } from './growth/growth.component';
import { BrandsComponent } from './brands/brands.component';


@Component({
  selector: 'async-index',
  standalone: true,
  imports: [ 
    BannerComponent, 
    WhyWeExistComponent, 
    TestimonialsComponent,  
    AboutWhyYouShouldJoinComponent, 
    VideoAdsComponent,
    GrowthComponent,
    BrandsComponent
  ],
  template: `
    <async-index-banner/>
    <async-growth/>
    <async-index-why-we-exist/>
    <async-index-video-ads/>
    <async-why-you-should-join/>
    <async-index-testimonials/>
    <async-brands-logos/>
  `,
  styles: [`
  `]
})
export class IndexComponent { 
  constructor(
    public loadingSpinnerService: LoadingSpinnerService
  ) {}
  
  ngOnInit(): void {
    this.loadingSpinnerService.hide()
  }
}
