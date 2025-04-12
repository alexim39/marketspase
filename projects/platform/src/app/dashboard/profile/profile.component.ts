import { Component, Input, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { PartnerInterface } from '../../_common/services/partner.service';
import { CommonModule } from '@angular/common';
import { AccountBalanceComponent } from './account-balance/account-balance.component';

@Component({
  selector: 'async-profile',
  imports: [MatCardModule, MatButtonModule, CommonModule, AccountBalanceComponent],
  template: `
    <mat-card class="profile-card">
      <mat-card-header>
        <div mat-card-avatar class="profile-avatar">
          <img [src]="profilePictureUrl" alt="Profile Image">
        </div>
        <div class="header-text">
          <mat-card-title>
            {{ partner.name | titlecase }} {{ partner.surname | titlecase }}
          </mat-card-title>
          <mat-card-subtitle>
            //{{ partner.username | lowercase }}
          </mat-card-subtitle>
        </div>
      </mat-card-header>
      <mat-card-content>
        <div class="balance-section">
          <span class="balance-label">Account Balance</span>
          <async-account-balance/>
        </div>
      </mat-card-content>
    </mat-card>
  `,
  styles: [`
    .profile-card {
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
      margin: 8em 0 0 -1em;
      padding-right: 0.3em;

    }
    .profile-avatar img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      object-fit: cover;
    }
    mat-card-header {
      display: flex;
      align-items: center;
      padding: 1.5em;
    }
    .header-text {
      flex: 1;
      margin-left: 1em;
     
    }
    mat-card-title {
      font-size: 15px;
      white-space: normal;        /* Allow text to wrap */
      overflow-wrap: break-word;   /* Break words if needed */
      margin: 0;                  /* Remove default margin if any */
    }
    mat-card-subtitle {
      font-size: 13px;
      margin-top: 0.3em;
      color: gray;
     
    }
    mat-card-content .balance-section {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .balance-label {
      font-size: 10px;
      color: gray;
      letter-spacing: 0.5px;
      border-bottom: 1px solid #ddd;

    }
   
  `]
})
export class ProfileComponent implements OnInit {
  @Input() partner!: PartnerInterface;
  profilePictureUrl = './img/default_pp.png';
  private readonly apiURL = '';

  ngOnInit(): void {
    this.setProfilePicture();
  }

  private setProfilePicture(): void {
    if (this.partner?.profileImage) {
      this.profilePictureUrl = `${this.apiURL}/uploads/${this.partner.profileImage}`;
    }
  }
}
