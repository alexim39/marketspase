import {Component} from '@angular/core';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';

/** @title Simple form field */
@Component({
  selector: 'async-about-training',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule,MatIconModule, MatSelectModule],
  template: `

      <div class="about-async">

        <div class="text-content">
         
          <h3>
          The MarketSpase Advantage: A Revolution in Online Business.
          </h3>
            <p>
            MarketSpase is the first of its kind, bringing an unprecedented level of simplicity to owning and running a profitable online business, now accessible to the masses. 
            We are pioneering a new era of digital entrepreneurship.
            </p>

          <h3>
          Simplified Digital Business Model
          </h3>
            <p>
            MarketSpase removes the complexities of running a traditional brick-and-mortar business, 
            providing a straightforward and effective digital space to start and grow an online business.
          </p>
        </div>

        <div class="img-content">
          <img src="img/ttable.jpg" alt="About Async Solutions">
        </div>
      </div>


  `,
  styles: [`


    .about-async {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      flex-grow: 1;
      .img-content {
        width: 50%;
        margin-bottom: -0.5em;
        img {
          width: 100%;
        }
      }

      .text-content {
        width: 45%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 2em;
        p {
          text-align: justify;
          font-family: system-ui;
        }
      }
    }





/* Extra small devices (phones, 750px and down) */
@media only screen and (max-width: 750px) {
  .about-async {
    display: flex;
    flex-direction: row;
    .img-content {
      display: none;
    }
    .text-content {
      width: 100%;
      h1 {
        font-size: 1.5em;
      }
      p {
        padding: 0.5em;
      }

    }
  }
}
  `],
})
export class AboutTrainingComponent {}
