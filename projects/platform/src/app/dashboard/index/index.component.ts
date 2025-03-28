import { CommonModule } from '@angular/common';
import {Component} from '@angular/core';
import { RouterModule } from '@angular/router';
import { DashboradComponent } from './dashboard.component';
import { FloatingButtonComponent } from './floating-btn/floating-btn.component';

/**
 * @title dashboard index
 */
@Component({
  selector: 'async-dashboard-index',
  template: `
  
  <!-- Add Content Here -->
  <router-outlet/>
  <async-dashboard/>
  <async-floating-btn/>
  
  `,
  styles: [``],
  imports: [
    RouterModule,
    CommonModule, 
    DashboradComponent,
    FloatingButtonComponent
  ],
})
export class DashboardIndexComponent  {}