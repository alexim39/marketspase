import { Component } from '@angular/core';
import { BaseFooterComponent } from './footer/footer.component';

@Component({
  selector: 'lib-footer',
  imports: [BaseFooterComponent],
  template: `
    <async-footer/>
  `,
  styles: ``
})
export class FooterLibrary {

}
