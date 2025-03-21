import { CommonModule } from '@angular/common';
import {AfterViewInit, Component, ElementRef, signal, ViewChild} from '@angular/core';
import {MatBadgeModule} from '@angular/material/badge';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

/**
 * @title dashboard index
 */
@Component({
  selector: 'async-dashboard-index',
  template: `
  
  <!-- Add Content Here -->
  <router-outlet/>
  `,
  styles: [`
  `],
  standalone: true,
  imports: [MatButtonModule, RouterModule, MatIconModule, MatCardModule, MatBadgeModule, CommonModule, MatInputModule],
})
export class DashboardIndexComponent  {
  appName = 'MarketSpase Platform';
  currentYear = new Date().getFullYear();
}