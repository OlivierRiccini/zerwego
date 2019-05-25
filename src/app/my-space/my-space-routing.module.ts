import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
// import { TripsComponent } from "../trips/trips.component";
import { MySpaceComponent } from "./my-space.component";
// import { TripsPreviewComponent } from "./trips-preview/trips-preview.component";
// import { AuthGuard } from "../services/auth-guard.service";

const mySpaceRoutes: Routes = [
    { path: '', component: MySpaceComponent},
    { path: 'trips/:params', loadChildren: '../trip/trip.module#TripModule' }
];

@NgModule({
    imports: [
        RouterModule.forChild(mySpaceRoutes)
    ],
    exports: [RouterModule] 
})
export class MySpaceRoutingModule { }