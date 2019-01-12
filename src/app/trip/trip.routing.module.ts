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

const tripRoutes: Routes = [
    { path: 'trips/:params', component: TripComponent, children: [
        { path: 'new', component: TripAddFormComponent, data: {mode : 'new'} },
        { path: 'overview', component: TripOverviewComponent, children: [
            { path: 'edit', component: TripEditFormComponent, data: {mode : 'edit'} }
        ]},
        { path: 'destination', component: TripDestinationComponent, children: [
            { path: 'edit', component: TripEditFormComponent, data: {mode : 'edit'} }
        ] },
        { path: 'participants', component: TripParticipantsComponent, children: [
            { path: 'edit', component: TripEditFormComponent, data: {mode : 'edit'} }
        ] },
        { path: 'calendar', component: TripCalendarComponent, children: [
            { path: 'edit', component: TripEditFormComponent, data: {mode : 'edit'} }
        ] },
        { path: 'transport', component: TripTransportComponent, children: [
            { path: 'edit', component: TripEditFormComponent, data: {mode : 'edit'} }
        ] },
        { path: 'accomodation', component: TripAccomodationComponent, children: [
            { path: 'edit', component: TripEditFormComponent, data: {mode : 'edit'} }
        ] },
        { path: 'activities', component: TripActivitiesComponent, children: [
            { path: 'edit', component: TripEditFormComponent, data: {mode : 'edit'} }
        ] },
        { path: 'budget', component: TripBudgetComponent, children: [
            { path: 'edit', component: TripEditFormComponent, data: {mode : 'edit'} }
        ] }
    ]}
]

@NgModule({
    imports: [
        RouterModule.forChild(tripRoutes)
    ],
    exports: [RouterModule] 
})
export class TripRoutingModule { }