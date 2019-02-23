import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { TripsComponent } from "./trips.component";
import { TripsPreviewComponent } from "./trips-preview/trips-preview.component";
// import { AuthGuard } from "../services/auth-guard.service";

const tripsRoutes: Routes = [
    // { path: '', component: TripsComponent }
    { path: '', component: TripsComponent, children: [
        { path: ':id/preview', component: TripsPreviewComponent }
    ]},
    { path: ':params', loadChildren: '../trip/trip.module#TripModule' }
];

@NgModule({
    imports: [
        RouterModule.forChild(tripsRoutes)
    ],
    exports: [RouterModule] 
})
export class TripsRoutingModule { }