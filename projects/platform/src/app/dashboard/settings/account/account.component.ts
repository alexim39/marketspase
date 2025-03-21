import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { PartnerInterface, } from '../../../_common/services/partner.service';
import { MatExpansionModule } from '@angular/material/expansion';
import { HelpDialogComponent } from '../../../_common/help-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { PersonalInfoComponent } from './personal/personal.component';
import { ProfessionalInfoComponent } from './professional/professional.component';
import { UsernameInfoComponent } from './username/username.component';
import { PasswordChangeComponent } from './password/password.component';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

/**
 * @title profile manager
 */
@Component({
  selector: 'async-account',
  templateUrl: 'account.component.html',
  styleUrl: 'account.component.scss',
  imports: [
    PersonalInfoComponent,
    ProfessionalInfoComponent,
    UsernameInfoComponent,
    PasswordChangeComponent,
    CommonModule,  
    MatExpansionModule,  
    MatIconModule,
    MatButtonModule,
    RouterModule
  ],
})
export class AccountComponent implements OnInit {
  readonly dialog = inject(MatDialog);
  @Input() partner!: PartnerInterface;

  disabled = true;
  status = false;

  constructor( ) { }

  ngOnInit() {

    if (this.partner) {
    
      this.status = this.partner.status;

      // user account is already activated,
      if (this.partner.status) {
        // disable slide
        this.disabled = true;
      } else {
        this.disabled = false;
      }
    }
  }

  showDescription () {
    this.dialog.open(HelpDialogComponent, {
      data: {help: 'In this section, you can set up your profile details'},
    });
  }

 // scroll to top when clicked
 scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

}