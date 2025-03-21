import { Routes } from "@angular/router";
import { GetStartedComponent } from "./get-started.component";
import { ConfirmationComponent } from "./confirmation/confirmation.component";
import { ExistingUserComponent } from "./existing-user/existing-user.component";

export const getStartedRoutes: Routes = [
    { 
        path: '', 
        //component: IndexComponent, 

        children: [
            { path: '', 
                component: GetStartedComponent, 
                title: "Getting Started - First step with MarketSpase",
            },
            { path: 'new-confirmation', 
                component: ConfirmationComponent, 
                title: "Survey Confirmation - Thank you for starting with MarketSpase"
            },
            { path: 'returning-confirmation', 
                component: ExistingUserComponent, 
                title: "Survey Confirmation - Thank you for starting with MarketSpase"
            }
        ]
    },

]
