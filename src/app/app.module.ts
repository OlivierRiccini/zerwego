import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatCheckboxModule } from '@angular/material';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatAutocompleteModule} from '@angular/material/autocomplete';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { CreateTripComponent } from './trips/create-trip/create-trip.component';
import { tripPreviewComponent } from './trips/create-trip/trip-preview/trip-preview.component';
import { SubHeaderBannerComponent } from './shared/sub-header-banner/sub-header-banner.component';
import { TripFormComponent } from './forms/trip-form/trip-form.component';
import { MyTripsComponent } from './trips/my-trips/my-trips.component';
import { MyTripsListComponent } from './trips/my-trips/my-trips-list/my-trips-list.component';
import { TripDetailsComponent } from './trips/my-trips/trip-details/trip-details.component';
import { ManageTripComponent } from './trips/manage-trip/manage-trip.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TripService } from './services/trip.service';
import { UserService } from './services/user.service';
import { DestinationService } from './services/destination.service';
import { HomeComponent } from './home/home.component';

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
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    BrowserAnimationsModule,
    MatButtonModule, 
    MatCheckboxModule,
    NoopAnimationsModule,
    MatAutocompleteModule,
    MatFormFieldModule
  ],
  providers: [
    TripService,
    UserService,
    DestinationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
