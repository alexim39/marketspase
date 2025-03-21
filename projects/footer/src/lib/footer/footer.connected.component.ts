import { Component, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { FooterService } from './footer.services';
import Swal from 'sweetalert2';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CommonModule } from '@angular/common';
import {MatSelectModule} from '@angular/material/select';
import { Platform } from '@angular/cdk/platform';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'async-footer-connected',
  standalone: true,
  providers: [FooterService],
  imports: [MatToolbarModule, CommonModule, MatSelectModule, RouterModule, MatProgressBarModule, ReactiveFormsModule, MatIconModule, MatButtonModule, MatTooltipModule, MatFormFieldModule, MatInputModule],
  template: `
      <section>
        <h2>Stay Connected</h2>

        <p>Keep up to date with our business insights and latest news</p>

        <mat-progress-bar color="accent" mode="indeterminate" *ngIf="isSpinning"></mat-progress-bar>


        <article>
          <div class="form-container">
            <form [formGroup]="subscribeForm" (submit)="onSubmit()">
              <input matInput type="email" placeholder="Enter your email to stay abreast" formControlName="email">
              <button [disabled]="subscribeForm.invalid">Go</button>

            </form> 
          </div>
          

          <!-- <button mat-raised-button (click)="lunchWhatsAppGroup()" disabled> <span class="fa fa-whatsapp"></span> WhatsApp Us</button> -->

          <div id="social-media">
            <a href="#" class="fa fa-facebook" title="Facebook" target="_blank"></a>
            <!-- <a href="#" class="fa fa-twitter" title="Twitter" target="_blank"></a> -->
            <!-- <a href="#" class="fa fa-google" title="Google" target="_blank"></a> -->
            <a href="#" class="fa fa-linkedin" title="Linkedin" target="_blank"></a>
            <!-- <a href="#" class="fa fa-youtube" title="Youtube" target="_blank"></a> -->
            <!-- <a href="#" class="fa fa-instagram" title="Instagram" target="_blank"></a> -->
          </div>

          <div id="language">
            <select name="language">
              <option value="">Language</option>
              <option value="English">English</option>
              <!-- <option value="French">French</option> -->
            </select>
          </div>
        </article>

      </section>
  `,
  styles: [`
    section {
      display: flex;
      flex-direction: column;
      color: white;
      p {
        color: #ccc;
        font-size: 0.8em;
      }
      article {
        display: flex;
        flex-direction: column;
        color: white;
        .form-container {
          display: flex;
          justify-content: center;
          align-items: center;
          form {
            display: flex;
            align-items: center;
            width: 100%;
            input {
              height: 2.5em;
              border: none;
              flex: 1; /* Allow the input to grow and take up remaining space */
            }
            button {
              height: 3em;
              //padding: 1em;
              cursor: pointer;

            }
           
          }
        }
        

        #social-media {
          display: flex;
          flex-direction: row;
          a {
           margin-top: 2em;
           margin-right: 10px;
          }

          /* Style all font awesome icons */
          .fa {
            padding: 10px;
            font-size: 10px;
            width: 10px;
            text-align: center;
            text-decoration: none;
            border-radius: 50%;
          }

          /* Add a hover effect if you want */
          .fa:hover {
            opacity: 0.7;
          }

          /* Set a specific color for each brand */
          .fa-facebook {
            background: #3B5998;
            color: white;
          }

          .fa-twitter {
            background: #55ACEE;
            color: white;
          }

          .fa-google {
            background: #dd4b39;
            color: white;
          }

          .fa-linkedin {
            background: #007bb5;
            color: white;
          }

          .fa-youtube {
            background: #bb0000;
            color: white;
          }

          .fa-instagram {
            background: #125688;
            color: white;
          }
        }

        #language {
          margin-top: 1em;
        }

        button {
          color:rgb(90, 91, 91);
          .fa-whatsapp {
            font-size: 1.5em;
          }
        }
      }
    }

  /* iPads/tablet (portrait and landscape) */
  @media only screen and (min-device-width: 601px) and (max-device-width: 1024px) {
    section {
      article {
        .form-container {
          display: flex;
          justify-content: flex-start;
          align-items: flex-start;
          form {
          width: 40%;
        }
        }
      }
    }
  }

  `]
})
export class FooterConnectedComponent implements OnInit {
  subscribeForm!: FormGroup;
  isSpinning = false;
  userDevice = '';
  username!: string;

  constructor(
    private fb: FormBuilder,  
    private footerService: FooterService,
    private platform: Platform
  ) {
    if (this.platform.ANDROID || this.platform.IOS) {
      //console.log('User is using a mobile device.');
      this.userDevice = 'mobile'
    } else {
      //console.log('User is using a desktop device.');
      this.userDevice = 'desktop'
    }

    const storedUsername = localStorage.getItem('username');
    // Retrieve the data from local storage
    if (storedUsername) {
      this.username = storedUsername;
      //console.log('Retrieved data from local storage:', this.username);
    } else {
      //console.log('Data not found in local storage');
    }
  }

  ngOnInit(): void {
    this.subscribeForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      userDevice: this.userDevice,
      username: this.username
    });
  }

  onSubmit() {
    this.isSpinning = true;

    // Mark all form controls as touched to trigger the display of error messages
    this.markAllAsTouched();

    if (this.subscribeForm.valid) {
      const email = this.subscribeForm.value.email;      

      this.footerService.submit({email}).subscribe({

        next: () => {

          Swal.fire({
            position: "bottom",
            icon: 'success',
            text: 'Thank you for subscribing to our email list. We promise not to spam your inbox',
            confirmButtonColor: "rgb(5, 1, 17)",
            timer: 10000
          });
          this.isSpinning = false;

        },
        error: (error: HttpErrorResponse) => {

          Swal.fire({
            position: "bottom",
            icon: 'error',
            text: 'Server error occured, please try again',
            showConfirmButton: false,
            timer: 4000
          });
          this.isSpinning = false;
          
        }

      }     
     )

    }else {
      this.isSpinning = false;
     }
  }


  // Helper method to mark all form controls as touched
  private markAllAsTouched() {
    Object.keys(this.subscribeForm.controls).forEach(controlName => {
      this.subscribeForm.get(controlName)?.markAsTouched();
    });
  }

  lunchWhatsAppGroup() {
    window.open('https://wa.me/message/I5F2NKYKO7JNB1', '_blank');
  }
}
