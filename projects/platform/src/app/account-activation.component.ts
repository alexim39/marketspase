import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http'; // Import HttpClient
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-account-activation',
  standalone: true,
  imports: [MatButtonModule, CommonModule, MatIconModule, RouterModule],
  styles: [`
    * {
      padding: 0;
      margin: 0;
      outline: 0;
      color: #444;
      box-sizing: border-box;
      font-family: 'IBM Plex Sans', sans-serif;
    }

    .page_activation {
      padding: 40px 0;
      font-family: 'Arvo', serif;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }

    .activation_bg {
      height: 400px;
      width: 50%;
      background-position: center;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .contant_box_activation {
      margin-top: -10em;
      text-align: center;
      h3 {
        font-size: 20px;
      }
      p {
        padding: 1em 0;
      }
      button {
        padding: 1em;
      }
    }

    /* Extra small devices (phones, 600px and down) */
    @media only screen and (max-width: 600px) {
      .contant_box_activation {
        padding: 1em;
        h3 {
          font-family: Cursive;
          font-size: 10px;
        }
        p {
          padding: 1em 0;
        }
        button {
          padding: 1em;
        }
      }
    }
  `],
  template: `
    <section class="page_activation">
      <div class="activation_bg">
        <h3 class="text-center" *ngIf="!activationSuccess && !activationError">Activating...</h3>
        <h3 class="text-center" *ngIf="activationSuccess">Activated!</h3>
        <h3 class="text-center" *ngIf="activationError">Activation Failed</h3>
      </div>

      <div class="contant_box_activation">
        <h3 class="h3" *ngIf="!activationSuccess && !activationError">Please wait while we activate your account.</h3>
        <h3 class="h3" *ngIf="activationSuccess" style="color: green; margin-bottom: 1em;">Your account has been successfully activated!</h3>
        <h3 class="h3" *ngIf="activationError" style="color: red;">Account activation failed. Please try again or contact support.</h3>
        <p *ngIf="!activationSuccess && !activationError">This process may take a few moments.</p>
        <p *ngIf="activationError">{{errorMessage}}</p>
        <button mat-flat-button color="accent" routerLink="/dashboard" routerLinkActive="active-link" [routerLinkActiveOptions]="{ exact: true }">
          Go to Home
        </button>
      </div>
    </section>
  `,
})
export class AccountActivationComponent implements OnInit {
  activationSuccess = false;
  activationError = false;
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const partnerId = params['id'];
      if (partnerId) {
        this.activateAccount(partnerId);
      } else {
        this.activationError = true;
        this.errorMessage = 'Invalid activation link.';
      }
    });
  }

  activateAccount(partnerId: string) {
    this.http.get<{ success: boolean; message: string }>(`https://marketspase-96hm2qxb.b4a.run/partners/activation/${partnerId}`) // Adjust the API endpoint
      .subscribe({
        next: (response) => {
          if (response.success) {
            this.activationSuccess = true;
          } else {
            this.activationError = true;
            this.errorMessage = response.message;
          }
        },
        error: (error) => {
          this.activationError = true;
          this.errorMessage = 'An error occurred during activation.';
          console.error('Activation error:', error);
        },
      });
  }
}