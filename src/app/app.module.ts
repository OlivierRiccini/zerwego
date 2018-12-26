import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { TripService } from './services/trip.service';
import { UserService } from './services/user.service';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './shared/footer/footer.component';
import { TripModule } from './trip/trip.module';
import { TripsModule } from './trips/trips.module';
import { SharedModule } from 'src/shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    TripModule,
    TripsModule,
    SharedModule,
    AppRoutingModule,
  ],
  providers: [
    TripService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }