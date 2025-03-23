import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SpinnerComponent } from './_common/services/loader/spinner.component';
@Component({
  selector: 'async-root',
  imports: [RouterOutlet, SpinnerComponent],
  template: `
  <async-spinner/>
  <div class="container">
    <router-outlet/>
  </div>
  
  `,
  styles: [`

.container {
  animation: fadeInAnimation ease 3s;
}
@keyframes fadeInAnimation {
  0% {
      opacity: 0;
  }
  100% {
      opacity: 1;
  }
}

/* Extra small devices (phones, 600px and down) */
@media only screen and (max-width: 600px) {
  .container {
    display:flex;
    flex-direction: column;
  }
}
  `]
})
export class AppComponent {}
