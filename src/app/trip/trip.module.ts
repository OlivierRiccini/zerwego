import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TripComponent } from './trip.component';
import { TripFormBaseComponent } from './trip-form/trip-form-base.component';
import { TripOverviewComponent } from './trip-overview/trip-overview.component';
// import { DestinationService } from '../services/destination.service';
// import { AppModule } from '../app.module';
import { TripRoutingModule } from './trip-routing.module';
// import { MaterialModule } from '../material.module';
import { SharedModule } from '../shared/shared.module';
import { TripTransportComponent } from './trip-transport/trip-transport.component';
import { TripCalendarComponent } from './trip-calendar/trip-calendar.component';
import { TripBudgetComponent } from './trip-budget/trip-budget.component';
import { TripAccomodationComponent } from './trip-accomodation/trip-accomodation.component';
import { TripParticipantsComponent } from './trip-participants/trip-participants.component';
import { TripActivitiesComponent } from './trip-activities/trip-activities.component';
import { TripDestinationComponent } from './trip-destination/trip-destination.component';
import { Daterangepicker } from 'ng2-daterangepicker';
import { TripAddFormComponent } from './trip-form/trip-form-add.component';
import { TripEditFormComponent } from './trip-form/trip-form-edit.component';

@NgModule({
  declarations: [
    TripComponent,
    TripFormBaseComponent,
    TripAddFormComponent,
    TripEditFormComponent,
    TripOverviewComponent,
    TripDestinationComponent,
    TripParticipantsComponent,
    TripTransportComponent,
    TripCalendarComponent,
    TripAccomodationComponent,
    TripActivitiesComponent,
    TripBudgetComponent
  ],
  entryComponents: [
    TripFormBaseComponent
  ],
  imports: [
    CommonModule,
    TripRoutingModule,
    Daterangepicker,
    SharedModule
  ],
  // providers: [
  //   DestinationService
  // ],
})
export class TripModule {}
