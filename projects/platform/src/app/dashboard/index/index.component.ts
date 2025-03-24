import { CommonModule } from '@angular/common';
import {Component} from '@angular/core';
import { RouterModule } from '@angular/router';
import { DashboradComponent } from './dashboard.component';

/**
 * @title dashboard index
 */
@Component({
  selector: 'async-dashboard-index',
  template: `
  
  <!-- Add Content Here -->
  <router-outlet/>
  <async-dashboard/>
  
  `,
  styles: [``],
  imports: [
    RouterModule,
    CommonModule, 
    DashboradComponent,
    
  ],
})
export class DashboardIndexComponent  {}