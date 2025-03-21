import { Routes } from "@angular/router";
import { IndexComponent } from "./index.component";
import { IndexBodyComponent } from "./index-body.component";
import { SigninComponent } from "../auth/signin/signin.component";

export const IndexRoutes: Routes = [
    {
        path: '',
        component: IndexComponent,
        children: [
            {
                path: '',
                component: IndexBodyComponent,
                children: [
                    {
                        path: '',
                        redirectTo: 'signin',
                        pathMatch: 'full'
                    },
                    {
                        path: 'signin',
                        component: SigninComponent,
                        title: "MarketSpase Platform Page - Auth verification",
                    }
                ]
            },           
        ]
    }
];