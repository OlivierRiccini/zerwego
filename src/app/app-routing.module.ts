import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthGuardLoad, AuthGuardActivate } from './services/auth-guard.service';
import { SignupComponent } from './auth/signup.component';
import { SigninComponent } from './auth/signin.component';

// const routes: Routes = [
//   { path: '', component: HomeComponent },
//     { path: 'trips', canLoad: [AuthGuard], loadChildren: './trips/trips.module#TripsModule' },
//     { path: 'trip', canLoad: [AuthGuard], loadChildren: './trip/trip.module#TripModule' }
// ];
const routes: Routes = [
  { path: '', component: HomeComponent, children: [
    { path: 'signup',  component: SignupComponent },
    { path: 'signin',  component: SigninComponent }
  ] },
  // {
  //   path: 'auth', 
  //   loadChildren: './auth/auth.module#AuthModule'
  // },
  {
    path: 'trips', canLoad: [AuthGuardLoad],
    canActivate: [AuthGuardActivate],
    runGuardsAndResolvers: 'always',
    loadChildren: './trips/trips.module#TripsModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
