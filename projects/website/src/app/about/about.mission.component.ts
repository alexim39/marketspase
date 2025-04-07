import { Component, HostListener } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { NgForOf } from '@angular/common';
import { 
  trigger, 
  state, 
  style, 
  animate, 
  transition,
  query,
  stagger
} from '@angular/animations';

@Component({
  selector: 'async-mission-corevalues',
  imports: [MatCardModule, MatIconModule, NgForOf],
  template: `
    <div class="core-mv-container">
      <section class="hero">
        <h1>Empowering Your Online Journey</h1>
        <p>Discover our mission, vision, and the Values that drive us forward</p>
      </section>

      <section class="mission-vision">
        <div class="card-container" [@staggerAnimation]="cards.length">
          <mat-card class="mv-card" *ngFor="let card of cards; let i = index" 
                    [@cardAnimation]="card.state" 
                    (mouseenter)="onMouseEnter(i)" 
                    (mouseleave)="onMouseLeave(i)">
            <mat-card-header>
              <mat-icon>{{card.icon}}</mat-icon>
              <mat-card-title>{{card.title}}</mat-card-title>
            </mat-card-header>
            <mat-card-content>
              <p>{{card.content}}</p>
            </mat-card-content>
          </mat-card>
        </div>
      </section>

      <section class="core-pillars">
        <h2>Our Core Values</h2>
        <div class="pillar-grid" [@staggerAnimation]="corePillars.length">
          <div *ngFor="let pillar of corePillars; let i = index" 
               class="pillar-card" 
               [@pillarAnimation]="pillar.state" 
               (mouseenter)="onPillarEnter(i)" 
               (mouseleave)="onPillarLeave(i)">
            <!-- <mat-icon>{{pillar.icon}}</mat-icon> -->
            <h3>{{pillar.title}}</h3>
            <p>{{pillar.description}}</p>
          </div>
        </div>
      </section>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }

    .core-mv-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem;
    }

    .hero {
      text-align: center;
      padding: 4rem 0;
      background: linear-gradient(135deg, #ffab40 0%, #000000 100%);
      color: white;
      border-radius: 8px;
      margin-bottom: 4rem;
    }

    .hero h1 {
      // font-size: 3rem;
      // margin-bottom: 1rem;
    }

    .hero p {
      // font-size: 1.2rem;
      // max-width: 600px;
      // margin: 0 auto;
    }

    h2 {
      text-align: center;
      margin-bottom: 2rem;
      //font-size: 2.5rem;
    }

    .card-container, .pillar-grid {
      display: grid;
      gap: 2rem;
    }

    .card-container {
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    }

    mat-card {
      border-radius: 8px;
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
      transition: all 0.3s cubic-bezier(.25,.8,.25,1);
    }

    mat-card:hover {
      box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
    }

    mat-card-header {
      display: flex;
      align-items: center;
      margin-bottom: 1rem;
    }

    mat-icon {
      font-size: 2rem;
      height: 2rem;
      width: 2rem;
      margin-right: 0.5rem;
      color: #ffab40;
      margin-left:10px;
    }

    mat-card-title {
      font-size: 1.5rem;
      font-weight: 500;
    }

    .core-pillars {
      margin-top: 4rem;
    }

    .pillar-grid {
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    }

    .pillar-card {
      padding: 2rem;
      border-radius: 8px;
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
      text-align: justify;
      transition: all 0.3s cubic-bezier(.25,.8,.25,1);
    }

    .pillar-card:hover {
      box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
    }

    .pillar-card mat-icon {
      // font-size: 3rem;
      // height: 3rem;
      // width: 3rem;
      // margin-bottom: 1rem;
    }

    .pillar-card h3 {
      // margin-bottom: 1rem;
      // font-size: 1.3rem;
    }

    @media (max-width: 768px) {
      .container {
        padding: 1rem;
      }

      .hero {
        padding: 2rem 1rem;
      }

      .hero h1 {
        font-size: 2rem;
      }

      .hero p {
        font-size: 1rem;
      }

      .card-container, .pillar-grid {
        grid-template-columns: 1fr;
      }

      h2 {
        font-size: 2rem;
      }
    }
  `],
  animations: [
    trigger('cardAnimation', [
      state('default', style({ transform: 'scale(1)' })),
      state('hovered', style({ transform: 'scale(1.05)' })),
      transition('default => hovered', animate('200ms ease-out')),
      transition('hovered => default', animate('200ms ease-in'))
    ]),
    trigger('pillarAnimation', [
      state('default', style({ transform: 'translateY(0)' })),
      state('hovered', style({ transform: 'translateY(-10px)' })),
      transition('default => hovered', animate('200ms ease-out')),
      transition('hovered => default', animate('200ms ease-in'))
    ]),
    trigger('staggerAnimation', [
      transition('* => *', [
        query(':enter', style({ opacity: 0, transform: 'translateY(50px)' }), { optional: true }),
        query(':enter', stagger('100ms', [
          animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
        ]), { optional: true })
      ])
    ])
  ]
})
export class MissionCorevaluesComponent {
  cards = [
    { 
      icon: 'rocket_launch', 
      title: 'Our Mission', 
      content: `We provide innovative, simplified digital solutions for creating sustainable passive income.`, 
      state: 'default' 
    },
    { 
      icon: 'visibility', 
      title: 'Our Vision', 
      content: `We are committed to providing a leading platform that makes profitable digital entrepreneurship a reality for all.`, 
      state: 'default' 
    }
  ];

  corePillars = [
    {
      icon: 'school',
      title: 'Empowerment',
      description: 'We are dedicated to providing the tools and support you need to take control of your financial future.',
      state: 'default'
    },
    {
      icon: 'fitness_center',
      title: 'Innovation',
      description: 'We leverage cutting-edge digital solutions to streamline your business operations and maximize your earning potential.',
      state: 'default'
    },
    {
      icon: 'favorite',
      title: 'Simplicity',
      description: 'We believe in making entrepreneurship accessible by simplifying complex processes into intuitive, user-friendly experiences.',
      state: 'default'
    },
    {
      icon: 'trending_up',
      title: 'Integrity',
      description: ' We uphold the highest standards of honesty and transparency in all our business practices.',
      state: 'default'
    }
  ];

  onMouseEnter(index: number) {
    this.cards[index].state = 'hovered';
  }

  onMouseLeave(index: number) {
    this.cards[index].state = 'default';
  }

  onPillarEnter(index: number) {
    this.corePillars[index].state = 'hovered';
  }

  onPillarLeave(index: number) {
    this.corePillars[index].state = 'default';
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    // You can add scroll-based animations or effects here
  }
}