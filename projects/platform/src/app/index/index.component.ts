import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavComponent } from '../index/nav/nav.component';
import { FooterLibrary } from '../../../../footer/src/public-api';
@Component({
  selector: 'async-index',
  standalone: true,
  imports: [RouterModule, NavComponent, FooterLibrary],
  template: `
    <async-nav/>
    <router-outlet/>
    <lib-footer/>
  `,
  styles: ``
})
export class IndexComponent {}
