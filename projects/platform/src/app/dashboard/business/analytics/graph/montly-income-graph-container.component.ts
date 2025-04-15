import {  Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PartnerInterface, PartnerService } from '../../../../_common/services/partner.service';
import { Subscription } from 'rxjs';
import { AnalyticsService } from '../analytics.services';
import { MonthlyIncomeGraphComponent } from './montly-income-graph.component';

@Component({
  selector: 'async-monthly-income-graph-container',
  imports: [CommonModule, MonthlyIncomeGraphComponent], 
  providers: [AnalyticsService],
  template: `
    <async-monthly-income-graph *ngIf="partner" [partner]="partner"/>
  `,
  styles: [`
  `],
})
export class MonthlyIncomeGraphContainerComponent implements OnInit, OnDestroy {
  @Input() partner!: PartnerInterface;
  monthlyProfits: any;
  subscriptions: Subscription[] = [];

  constructor(
    private indexService: AnalyticsService,
    private partnerService: PartnerService,
  ) {}

  ngOnInit() {

     // get current signed in user
     this.subscriptions.push(
      this.partnerService.getSharedPartnerData$.subscribe({
        next: (partnerObject) => {
          this.partner = partnerObject as PartnerInterface
        }
      }),
      this.indexService.getMonthlyProfits(this.partner._id).subscribe({
        next: (profits: any) => {
          this.monthlyProfits = profits;
          console.log('monthdly profit',this.monthlyProfits)
        }
      })
    )
  }



  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

}