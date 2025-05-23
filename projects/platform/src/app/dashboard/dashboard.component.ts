import { ChangeDetectorRef, Component, inject, OnDestroy } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AsyncPipe } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { Observable, Subscription } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Router, RouterModule, } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { MatMenuModule } from '@angular/material/menu';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { PartnerInterface, PartnerService } from '../_common/services/partner.service';
import { AuthService } from '../auth/auth.service';
import { MatTooltipModule } from '@angular/material/tooltip';
import { LogoLibrary } from '../../../../logo/src/public-api';
import { HttpErrorResponse } from '@angular/common/http';
import {MatBadgeModule} from '@angular/material/badge';
import { DashboardFooterComponent } from './footer.component';
import { SettingsService } from './settings/system/system.service';
import { ThemeTogglerService } from './settings/system/dark-theme/theme-toggle.service';

type SubmenuKey = 'tools' | 'community' | 'analytics' | 'settings' | 'activities' | 'mentorship' | 'help' | 'training' | 'wibinarsEvents' | 'dailyActivity' | 'achievements';

@Component({
  selector: 'async-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [PartnerService, AuthService, SettingsService, ThemeTogglerService],
  imports: [
    MatToolbarModule, MatMenuModule, MatButtonModule, ProfileComponent, MatSidenavModule, MatListModule, MatIconModule, AsyncPipe, RouterModule, CommonModule,
    MatTooltipModule, LogoLibrary, MatBadgeModule, DashboardFooterComponent
  ],
  animations: [
    trigger('submenuToggle', [
      state('closed', style({
        height: '0',
        overflow: 'hidden',
        opacity: 0,
      })),
      state('open', style({
        height: '*',
        overflow: 'hidden',
        opacity: 1,
      })),
      transition('closed <=> open', [
        animate('300ms ease-in-out')
      ]),
    ])
  ],
})
export class DashboardComponent implements OnDestroy {
  private breakpointObserver = inject(BreakpointObserver);

  subscriptions: Subscription[] = [];

  isMobile!: boolean;
  isTablet!: boolean;
  isDesktop!: boolean;

  //isLoading: boolean = false;

  submenus: Record<SubmenuKey, boolean> = {
    tools: false,
    community: false,
    analytics: false,
    settings: false,
    activities: false,
    mentorship: false,
    training: false,
    help: false,
    wibinarsEvents: false,
    dailyActivity: false,
    achievements: false,
  };

  subSubmenus: Record<string, boolean> = {};

  partner!: PartnerInterface;

  // Set this to true to simulate a notification; false for no notifications.
  hasNotification: boolean = false;

  isDarkMode: boolean = false;


  constructor(
    private deviceService: DeviceDetectorService,
    private router: Router,
    private authService: AuthService,
    private partnerService: PartnerService,
    private settingsService: SettingsService,
     private themeTogglerService: ThemeTogglerService,
    private cdr: ChangeDetectorRef,
  ) {  }

  ngOnInit(): void {
    
    this.isMobile = this.deviceService.isMobile();
    this.isTablet = this.deviceService.isTablet();
    this.isDesktop = this.deviceService.isDesktop();

    this.subscriptions.push(
      this.partnerService.getPartner().subscribe({
        next: (response) => {

         if (response.success) {
          this.partner = response.user as PartnerInterface;
          //Emitters.authEmitter.emit(true);
          this.partnerService.updatePartnerService(this.partner);

          // Apply the right theme for user
          this.settingsService.getThemeSetting(this.partner._id).subscribe({
            next: (response) => {
             if (response.success) {
              this.isDarkMode = response.darkMode; // Since res.darkMode is already a boolean
              this.themeTogglerService.setTheme(this.isDarkMode ? 'dark' : 'light');
              localStorage.setItem('selectedTheme', this.isDarkMode ? 'dark' : 'light'); // Store in localStorage for consistency
              this.cdr.markForCheck(); // Ensures UI updates
            }
            },
            error: () => {
              // Default to light mode for new users
              this.themeTogglerService.setTheme('light');
            },
          })
         }
        },
        error: (error: HttpErrorResponse) => {
          //Emitters.authEmitter.emit(false);
          this.router.navigate(['/']);
        }
      })
    );
  }


  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

    private onMenuClick(drawer: any): void {
      this.isHandset$.subscribe(isHandset => {
        if (isHandset) {
          drawer.close();
        }
      });
    }

  scrollToTop(drawer: any) {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    this.onMenuClick(drawer); // Close the drawer if on mobile
  }

  signOut(): void {
    // Clear any stored session data
    localStorage.clear();
    sessionStorage.clear();
  
    // Call backend signOut API
    this.subscriptions.push(
      this.authService.signOut({}).subscribe({
        next: (response) => {
          if (response.success) {
            localStorage.removeItem('authToken'); // Remove token from localStorage
            // Navigate to the login page
            this.router.navigate(['/'], { replaceUrl: true });
          }
        },
        error: (error: HttpErrorResponse) => {
          console.error('Error during sign out:', error);
          this.router.navigate(['/'], { replaceUrl: true });
        }
      })
    );
    this.scrollToTop(null); // Close the drawer if on mobile
  }
  

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }

  toggleSubmenu(menu: SubmenuKey) {
    for (let key in this.submenus) {
      if (key !== menu) {
        this.submenus[key as SubmenuKey] = false;
      }
    }
    this.submenus[menu] = !this.submenus[menu];
  }

  isSubmenuOpen(menu: SubmenuKey): boolean {
    return this.submenus[menu];
  }

  toggleSubSubmenu(submenu: string) {
    this.subSubmenus[submenu] = !this.subSubmenus[submenu];
  }

  isSubSubmenuOpen(submenu: string): boolean {
    return this.subSubmenus[submenu];
  }
}
