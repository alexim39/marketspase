import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { PartnerInterface } from '../../../_common/services/partner.service';

@Component({
  selector: 'async-main-graph',
  imports: [CommonModule, MatTableModule, CommonModule, MatButtonModule],
  template: `
    <div class="card">
      <div class="header">
        <h3>Traffic Sources</h3>
        <button mat-raised-button color="primary">Actions</button>
      </div>

      <table mat-table [dataSource]="dataSource" class="mat-elevation-z2">
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

      table {
        width: 100%;
      }
     
    `,
  ],
})
export class MainGraphComponent {
  @Input() partner!: PartnerInterface;



  
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
