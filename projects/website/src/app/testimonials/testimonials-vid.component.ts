import {Component, Inject, OnInit} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { CommonModule } from '@angular/common';
import {MatDialogModule} from '@angular/material/dialog';
import { Video } from './testimonials.component';
import { MatIconModule } from '@angular/material/icon';


/**
 * @title Injecting data when opening a dialog
 */
@Component({
    selector: 'async-testimonial-vedios',
    imports: [MatButtonModule, MatDialogModule, MatIconModule, CommonModule, MatButtonModule],
    standalone: true,
    template: `
   <div class="dialog-title">
        <h2 mat-dialog-title>{{ video.title }}</h2>
        <mat-icon mat-dialog-close class="close-icon">close</mat-icon>
    </div>
    <mat-dialog-content>
        <video controls>
            <source [src]="video.embedUrl" type="video/mp4">
            Your browser does not support the video tag.
        </video>
        {{ video.subtitle }}
    </mat-dialog-content>
    <!-- <mat-dialog-actions>
      <button mat-button (click)="close()">Close</button>
    </mat-dialog-actions> -->
    `,
    styles: [`
     .dialog-title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .close-icon {
            cursor: pointer;
            margin-right: 1em;
        }
    }
        video {
            width: 100%;
            height: 100%;
        }
/* Extra small devices (phones, 600px and down) */
@media only screen and (max-width: 600px) {
    .dialog-title {
        h2 {
            font-size: 10px;
            width: auto;
            padding: 0 1em 0 1em;
        }
    }
}
    `]
    
  })
export class TestimonialsVideosComponent {
    constructor(
        public dialogRef: MatDialogRef<TestimonialsVideosComponent>,
        @Inject(MAT_DIALOG_DATA) public video: Video
    ) {}

    close(): void {
        this.dialogRef.close();
    }
}