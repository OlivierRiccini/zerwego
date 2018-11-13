import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { CreateTripComponent } from './create-trip/create-trip.component';
import { NewTripPreviewComponent } from './create-trip/new-trip-preview/new-trip-preview.component';
import { SubHeaderBannerComponent } from './sub-header-banner/sub-header-banner.component';
import { TripFormComponent } from './create-trip/trip-form/trip-form.component';
import { MyTripsComponent } from './my-trips/my-trips.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CreateTripComponent,
    NewTripPreviewComponent,
    SubHeaderBannerComponent,
    TripFormComponent,
    MyTripsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
