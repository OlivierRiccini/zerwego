import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { TripComponent } from "./trip.component";
import { TripAddFormComponent } from "./trip-form/trip-form-add.component";
import { TripOverviewComponent } from "./trip-overview/trip-overview.component";
import { TripCalendarComponent } from "./trip-calendar/trip-calendar.component";
import { TripTransportComponent } from "./trip-transport/trip-transport.component";
import { TripAccomodationComponent } from "./trip-accomodation/trip-accomodation.component";
import { TripBudgetComponent } from "./trip-budget/trip-budget.component";
import { TripActivitiesComponent } from "./trip-activities/trip-activities.component";
import { TripParticipantsComponent } from "./trip-participants/trip-participants.component";
import { TripDestinationComponent } from "./trip-destination/trip-destination.component";
import { TripEditFormComponent } from "./trip-form/trip-form-edit.component";
// import { AuthGuard } from "../services/auth-guard.service";

const tripRoutes: Routes = [
    { path: '', component: TripComponent, children: [
        { path: 'new', component: TripAddFormComponent },
        { path: 'overview', component: TripOverviewComponent, children: [
            { path: 'edit', component: TripEditFormComponent }
        ]}, 
        { path: 'destination', component: TripDestinationComponent, children: [
            { path: 'edit', component: TripEditFormComponent }
        ] },
        { path: 'participants', component: TripParticipantsComponent, children: [
            { path: 'edit', component: TripEditFormComponent }
        ] },
        { path: 'calendar', component: TripCalendarComponent, children: [
            { path: 'edit', component: TripEditFormComponent }
        ] },
        { path: 'transport', component: TripTransportComponent, children: [
            { path: 'edit', component: TripEditFormComponent }
        ] },
        { path: 'accomodation', component: TripAccomodationComponent, children: [
            { path: 'edit', component: TripEditFormComponent }
        ] },
        { path: 'activities', component: TripActivitiesComponent, children: [
            { path: 'edit', component: TripEditFormComponent }
        ] },
        { path: 'budget', component: TripBudgetComponent, children: [
            { path: 'edit', component: TripEditFormComponent }
        ] }
    ]}
    // { path: '', component: TripComponent, children: [
        
    // ] }
]

@NgModule({
    imports: [
        RouterModule.forChild(tripRoutes)
    ],
    exports: [RouterModule] 
})
export class TripRoutingModule { }