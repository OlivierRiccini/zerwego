import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CreateTripComponent } from './create-trip/create-trip.component';
import { TripPreviewComponent } from './trip-preview/trip-preview.component';
import { IntroBannerComponent } from './intro-banner/intro-banner.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CreateTripComponent,
    TripPreviewComponent,
    IntroBannerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
