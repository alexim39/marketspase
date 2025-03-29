import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { PartnerInterface } from '../../../../_common/services/partner.service';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { MatSlideToggleChange, MatSlideToggleModule } from '@angular/material/slide-toggle';
import Swal from 'sweetalert2';
import { SettingsService } from '../system.service';
import { ThemeTogglerService } from './theme-toggle.service';

@Component({
  selector: 'async-dark-theme-settings',
  template: `
    <section>
      <mat-accordion>
        <mat-expansion-panel [expanded]="true">
          <mat-expansion-panel-header>
            <mat-panel-title> Set System Theme </mat-panel-title>
          </mat-expansion-panel-header>

          <p>
            <mat-slide-toggle [checked]="isDarkMode" (change)="toggleTheme($event)">Dark Theme</mat-slide-toggle>
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
  imports: [MatExpansionModule, CommonModule, MatInputModule, MatSlideToggleModule, MatButtonModule, ReactiveFormsModule, MatFormFieldModule],
  providers: [SettingsService, ThemeTogglerService],
})
export class DarkThemeSettingsComponent implements OnInit, OnDestroy {
  @Input() partner!: PartnerInterface;
  subscriptions: Subscription[] = [];

  isDarkMode: boolean = false;

  constructor(
    private settingsService: SettingsService,
    private themeTogglerService: ThemeTogglerService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    if (!this.partner || !this.partner._id) {
      console.error('Partner data is missing!');
      return;
    }

    this.subscriptions.push(
      // Step 1: Fetch theme setting from the backend
      this.settingsService.getThemeSetting(this.partner._id).subscribe({
        next: (res: any) => {
          this.isDarkMode = res.darkMode; // Since res.darkMode is already a boolean
          this.themeTogglerService.setTheme(this.isDarkMode ? 'dark' : 'light');
          localStorage.setItem('selectedTheme', this.isDarkMode ? 'dark' : 'light'); // Store in localStorage for consistency
          this.cdr.markForCheck(); // Ensures UI updates
        },
        error: () => {
          console.warn('Failed to fetch theme from backend, using localStorage fallback.');
          this.isDarkMode = this.themeTogglerService.getTheme() === 'dark';
          this.themeTogglerService.setTheme(this.isDarkMode ? 'dark' : 'light');
        },
      })
    )    
  }


  toggleTheme(event: MatSlideToggleChange): void {
    if (!this.partner || !this.partner._id) {
      console.error('Partner data is missing!');
      return;
    }
  
    this.isDarkMode = event.checked;
  
    const formObject = {
      state: this.isDarkMode,
      partnerId: this.partner._id,
    };
  
    this.sendThemeStateToBackend(formObject);
  }

  private sendThemeStateToBackend(formObject: { state: boolean; partnerId: string }): void {

    this.subscriptions.push(
      this.settingsService.toggleTheme(formObject).subscribe({
        next: () => {
          Swal.fire({
            position: 'bottom',
            icon: 'success',
            text: `You have turned ${formObject.state ? 'on' : 'off'} dark theme in your account`,
            confirmButtonColor: 'rgb(5, 1, 17)',
            timer: 4000,
          });
    
          // Step 3: Update theme in localStorage and apply globally
          this.themeTogglerService.setTheme(formObject.state ? 'dark' : 'light');
          localStorage.setItem('selectedTheme', formObject.state ? 'dark' : 'light'); // Ensure localStorage syncs across sessions
          this.cdr.markForCheck();
        },
        error: () => {
          Swal.fire({
            position: 'bottom',
            icon: 'info',
            text: 'Server error occurred, please try again',
            showConfirmButton: false,
            timer: 4000,
          });
        },
      })
    )
    
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
