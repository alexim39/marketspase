import { CommonModule } from '@angular/common';
import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import { Subscription } from 'rxjs';
import { PartnerInterface, PartnerService } from '../../../_common/services/partner.service';
import { ManagePlanComponent } from './manage-plan.component';
import { PlanInterface, PlanService } from '../new-plan.service';


/**
 * @title Manage plan container
 */
@Component({
  selector: 'async-manage-plan-container',
  imports: [CommonModule, ManagePlanComponent],
  providers: [PlanService],
  template: `
  <async-manage-plan *ngIf="partner && plans" [partner]="partner" [plans]="plans"/>
  `,
})
export class ManagePlanContainerComponent implements OnInit, OnDestroy {

  partner!: PartnerInterface;
  subscriptions: Subscription[] = [];
  plans: Array<PlanInterface> = [];

  constructor(
    private partnerService: PartnerService,
    private planService: PlanService,
    private cdr: ChangeDetectorRef  // Inject ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.subscriptions.push(
      this.partnerService.getSharedPartnerData$.subscribe({
        next: (partnerObject) => {
          this.partner = partnerObject as PartnerInterface;
  
          if (this.partner) {
            this.planService.getPlans(this.partner._id).subscribe({
              next: (plans: PlanInterface[]) => {
                this.plans = [...plans]; // Ensure immutability for change detection
                this.cdr.detectChanges(); // Manually trigger change detection
              }
            });
          }
        }
      })
    );
  }

  ngOnDestroy() {
    // unsubscribe list
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }
}