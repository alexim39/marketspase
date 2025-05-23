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
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatCardModule } from '@angular/material/card';

/**
 * @title Manage Campaign
 */
@Component({
  selector: 'async-manage-ads',
  templateUrl: 'manage-ads.component.html',
  styles: [`
  .async-background {
    margin: 2em;
    .async-container {
        border-radius: 1%;
        height: 100%;
        padding: 1em;
        .title {
            display: flex;
            justify-content: space-between;
            border-bottom: 1px solid #ccc;
            margin-bottom: 1em;
            padding: 1em;
            .action-area {
                .action {
                    font-weight: bold;
                    margin-top: 1em;
                }
            }
        }

        .content {
            border-radius: 6px;
      
            .search {
              padding: 0.5em 0;
              text-align: center;
              mat-form-field {
                width: 70%;
              }
            }
      
            .table {
              padding: 0 1em;
            }
          }

        .no-campaign {
            text-align: center;
            color: rgb(196, 129, 4);
            font-weight: bold;
        }
        
        .inactive {
            background-color: rgb(254, 246, 244); /* Light red for pending */
            text-decoration: line-through;
        }
        
        .active {
            background-color: rgb(222, 251, 211); /* Green for success */
        }
    }
  }
  `],
  imports: [MatSliderModule, CommonModule, MatCardModule, MatPaginatorModule, MatInputModule, MatFormFieldModule, RouterModule, FormsModule, MatButtonModule, MatIconModule, MatTableModule],
})
export class ManageAdsComponent implements OnInit {

  @Input() partner!: PartnerInterface;
  @Input() ads!: AdsInterface;
  
  dataSource = new MatTableDataSource<any>([]);  
  isEmptyRecord = false;

  filterText: string = '';

  displayedColumns: string[] = ['id',  'status', 'budget', 'campaignDates', 'duration', 'expiration', 'progression', 'results', 'publishDate', 'action'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  isHandset: boolean = false;


  constructor(
    private router: Router,
    private breakpointObserver: BreakpointObserver
  ) {
    this.breakpointObserver
    .observe([Breakpoints.Handset, Breakpoints.Tablet])
    .subscribe((result) => {
      this.isHandset = result.matches;
    });
  }

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