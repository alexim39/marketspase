import { AfterViewInit, Component, inject, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';  
import { MatInputModule } from '@angular/material/input';  
import { MatFormFieldModule } from '@angular/material/form-field';  
import { FormsModule } from '@angular/forms';  
import { MatButtonModule } from '@angular/material/button';  
import { MatIconModule } from '@angular/material/icon';  
import { MatTableDataSource, MatTableModule } from '@angular/material/table';  
import { CommonModule } from '@angular/common';  
import { MatDialog } from '@angular/material/dialog';  
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';  
import {MatTabsModule} from '@angular/material/tabs';
import { PartnerInterface } from '../../../_common/services/partner.service';
import { TransactionInterface } from '../paystack.service';
import { TransactionFilterPipe } from './transaction.pipe';
import { RouterModule } from '@angular/router';
import { HelpDialogComponent } from '../../../_common/help-dialog.component';

/**  
 * @title Billing  
 */  
@Component({  
  selector: 'async-transactions',  
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
    .content {
      border-radius: 6px;
    }
  }
}
  
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

.no-campaign {
  text-align: center;
  color: rgb(196, 129, 4);
  font-weight: bold;
}
  
.pending {
  background-color: rgb(254, 254, 244); /* Light yellow for pending */
}

.rejected {
  background-color: rgb(254, 246, 244); /* Light red for pending */
}
  
.success {
  background-color: rgb(222, 251, 211); /* Green for success */
}
  `],  
  templateUrl: 'transactions.component.html',  
  providers: [],  
  imports: [  
    FormsModule,  
    CommonModule,  
    MatPaginatorModule,  
    MatFormFieldModule,  
    MatTableModule,  
    MatInputModule,  
    MatIconModule,  
    MatButtonModule,  
    //TransactionFilterPipe, 
    MatTabsModule,
    RouterModule
  ],  
})  
export class TransactionsComponent implements OnInit, AfterViewInit {  
  @Input() partner!: PartnerInterface;  
  @Input() transactions!: TransactionInterface;  
  readonly dialog = inject(MatDialog);  

  filterText: string = '';  
  displayedColumns: string[] = ['transactionId', 'dateOfPayment', 'amount', 'paymentMethod', 'paymentStatus', 'transactionType', 'action'];  
  dataSource = new MatTableDataSource<any>([]);  
  isEmptyRecord = false;  

  @ViewChild(MatPaginator) paginator!: MatPaginator;  

  constructor(
    
  ) {}  

  ngOnInit() {  

    if (this.transactions && this.transactions.data) {

      // Ensure that the data is an array and sort it  
      this.dataSource.data = this.transactions.data.sort((a, b) => {  
        return new Date(b.date).getTime() - new Date(a.date).getTime();  
      });  

      // Check if there are no records  
      this.isEmptyRecord = this.transactions.data.length === 0;  

    } else {  
      this.isEmptyRecord = true; // Set to true if no transactions are available  
    }  
  }  

  applyFilter() {  
    const filterValue = this.filterText.trim().toLowerCase();  
    this.dataSource.filter = filterValue;  
  }  

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

   // scroll to top when clicked
   scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

   showDescription () {
      this.dialog.open(HelpDialogComponent, {
        data: {help: 'In this section, you can set view and track expenses'},
      });
    }


  
}