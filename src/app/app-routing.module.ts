import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateTripComponent } from './home/create-trip/create-trip.component';
import { MyTripsComponent } from './my-trips/my-trips.component';
import { TripDetailsComponent } from './my-trips/trip-details/trip-details.component';
import { ManageTripComponent } from './manage-trip/manage-trip.component';

const routes: Routes = [
  { path: '', redirectTo: '/newTrip', pathMatch: 'full' },
  { path: 'newTrip', component: CreateTripComponent },
  { path: 'myTrips', component: MyTripsComponent, children: [
    { path: ':id', component: TripDetailsComponent },
  ] },
  { path: 'manageTrip/:id', component: ManageTripComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
