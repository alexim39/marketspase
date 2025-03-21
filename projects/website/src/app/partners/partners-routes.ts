import { Routes } from "@angular/router";
import { PartnersContainerComponent } from "./partners.component";
import { PageNotFoundComponent } from './../page-not-found.component';

export const partnersRoutes: Routes = [
    { 
        path: '', 
        //component: IndexComponent, 

        children: [
            { path: '', 
                component: PartnersContainerComponent, 
                title: "MarketSpase",
            },
        ]
    },
    // should be the last path on routes
  {path: '**', component: PageNotFoundComponent}

]
