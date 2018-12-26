import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TripComponent } from './trip.component';
import { TripFormComponent } from './trip-form/trip-form.component';
import { TripOverviewComponent } from './trip-overview/trip-overview.component';
import { DestinationService } from '../services/destination.service';
import { AppModule } from '../app.module';
import { TripRoutingModule } from './trip.routing.module';
import { MaterialModule } from '../material.module';
import { SharedModule } from 'src/shared/shared.module';

@NgModule({
  declarations: [
    TripComponent,
    TripFormComponent,
    TripOverviewComponent,
  ],
  entryComponents: [
    TripFormComponent
  ],
  imports: [
    CommonModule,
    TripRoutingModule,
    SharedModule
  ],
  providers: [
    DestinationService
  ],
})
export class TripModule {}
