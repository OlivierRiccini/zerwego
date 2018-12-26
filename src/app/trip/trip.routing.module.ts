import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { TripComponent } from "./trip.component";
import { TripFormComponent } from "./trip-form/trip-form.component";
import { TripOverviewComponent } from "./trip-overview/trip-overview.component";
import { TripCalendarComponent } from "./trip-calendar/trip-calendar.component";
import { TripTransportComponent } from "./trip-transport/trip-transport.component";
import { TripAccomodationComponent } from "./trip-accomodation/trip-accomodation.component";
import { TripBudgetComponent } from "./trip-budget/trip-budget.component";
import { TripActivitiesComponent } from "./trip-activities/trip-activities.component";
import { TripParticipantsComponent } from "./trip-participants/trip-participants.component";
import { TripDestinationComponent } from "./trip-destination/trip-destination.component";

const tripRoutes: Routes = [
    { path: 'trips/:params', component: TripComponent, children: [
        { path: 'new', component: TripFormComponent },
        { path: 'edit', component: TripFormComponent },
        { path: 'overview', component: TripOverviewComponent },
        { path: 'destination', component: TripDestinationComponent },
        { path: 'participants', component: TripParticipantsComponent },
        { path: 'calendar', component: TripCalendarComponent },
        { path: 'transport', component: TripTransportComponent },
        { path: 'accomodation', component: TripAccomodationComponent },
        { path: 'activities', component: TripActivitiesComponent },
        { path: 'budget', component: TripBudgetComponent }
    ]}
]

@NgModule({
    imports: [
        RouterModule.forChild(tripRoutes)
    ],
    exports: [RouterModule] 
})
export class TripRoutingModule { }