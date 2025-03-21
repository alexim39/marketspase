import { CommonModule } from '@angular/common';
import {Component, OnDestroy, OnInit} from '@angular/core';
import { PartnerInterface, PartnerService } from '../../../_common/services/partner.service';
import { Subscription } from 'rxjs';
import { SystemSettingComponent } from './system.component';


/**
 * @title System settings
 */
@Component({
  selector: 'async-system-setting-container',
  standalone: true,
  imports: [CommonModule, SystemSettingComponent],
  providers: [],
  template: `
  <async-system-setting *ngIf="partner" [partner]="partner"/>
  `,
})
export class SystemSettingContainerComponent implements OnInit, OnDestroy {

  partner!: PartnerInterface;
  subscriptions: Subscription[] = [];

  constructor(
    private partnerService: PartnerService,
  ) { }

  ngOnInit() {
      
    // get current signed in user
    this.subscriptions.push(
      this.partnerService.getSharedPartnerData$.subscribe({
        next: partnerObject => {
          this.partner = partnerObject as PartnerInterface
        }
      })
    )
  }

  ngOnDestroy() {
    // unsubscribe list
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }
}