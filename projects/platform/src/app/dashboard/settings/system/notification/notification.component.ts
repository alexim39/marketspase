import { Component, Input, } from '@angular/core';
import { PartnerInterface } from '../../../../_common/services/partner.service';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { MatExpansionModule } from '@angular/material/expansion';

/**
 * @title Basic expansion panel
 */
@Component({
  selector: 'async-notification',
  template: `
  <section>
    <mat-accordion>

        <mat-expansion-panel [expanded]="true">
          <mat-expansion-panel-header>
            <mat-panel-title> Set System Theme </mat-panel-title>
          </mat-expansion-panel-header>
    
          <p><mat-slide-toggle (click)="toggleNotification()">Turn on notification</mat-slide-toggle></p>

    
        </mat-expansion-panel>
    
        <!-- <mat-expansion-panel>
          <mat-expansion-panel-header>
            <mat-panel-title> Set up WhatsApp Chat Link  </mat-panel-title>
          </mat-expansion-panel-header>
  
    
        </mat-expansion-panel> -->

    </mat-accordion>
</section>
  `,
  styles: [`

section {
  margin-top: 1em;
  form {
      display: flex;
      flex-direction: column;
      width: 50%;
      height: auto;
      mat-hint {
          color: gray;
          margin: 0.5em 0;
      }
      button {
          width: 20%;
          margin-top: 1em;
      }
  }
}

/* Extra small devices (phones, 600px and down) */
@media only screen and (max-width: 600px) {
    section {
        margin-top: 1em;
        form {
            display: flex;
            flex-direction: column;
            width: 100%;
            height: auto;
            mat-hint {
                color: gray;
                margin: 0.5em 0;
            }
            button {
                width: 20%;
                margin-top: 2em;
            }
        }
    }
}
  
  `],
  imports: [MatExpansionModule, CommonModule, MatSlideToggleModule],
  providers: []
})
export class NotificationSettingsComponent {
  @Input() partner!: PartnerInterface;
  subscriptions: Array<Subscription> = [];

  isTurnedOn: boolean = false;


    constructor(
    ) { }


    ngOnInit(): void {
     
    }

    toggleNotification(): void {

    }

   
    ngOnDestroy() {
      // unsubscribe list
      this.subscriptions.forEach(subscription => {
        subscription.unsubscribe();
      });
    }
}
