import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateTripComponent } from './trips/create-trip/create-trip.component';
import { MyTripsComponent } from './trips/my-trips/my-trips.component';
import { TripDetailsComponent } from './trips/my-trips/trip-details/trip-details.component';
import { ManageTripComponent } from './trips/manage-trip/manage-trip.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
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
