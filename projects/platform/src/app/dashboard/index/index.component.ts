import { CommonModule } from '@angular/common';
import {Component} from '@angular/core';
import { RouterModule } from '@angular/router';
import { DashboradMainComponent } from './main.component';

/**
 * @title dashboard index
 */
@Component({
  selector: 'async-dashboard-index',
  template: `
  
  <!-- Add Content Here -->
  <router-outlet/>
  <async-dashboard-main/>
  
  `,
  styles: [``],
  imports: [
    RouterModule,
    CommonModule, 
    DashboradMainComponent,
    
  ],
})
export class DashboardIndexComponent  {}