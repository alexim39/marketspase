import {Component, OnDestroy} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsernameCheckService } from '../_common/services/username-check';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';

/**
 * @title Partners
 */
@Component({
  selector: 'async-partners-container',
  standalone: true,
  imports: [CommonModule],
  providers: [UsernameCheckService],
  template: ``,
})
export class PartnersContainerComponent implements OnDestroy {

  subscriptions: Subscription[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private usernameCheckService: UsernameCheckService
  ) {

    const url = window.location.pathname;
    const username = url.substring(url.lastIndexOf('/') + 1);

    // check if username exist
    this.subscriptions.push(
      this.usernameCheckService.checkUsernameAvailability(username).subscribe({
        next: (returnedObject) => {
          if (returnedObject.username == username) {
            // Store the extracted data in local storage
            localStorage.setItem('username', username);
            this.router.navigate(['/']);
          }
        },error: (error: HttpErrorResponse) => {
          localStorage.removeItem('username');
          localStorage.clear();
          this.router.navigate(['/']);
        }
      })
    )      
  }

  ngOnDestroy() {
    // unsubscribe list
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }
}