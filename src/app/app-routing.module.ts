import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './services/auth-guard.service';

const routes: Routes = [
  { path: '', component: HomeComponent },
    { path: '', canLoad: [AuthGuard], loadChildren: './trips/trips.module#TripsModule' },
    { path: '', canLoad: [AuthGuard], loadChildren: './trip/trip.module#TripModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
