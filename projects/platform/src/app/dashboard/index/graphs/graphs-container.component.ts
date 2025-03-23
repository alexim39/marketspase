import { Component } from '@angular/core';
import { SideGraphComponent } from './side-graph.component';
import { MainGraphComponent } from './main-graph.component';

/**
 * @title graphs container
 */
@Component({
  selector: 'async-graphs-contaner',
  template: `
    <section class="container">

      <section class="main">
        <async-main-graph/>
      </section>

      <section class="side">
        <async-side-graph/>
      </section>

    </section>
  `,
    imports: [SideGraphComponent, MainGraphComponent],
  styles: [`
    .container {
      display: flex;
      flex-wrap: wrap; /* Allow wrapping on smaller screens */
      justify-content: space-between;
      align-items: space-between;
      margin: 1em;
    }

    .main {
      flex: 65%; /* Takes 70% of the available space */
      //min-height: 200px; /* Ensure a minimum height */
     // margin-right: 2em;
    }

    .side {
      flex: 29%; /* Takes 30% of the available space */
      //min-height: 200px; /* Ensure a minimum height */
      margin-left: 2em;
    }

    /* Responsive adjustments for smaller screens */
    @media (max-width: 768px) {

      .main {
        margin-right: 0;
        flex: 100%; /* Take full width on smaller screens */
      }
      .side {
        margin-top: 1em;
        margin-left: 0;
        flex: 100%; /* Take full width on smaller screens */
      }
    }
  `],
})
export class GraphsContainerComponent {}