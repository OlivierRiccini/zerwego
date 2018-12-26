import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TripsComponent } from './trips.component';
import { TripsListComponent } from './trips-list/trips-list.component';
import { TripPreviewComponent } from './trips-preview/trip-preview.component';
import { SharedModule } from 'src/shared/shared.module';
import { TripsRoutingModule } from './trips.routing.module';

@NgModule({
  declarations: [
    TripsComponent,
    TripsListComponent,
    TripPreviewComponent
  ],
  imports: [
    CommonModule,
    TripsRoutingModule,
    SharedModule
  ]
})
export class TripsModule {}
