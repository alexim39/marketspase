import { Component, inject, Input, OnInit, signal} from '@angular/core';
import { PartnerInterface } from '../../../_common/services/partner.service';
import { MatDialog } from '@angular/material/dialog';
import { HelpDialogComponent } from '../../../_common/help-dialog.component';
import { MatIconModule } from '@angular/material/icon';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Router, RouterModule } from '@angular/router';
import { ContactService } from './contacts.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core'; // For native date adapter  
import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';

/**
 * @title Support Contact
 */
@Component({
  selector: 'async-contacts',
  templateUrl: 'contacts.component.html',
  styles: [`
  .async-background {
    margin: 2em;
    .async-container {
        border-radius: 10px;
        height: 100%;
        padding: 1em;
        .title {
            display: flex;
            justify-content: space-between;
            border-bottom: 1px solid #ccc;
            margin-bottom: 1em;
            padding: 1em;
            .action-area {
                .action {
                    font-weight: bold;
                    margin-top: 1em;
                }
            }
        }
    }
    mat-icon {
        cursor: pointer;
    }
}


.form-container {
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  .flex-form {
    display: flex;
    //flex-wrap: wrap;
    flex-direction: column;
    gap: 20px;
    .form-group {
      display: flex;
      flex-direction: column;
      mat-form-field {
        width: 40%;
      }
    }  
    button {
      width: 20%;
    }  
  }
}


@media (max-width: 800px) {
  .form-container {
 
  .flex-form {
    display: flex;
    flex-direction: column;
    gap: 20px;
    .form-group {
      display: flex;
      flex-direction: column;
      mat-form-field {
        width: 100%;
      }
    }  
    button {
      width: 100%;
    }  
  }
}
 
}

  `],
  standalone: true,
  providers: [ContactService],
  imports: [CommonModule, MatIconModule, RouterModule, MatNativeDateModule, MatDatepickerModule, MatExpansionModule, MatFormFieldModule, MatButtonModule, FormsModule,MatInputModule, ReactiveFormsModule,MatSelectModule],
})
export class SubmitRequestComponent implements OnInit {
  //readonly panelOpenState = signal(false);
  
    @Input() partner!: PartnerInterface;
    readonly dialog = inject(MatDialog);

    SupprtRequestForm!: FormGroup;
    subscriptions: Array<Subscription> = [];

    constructor(
     private contactService: ContactService,
      private router: Router,
    ) {
    }


    ngOnInit(): void {
      //console.log(this.partner)

      if (this.partner) {
        this.SupprtRequestForm = new FormGroup({
          subject: new FormControl('', Validators.required),
          message: new FormControl('', Validators.required),
          email: new FormControl(this.partner.email, Validators.required),
          name: new FormControl(this.partner.name, Validators.required),
          surname: new FormControl(this.partner.surname, Validators.required),
        });
      }
    }

    onSubmit() {
      this.markAllAsTouched();

      if (this.SupprtRequestForm.valid) {
        const contactObject = this.SupprtRequestForm.value;

        this.subscriptions.push(
          this.contactService.submit(contactObject).subscribe({
            next: (res: any) => {
              Swal.fire({
                position: "bottom",
                icon: 'success',
                text: 'Thank you for reaching out to us. We will respond to your message via email shortly',
                confirmButtonColor: "rgb(5, 1, 17)",
                timer: 10000
              });
            },
            error: (error: HttpErrorResponse) => {
              Swal.fire({
                position: "bottom",
                icon: 'error',
                text: 'Server error occurred, please try again',
                showConfirmButton: false,
                timer: 4000
              });
            }
          })
        )
      }
      this.SupprtRequestForm.markAllAsTouched();
    }

    showDescription () {
      this.dialog.open(HelpDialogComponent, {
        data: {help: `
          Contact the application administrator for assistance, feedback, and suggestions for improvement.

          <p>Feel free to share any challenges you encounter while using the app, along with any suggestions for improvements or features you would like to see added.</p>
        `},
      });
    }

  private markAllAsTouched(): void {
    Object.keys(this.SupprtRequestForm.controls).forEach((controlName) => {
      this.SupprtRequestForm.get(controlName)?.markAsTouched();
    });
  }

  ngOnDestroy() {
    // unsubscribe list
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
