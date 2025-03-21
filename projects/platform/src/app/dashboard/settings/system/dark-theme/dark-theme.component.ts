import { Component, inject, Input, signal} from '@angular/core';
import {MatExpansionModule} from '@angular/material/expansion';
import { PartnerInterface } from '../../../../_common/services/partner.service';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { ReactiveFormsModule, } from '@angular/forms';  
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { ThemeTogglerService } from '../../../../_common/services/theme-toggle.service';
/**
 * @title Basic expansion panel
 */
@Component({
  selector: 'async-dark-theme-settings',
  template: `
  <section>
    <mat-accordion>

        <mat-expansion-panel [expanded]="true">
          <mat-expansion-panel-header>
            <mat-panel-title> Set System Theme </mat-panel-title>
          </mat-expansion-panel-header>
    
          <p><mat-slide-toggle (click)="toggleTheme()">Dark Theme</mat-slide-toggle></p>

    
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
  imports: [MatExpansionModule, CommonModule, MatInputModule, MatSlideToggleModule, MatButtonModule, ReactiveFormsModule, MatFormFieldModule],
  providers: []
})
export class DarkThemeSettingsComponent {
  @Input() partner!: PartnerInterface;
  subscriptions: Array<Subscription> = [];

  isDarkMode: boolean = false;

  

  

    constructor(
      private themeTogglerService: ThemeTogglerService,
    ) { }


    ngOnInit(): void {
      const currentTheme = this.themeTogglerService.getTheme();
      this.themeTogglerService.setTheme(currentTheme);
    }

    toggleTheme() {
      const currentTheme = this.themeTogglerService.getTheme();
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      // toggle icon
      if (newTheme === 'dark') {
        this.isDarkMode = true;
      } else {
        this.isDarkMode = false;
      }
      this.themeTogglerService.setTheme(newTheme);
    }

   
    ngOnDestroy() {
      // unsubscribe list
      this.subscriptions.forEach(subscription => {
        subscription.unsubscribe();
      });
    }
}
