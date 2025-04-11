import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { PartnerInterface } from '../../../_common/services/partner.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'async-main-graph',
  imports: [CommonModule, MatTableModule, CommonModule, MatButtonModule, MatCardModule],
  template: `

<div class="card">
  <div class="header">
    <h3>Traffic Sources</h3>
    <button mat-raised-button color="primary">Actions</button>
  </div>

  <!-- Responsive Table Container -->
  <div class="table-container">
    <table *ngIf="!isHandset" mat-table [dataSource]="dataSource" class="mat-elevation-z2">
      <ng-container matColumnDef="date">
        <th mat-header-cell *matHeaderCellDef> Date </th>
        <td mat-cell *matCellDef="let element"> {{ element.date }} </td>
      </ng-container>

      <ng-container matColumnDef="facebook">
        <th mat-header-cell *matHeaderCellDef> Facebook</th>
        <td mat-cell *matCellDef="let element"> {{ element.websiteBlog }} </td>
      </ng-container>

      <ng-container matColumnDef="youtube">
        <th mat-header-cell *matHeaderCellDef> Youtube</th>
        <td mat-cell *matCellDef="let element"> {{ element.socialMedia }} </td>
      </ng-container>

      <ng-container matColumnDef="linkedin">
        <th mat-header-cell *matHeaderCellDef> Linkedin</th>
        <td mat-cell *matCellDef="let element"> {{ element.socialMedia }} </td>
      </ng-container>
      
      <ng-container matColumnDef="google">
        <th mat-header-cell *matHeaderCellDef> Google (Search Engine)</th>
        <td mat-cell *matCellDef="let element"> {{ element.socialMedia }} </td>
      </ng-container>

      <ng-container matColumnDef="tiktok">
        <th mat-header-cell *matHeaderCellDef> Tiktok</th>
        <td mat-cell *matCellDef="let element"> {{ element.socialMedia }} </td>
      </ng-container>

      <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
      <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
    </table>
  </div>

  <!-- Mobile view -->
  <div *ngIf="isHandset">
    <mat-card class="table" *ngFor="let row of dataSource">
      <mat-card-content>
        <div class="row">
          <span class="label">Date:</span>
          <span class="value">{{ row.date }}</span>
        </div>
        <div class="row">
          <span class="label">Facebook:</span>
          <span class="value">{{ row.websiteBlog }}</span>
        </div>
        <div class="row">
          <span class="label">Youtube:</span>
          <span class="value">{{ row.socialMedia }}</span>
        </div>
        <div class="row">
          <span class="label">Linkedin:</span>
          <span class="value">{{ row.socialMedia }}</span>
        </div>
        <div class="row">
          <span class="label">Google:</span>
          <span class="value">{{ row.socialMedia }}</span>
        </div>
        <div class="row">
          <span class="label">Tiktok:</span>
          <span class="value">{{ row.socialMedia }}</span>
        </div>
      </mat-card-content>
    </mat-card>
  </div>


</div>



  `,
  styles: [
    `
.card {
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.table-container {
  width: 100%;
  overflow-x: auto; /* Enable horizontal scrolling */
}

table {
  width: 100%;
  min-width: 600px; /* Ensure table has a minimum width */
}

th, td {
  white-space: nowrap; /* Prevent text wrapping */
  text-align: left;
  padding: 8px 16px;
}

@media (max-width: 600px) {
  .header h3 {
    font-size: 1rem; /* Adjust header font size for smaller screens */
  }

  th, td {
    font-size: 0.9rem; /* Adjust table font size for smaller screens */
    padding: 6px 12px; /* Reduce padding for smaller screens */
  }
}
     
    `,
  ],
})
export class MainGraphComponent {
  @Input() partner!: PartnerInterface;
  isHandset: boolean = false;


  constructor(private breakpointObserver: BreakpointObserver) {
    this.breakpointObserver.observe([
      Breakpoints.Handset,
    ]).subscribe(result => {
      this.isHandset = result.matches;
    });
  }
  
  displayedColumns: string[] = ['date', 'facebook', 'youtube', 'linkedin', 'google', 'tiktok'];
  dataSource = [
    { date: '01 Jan', websiteBlog: 500, socialMedia: 30 },
    { date: '02 Jan', websiteBlog: 600, socialMedia: 40 },
    { date: '03 Jan', websiteBlog: 550, socialMedia: 35 },
    { date: '04 Jan', websiteBlog: 300, socialMedia: 20 },
    { date: '05 Jan', websiteBlog: 700, socialMedia: 45 },
    { date: '06 Jan', websiteBlog: 400, socialMedia: 25 },
  ];
}
