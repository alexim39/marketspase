import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'async-logo',
  standalone: true,
  imports: [MatIconModule, RouterModule],
  template: `
    <a [routerLink]="['/']" [style.color]="color">
      <span alt="MarketSpase Logo">
        <mat-icon [style.margin-top]="marginTop">sync</mat-icon>
        <!-- <img src="img/logo.PNG" alt="Diamond Project Logo"> -->
        MarketSpase
      </span>
    </a>
  `,
  styles: [`
    a {
      text-decoration: none;
      span {
        display: flex;
        justify-content: center;
        font-family: "Audiowide", sans-serif;
        font-size: 20px;
        font-weight: bold;
        mat-icon {
          margin-right: -1px;
        }
        img {
          width: 1.5em;
          height: 1.5em;
          border-radius: 10%;
          margin-right: 1px;
        }
      }
    }
  `]
})
export class BaseLogoComponent {
  @Input() color = '#050111';
  @Input() marginTop = '0';
}
