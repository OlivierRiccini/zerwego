// import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TripService } from './services/trip.service';
import { UserService } from './services/user.service';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';
// import { TripModule } from './trip/trip.module';
// import { TripsModule } from './trips/trips.module';
import { SharedModule } from './shared/shared.module';
// import { MatDialogRef} from '@angular/material';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './services/auth.service';
import { AuthGuardLoad, AuthGuardActivate } from './services/auth-guard.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DestinationService } from './services/destination.service';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    FooterComponent,
  ],
  imports: [
    // BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    // TripModule,
    // TripsModule,
    AuthModule,
    SharedModule,
    AppRoutingModule,
  ],
  providers: [
    TripService,
    UserService,
    DestinationService,
    AuthService,
    AuthGuardLoad,
    AuthGuardActivate
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }