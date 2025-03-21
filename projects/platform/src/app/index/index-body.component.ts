import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BannerComponent } from './banner/banner.component';



@Component({
  selector: 'async-index-body',
  standalone: true,
  imports: [BannerComponent, RouterModule,],
  template: `
    <async-banner></async-banner>
  `,
  styles: [` `]
})
export class IndexBodyComponent {}
