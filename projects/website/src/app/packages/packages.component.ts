import { Component, inject, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule } from '@angular/router';
import {MatCardModule} from '@angular/material/card';
import { MatDialogModule} from '@angular/material/dialog';
import { PaymentDialogComponent } from './payment-dialog.component';
import {
  MatDialog,
} from '@angular/material/dialog'
import { CommonModule } from '@angular/common';

/**
 * @title Packages component
 */
@Component({
  selector: 'async-packages',
  templateUrl: 'packages.component.html',
  styleUrls: ['packages.component.scss', 'packages.mobile.scss'],
  standalone: true,
  imports: [MatButtonModule, CommonModule, MatDividerModule, MatDialogModule, MatCardModule, RouterModule, MatIconModule, MatExpansionModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, MatNativeDateModule, MatSelectModule],
})
export class PackagesComponent {

  readonly dialog = inject(MatDialog);

  // scroll to top when clicked
  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  openDialog(amount: number): void {
    const dialogRef = this.dialog.open(PaymentDialogComponent, {
      data: {amount: amount},
    });
  }


}