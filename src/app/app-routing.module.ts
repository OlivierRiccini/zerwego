import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateTripComponent } from './create-trip/create-trip.component';
import { MyTripsComponent } from './my-trips/my-trips.component';

const routes: Routes = [
  { path: '', redirectTo: '/newTrip', pathMatch: 'full' },
  { path: 'newTrip', component: CreateTripComponent },
  { path: 'myTrips', component: MyTripsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
