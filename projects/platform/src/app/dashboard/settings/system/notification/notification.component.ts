import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { PartnerInterface } from '../../../../_common/services/partner.service';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { MatSlideToggleChange, MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatExpansionModule } from '@angular/material/expansion';
import Swal from 'sweetalert2';
import { SettingsService, NotificationInterface } from '../system.service';
import { HttpErrorResponse } from '@angular/common/http';

/**
 * @title Notification settings
 */
@Component({
  selector: 'async-notification',
  template: `
    <section>
      <mat-accordion>
        <mat-expansion-panel [expanded]="true">
          <mat-expansion-panel-header>
            <mat-panel-title> Set (Email) Notification </mat-panel-title>
          </mat-expansion-panel-header>

          <p>
            <mat-slide-toggle [checked]="isTurnedOn" (change)="toggleNotification($event)">
              Turn on notification
            </mat-slide-toggle>
          </p>
        </mat-expansion-panel>
      </mat-accordion>
    </section>
  `,
  styles: [
    `
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
    `,
  ],
  imports: [MatExpansionModule, CommonModule, MatSlideToggleModule],
  providers: [SettingsService],
})
export class NotificationSettingsComponent implements OnInit, OnDestroy {
  @Input() partner!: PartnerInterface;
  subscriptions: Array<Subscription> = [];

  isTurnedOn: boolean = false;

  constructor(
     private settingsService: SettingsService,
  ) {}

  ngOnInit(): void {
    this.isTurnedOn = this.partner.notification;
  }

  toggleNotification(event: MatSlideToggleChange): void {
    this.isTurnedOn = event.checked;

    const formObject = {
      state: this.isTurnedOn,
      partnerId: this.partner._id 
    }

    // Example of sending to backend (replace with your actual backend call)
    this.sendNotificationStateToBackend(formObject);
  }

  private sendNotificationStateToBackend(formObject: NotificationInterface): void {
    // Replace this with your actual backend API call
    // Example using fetch (you might use HttpClient in Angular)
    
    this.subscriptions.push(

      this.settingsService.toggleNotification(formObject).subscribe({
        next: (res) => {
          Swal.fire({
            position: "bottom",
            icon: 'success',
            text: `You have turned ${formObject.state ? 'on' : 'off'} notifications in your account`,
            confirmButtonColor: "rgb(5, 1, 17)",
            timer: 4000,
          });
        },
        error: (error: HttpErrorResponse) => {
          Swal.fire({
            position: "bottom",
            icon: 'info',
            text: 'Server error occured, please try again',
            showConfirmButton: false,
            timer: 4000
          })
        }
      })
    );
  }

  ngOnDestroy() {
    // unsubscribe list
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }
}