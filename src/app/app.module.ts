import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { CreateTripComponent } from './create-trip/create-trip.component';
import { tripPreviewComponent } from './shared/trip-preview/trip-preview.component';
import { SubHeaderBannerComponent } from './sub-header-banner/sub-header-banner.component';
import { TripFormComponent } from './create-trip/trip-form/trip-form.component';
import { MyTripsComponent } from './my-trips/my-trips.component';
import { MyTripsListComponent } from './my-trips/my-trips-list/my-trips-list.component';

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
