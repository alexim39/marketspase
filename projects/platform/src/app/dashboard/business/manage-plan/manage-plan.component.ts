import { AfterViewInit, Component, inject, Input, SimpleChanges, ViewChild } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTabsModule } from '@angular/material/tabs';
import { PartnerInterface } from '../../../_common/services/partner.service';
import { RouterModule } from '@angular/router';
import { HelpDialogComponent } from '../../../_common/help-dialog.component';
import { PlanInterface } from '../new-plan.service';

/**  
 * @title Manage plan  
 */
@Component({
  selector: 'async-manage-plan',
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
  }
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
  templateUrl: 'manage-plan.component.html',
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
    MatTabsModule,
    RouterModule
  ],
})
export class ManagePlanComponent implements AfterViewInit {
  @Input() partner!: PartnerInterface;
  @Input() plans: Array<PlanInterface> = [];
  readonly dialog = inject(MatDialog);

  filterText: string = '';
  displayedColumns: string[] = ['id', 'plan', 'amount', 'status', 'date', 'action'];
  dataSource = new MatTableDataSource<any>([]);
  isEmptyRecord = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['plans'] && changes['plans'].currentValue) {
      this.updateTableData();
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator; // Ensure paginator is assigned after view init
  }

  private updateTableData() {
    if (this.plans.length) {
      this.dataSource.data = [...this.plans].sort((a: any, b: any) => {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });

      this.isEmptyRecord = false;
    } else {
      this.isEmptyRecord = true;
    }

    // Ensure paginator is set AFTER data assignment
    setTimeout(() => {
      if (this.paginator) {
        this.dataSource.paginator = this.paginator;
      }
    });
  }

  applyFilter() {
    this.dataSource.filter = this.filterText.trim().toLowerCase();
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  showDescription() {
    this.dialog.open(HelpDialogComponent, {
      data: { help: 'In this section, you can view and track your business plans' },
    });
  }
}