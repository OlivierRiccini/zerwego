import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { TripPreviewComponent } from './trips/trips-preview/trip-preview.component';
import { TripFormComponent } from './trip/trip-form/trip-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TripService } from './services/trip.service';
import { UserService } from './services/user.service';
import { DestinationService } from './services/destination.service';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './shared/footer/footer.component';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import { MaterialModule } from './material.module';
import { HttpClientModule } from '@angular/common/http';
import { TripComponent } from './trip/trip.component';
import { TripOverviewComponent } from './trip/trip-overview/trip-overview.component';
import { TripsComponent } from './trips/trips.component';
import { TripsListComponent } from './trips/trips-list/trips-list.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TripComponent,
    TripFormComponent,
    TripOverviewComponent,
    TripsComponent,
    TripsListComponent,
    TripPreviewComponent,
    HomeComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule
  ],
  entryComponents: [
    TripFormComponent
  ],
  providers: [
    TripService,
    UserService,
    DestinationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
// platformBrowserDynamic().bootstrapModule(AppModule);