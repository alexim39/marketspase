import {Component} from '@angular/core';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';

/** @title Simple form field */
@Component({
  selector: 'async-about-story',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule,MatIconModule, MatSelectModule,],
  template: `



      <div class="our-story">

        <div class="img-content">
            <img src="img/story.jpg" alt="About Async Solutions">
        </div>

        <div class="text-content">

            <h3>
            Seamless Online Experience
            </h3>
            <p>
            MarketSpase is a fully digital platform, enabling you to build and manage your business from anywhere, at any time. 
            Our online infrastructure is designed for reliability and accessibility, ensuring a smooth and efficient experience.
            </p>

            <p>
            Getting started with MarketSpase is simple and straightforward. 
            Our platform offers easy onboarding and automated business management. With active ads, the system runs your business for you, and getting started is quick and effortless.            </p>


            <h3>
            Commitment to Your Success
            </h3>
            <p>
            At MarketSpase, we are committed to providing exceptional support and resources to our members. 
            We believe in fostering a collaborative and supportive community where everyone can thrive.


        </div>


      </div>



  `,
  styles: [`

      .our-story {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        flex-grow: 1;
        padding: 4em;

        .img-content {
            width: 50%;
            margin-bottom: -0.5em;
            img {
              width: 100%;
              border-radius: 5%;
            }
        }
      .text-content {
        width: 45%;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        padding: 2em;
        h1 {
          text-align: right;
        }
        p {
          text-align: left;
          font-family: system-ui;
        }
      }
    }


/* Extra small devices (phones, 750px and down) */
@media only screen and (max-width: 750px) {
  .our-story {
    display: flex;
    flex-direction: row;
    padding: 1em;


    .img-content {
      display: none;
    }
    .text-content {
      width: 100%;
      text-align: justify;
    }
  }
}
  `],
})
export class AboutStoryComponent {}
