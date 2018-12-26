import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TripFormComponent } from './trip/trip-form/trip-form.component';
import { TripsComponent } from './trips/trips.component';
import { TripComponent } from './trip/trip.component';
import { TripOverviewComponent } from './trip/trip-overview/trip-overview.component';
import { TripPreviewComponent } from './trips/trips-preview/trip-preview.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'trips', children: [
    { path: '',  component: TripsComponent, children: [
      { path: 'preview/:id', component: TripPreviewComponent },
    ]},
    { path: ':params', component: TripComponent, children: [
      { path: 'new', component: TripFormComponent },
      { path: 'edit', component: TripFormComponent },
      { path: 'overview', component: TripOverviewComponent }
    ]},
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
