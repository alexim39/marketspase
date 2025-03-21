import { Component } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';

/** @title Async training approach page */
@Component({
  selector: 'async-about-approach',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatIconModule, MatSelectModule],
  template: `

      <div class="training-approach">

        <div class="approach-card">
          <div class="title">
            <mat-icon>payments</mat-icon>
            <h1>Financial Benefits</h1>
          </div>
          <div class="content">
              <ul>
                <li>
                  <p>
                  Your earnings increase over time as your business grows.
                </p>
                </li>
            

                <li>
                  <p>
                  Residual Income: You build an online business that continues to earn even when you're no longer working.
                </p>
                </li>
              </ul>
          </div>
        </div>

        <div class="approach-card">
          <div class="title">
            <mat-icon fontIcon="lightbulb"></mat-icon>
            <h1>Freedom Benefits</h1>
          </div>
          <div class="content">
              <ul>
                
                <li>
                  <p>
                  Flexibility: MarketSpase allows you to run your business from anywhere in the world and on your own schedule.
                  </p>
                </li>

                <li>
                  <p>
                  Be Your Own Boss: You set your own working hours.
                  </p>
                </li>


              </ul>
            </div>
        </div>

        <div class="approach-card">
          <div class="title">
            <mat-icon fontIcon="approval_delegation"></mat-icon>
            <h1>Additional Benefits</h1>
          </div>
          <div class="content">
           <ul>

            <li>
              <p>
              MarketSpase allows you to start an online business with low initial startup costs compared to traditional businesses.
              </p>
            </li>

            <li>
              <p>
              MarketSpase is a community of business owners with a strong culture of supporting its members to succeed
              </p>
            </li>


           </ul>
          </div>
        </div>


      </div>

  `,
  styles: [`
    .training-approach {
      background-color:rgb(5, 1, 17);
      display: flex;
      flex-direction: row;
      justify-content: space-evenly;
      padding: 3em;
      align-items: center;

      .approach-card {
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .title {
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-content: center;
          color: white;
          h1 {
            font-size: 1.5em;
            margin-top: -0.2em;
            font-family: system-ui;
          }
          mat-icon {
            //border-radius: 50%;
            color: white;
            //border: 1px solid white;
            transform: scale(2);
            margin-right: 1em;
          }
        }

        .content {
          color: white;
          font-size: 0.9em;
          padding-left: 3em;
          p {
            line-height: 2em;
            text-align: justify;
          }
        }
      }
    }


/* Extra small devices (phones, 1500px and down) */
@media only screen and (max-width: 1500px) {
  .training-approach {
      display: flex;
      flex-direction: column;
      padding: 1em;
      .approach-card {
        margin-top: 2em;
      }

      .content {
          color: white;
          font-size: 0.9em;
        }


  }
}
  `],
})
export class AboutApproachComponent { }
