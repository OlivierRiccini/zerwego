import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateTripComponent } from './create-trip/create-trip.component';

const routes: Routes = [
  { path: '', redirectTo: '/newTrip', pathMatch: 'full' },
  { path: 'newTrip', component: CreateTripComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
