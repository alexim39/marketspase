import { Routes } from "@angular/router";
import {VideosComponent} from './videos.component';

export const videosRoutes: Routes = [
    /* {
        path: '',
        redirectTo: 'home'
    }, */
    { 
        path: '', 
        //component: IndexComponent, 

        children: [
            { path: '', 
                component: VideosComponent, 
                title: "Video - Video resources for diamond project",
            },
           /*  { path: 'testimonials', 
                component: TestimonialsComponent, 
                title: "Members Testimonials - See members testimonies"
            }, */
           /*  { path: 'connected-economy', 
                component: ConnectedEconomyComponent, 
                title: "Connected Economy - See more members testimonies"
            }, */
           /*  { path: 'get-involved', 
                component: GettingInvolvedComponent, 
                title: "Project Summary - Get involved as a member"
            }, */

        ]
    },

]
