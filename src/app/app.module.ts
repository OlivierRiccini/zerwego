import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { CreateTripComponent } from './home/create-trip/create-trip.component';
import { tripPreviewComponent } from './home/create-trip/trip-preview/trip-preview.component';
import { SubHeaderBannerComponent } from './shared/sub-header-banner/sub-header-banner.component';
import { TripFormComponent } from './forms/trip-form/trip-form.component';
import { MyTripsComponent } from './my-trips/my-trips.component';
import { MyTripsListComponent } from './my-trips/my-trips-list/my-trips-list.component';
import { TripDetailsComponent } from './my-trips/trip-details/trip-details.component';
import { ManageTripComponent } from './manage-trip/manage-trip.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CreateTripComponent,
    tripPreviewComponent,
    SubHeaderBannerComponent,
    TripFormComponent,
    MyTripsComponent,
    MyTripsListComponent,
    TripDetailsComponent,
    ManageTripComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
