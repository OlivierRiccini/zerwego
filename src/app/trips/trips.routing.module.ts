import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { TripsComponent } from "./trips.component";
import { TripsPreviewComponent } from "./trips-preview/trips-preview.component";

const tripsRoutes: Routes = [
    { path: 'trips',  component: TripsComponent, children: [
        { path: 'preview/:id', component: TripsPreviewComponent },
    ]},
]
@NgModule({
    imports: [
        RouterModule.forChild(tripsRoutes)
    ],
    exports: [RouterModule] 
})
export class TripsRoutingModule { }