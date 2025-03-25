import {Component, inject, Input} from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import { PartnerInterface } from '../../../_common/services/partner.service';
import { Router, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { HelpDialogComponent } from '../../../_common/help-dialog.component';
import { DarkThemeSettingsComponent } from './dark-theme/dark-theme.component';
import { CommonModule } from '@angular/common';
import { NotificationSettingsComponent } from './notification/notification.component';
import { IncomeTargetComponent } from './income-target/income-target.component';

/**
 * @title System setting
 */
@Component({
  selector: 'async-system-setting',
  template: `
  <section class="breadcrumb-wrapper">
    <div class="breadcrumb">
      <a routerLink="/dashboard" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }" (click)="scrollToTop()">Dashboard</a> &gt;
      <a>Settings</a> &gt;
      <!-- <a>Ads</a> &gt; -->
      <span>system settings </span>
    </div>
</section>

  <section class="async-background">
    <h2>System Settings  <mat-icon class="help" (click)="showDescription()">help</mat-icon></h2>

    <section class="async-container">
        <div class="title">
            <h3>System Page Setup</h3>
            <div class="action-area">
                <a mat-list-item routerLink="../account" routerLinkActive="active" (click)="scrollToTop()" title="Account Settings" mat-raised-button><mat-icon>manage_accounts</mat-icon>Account Settings</a>
            </div>
        </div>

        <div class="content">

            <mat-tab-group>
                <mat-tab label="System Settings">
                    <async-dark-theme-settings *ngIf="partner" [partner]="partner"/>
                </mat-tab>
                <mat-tab label="Notification Settings"> 
                    <async-notification *ngIf="partner" [partner]="partner"/>
                </mat-tab>
                <mat-tab label="Income Target"> 
                    <app-income-target *ngIf="partner" [partner]="partner"/>
                </mat-tab>
            </mat-tab-group>
  
              
        </div>
    </section>
</section>
  `,
  styles: [`
.async-background {
    margin: 2em;
    .help {
        cursor: pointer;
    }
    .async-container {
        border-radius: 1%;
        height: 100%;
        padding: 1em;
        .title {
            display: flex;
            justify-content: space-between;
            padding: 1em;
            .action-area {
                .action {
                  font-weight: bold;
                  margin-top: 1em;
                }
            }
        }
    }
}
  `],
  imports: [MatTabsModule, RouterModule, CommonModule, MatIconModule, MatButtonModule, DarkThemeSettingsComponent, NotificationSettingsComponent, IncomeTargetComponent],
})
export class SystemSettingComponent {
  @Input() partner!: PartnerInterface;
  readonly dialog = inject(MatDialog);

  constructor(
      private router: Router,
  ) { }
  
  ngOnInit(): void {
      //console.log(this.partner)
  }

  // scroll to top when clicked
  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  showDescription () {
    this.dialog.open(HelpDialogComponent, {
      data: {help: 'In this section, you can set up your page look and feel'},
    });
  }
}
