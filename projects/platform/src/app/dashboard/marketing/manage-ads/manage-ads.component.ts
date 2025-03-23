import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatSliderModule } from '@angular/material/slider';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router, RouterModule, } from '@angular/router';
import { PartnerInterface } from '../../../_common/services/partner.service';
import { AdsInterface } from './manage-ads.service';
import { CommonModule } from '@angular/common';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { timeAgo, expiration } from '../../../_common/date-util';

/**
 * @title Manage Campaign
 */
@Component({
  selector: 'async-manage-ads',
  templateUrl: 'manage-ads.component.html',
  styleUrl: 'manage-ads.component.scss',
  standalone: true,
  imports: [MatSliderModule, CommonModule, MatPaginatorModule, MatInputModule, MatFormFieldModule, RouterModule, FormsModule, MatButtonModule, MatIconModule, MatTableModule],
})
export class ManageAdsComponent implements OnInit {

  @Input() partner!: PartnerInterface;
  @Input() ads!: AdsInterface;
  
  dataSource = new MatTableDataSource<any>([]);  
  isEmptyRecord = false;

  filterText: string = '';

  displayedColumns: string[] = ['id',  'status', 'budget', 'campaignDates', 'duration', 'expiration', 'progression', 'results', 'publishDate', 'action'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {  
    if (this.ads.data) {  
      //console.log(this.ads.data)
      this.dataSource.data = this.ads.data.sort((a, b) => {  
        // Use the getTime() method to compare the Date values  
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();  
      });  
  
      // Check if there are no records  
      this.isEmptyRecord = this.dataSource.data.length === 0; 
    }  
      // Custom filter predicate to filter by name
      this.dataSource.filterPredicate = (data: any, filter: string) => {
      return data.deliveryStatus.toLowerCase().includes(filter.toLowerCase()) || data.campaignName.toLowerCase().includes(filter.toLowerCase());
    };
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  getProgression(campaign: any): number {  
    if (campaign.deliveryStatus === 'Active' && campaign.budget.budgetAmount > 0) {  
      //return (campaign.reach / campaign.adsBudget) * 100;  
      return (campaign.leads / campaign.budget.budgetAmount) * 100;  
    }  
    return 0; // Return 0% if the campaign is not active or budget is not defined  
  } 

  getDateAgo(element: any): string {
    return timeAgo(new Date(element.createdAt));
  }

  getExpirationTime(element: any): string {
   return expiration(element);
  }
  


  // scroll to top when clicked
  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  preview(id: string) {
    this.router.navigate(['/dashboard/marketing/ad', id]);
  }
}