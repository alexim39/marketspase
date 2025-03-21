import { Component, Input } from '@angular/core';
import { BaseLogoComponent } from './base-logo.component';

@Component({
  selector: 'lib-logo',
  imports: [BaseLogoComponent],
  template: `
    <async-logo/>
  `,
  styles: ``
})
export class LogoLibrary {}
