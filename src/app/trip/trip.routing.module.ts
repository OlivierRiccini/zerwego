import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { TripComponent } from "./trip.component";
import { TripFormComponent } from "./trip-form/trip-form.component";
import { TripOverviewComponent } from "./trip-overview/trip-overview.component";

const tripRoutes: Routes = [
    { path: 'trips/:params', component: TripComponent, children: [
        { path: 'new', component: TripFormComponent },
        { path: 'edit', component: TripFormComponent },
        { path: 'overview', component: TripOverviewComponent }
    ]}
]

@NgModule({
    imports: [
        RouterModule.forChild(tripRoutes)
    ],
    exports: [RouterModule] 
})
export class TripRoutingModule { }