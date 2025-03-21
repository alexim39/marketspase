import {Component} from '@angular/core';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';

/** @title Simple form field */
@Component({
  selector: 'async-about-async',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule,MatIconModule, MatSelectModule],
  template: `
      <div class="about-training">
        <div class="text-content">
          <h1>
              MarketSpase: Your Online Business Partner
          </h1>

          <p>
          Welcome to MarketSpase! We're transforming online business to make economic gain accessible to everyone.
          Our platform simplifies building a profitable online business, helping you set up alternative source of income.
          </p>

          <p>
          MarketSpase is owned by Async Groups, a seasoned software development company with extensive experience in creating enterprise-level custom software. 
          With years of expertise in building robust and scalable digital solutions, Async Groups brings a wealth of technical knowledge and innovation to MarketSpase.
          </p>
        </div>
      </div>

  `,
  styles: [`
    .about-training {
      padding: 4em;
      display: flex;
      justify-content: center;
      align-items: center;
      border-top: 1px solid #eee;
      .text-content {
        text-align: center;
        h1 {
          //color: #00838F;
          color: #050111;
          font-size: 3em;
        }

        p {
          text-align: justify;
          font-family: system-ui;
          width: 70em;
        }
      }
    }


/* Extra small devices (phones, 750px and down) */
@media only screen and (max-width: 750px) {
.about-training {
    padding: 1em;
    .text-content {
      h1 {
        font-size: 1.5em;
      }
      p {
        width: 100%;
      }
    }
  }
}

@media only screen and (min-device-width: 601px) and (max-device-width: 1024px) {
  .about-training {
    padding: 1em;
    .text-content {
      h1 {
        font-size: 1.7em;
      }
      p {
        width: 100%;
      }
    }
  }
}

  `],
})
export class AboutAsyncComponent {}
