import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TripService } from './services/trip.service';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './services/auth.service';
import { AuthGuardLoad, AuthGuardActivate } from './services/auth-guard.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DestinationService } from './services/destination.service';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { ConfirmComponent } from './shared/confirm/confirm.component';
import { UserInterfaceService } from './services/user-interface.service';
import { NotificationComponent } from './shared/notification/notification.component';
import { SocialService } from './services/social.service';
import { SocialLoginModule, AuthServiceConfig } from "angularx-social-login";
import { GoogleLoginProvider, FacebookLoginProvider, LinkedInLoginProvider} from "angularx-social-login";
// import { MySpaceComponent } from './my-space/my-space.component';
import { AuthComponent } from './auth/auth.component';

let config = new AuthServiceConfig([
  // {
  //   id: GoogleLoginProvider.PROVIDER_ID,
  //   provider: new GoogleLoginProvider("Google-OAuth-Client-Id")
  // },
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider('2290018351254667')
  },
  // {
  //   id: LinkedInLoginProvider.PROVIDER_ID,
  //   provider: new LinkedInLoginProvider("LinkedIn-client-Id", false, 'en_US')
  // }
]);

export function provideConfig() {
  return config;
}

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    FooterComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    SharedModule,
    AuthModule,
    SharedModule,
    AppRoutingModule,
    SocialLoginModule
  ],
  providers: [
    TripService,
    DestinationService,
    AuthService,
    UserInterfaceService,
    AuthGuardLoad,
    AuthGuardActivate,
    SocialService,
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    }
  ],
  entryComponents: [AuthComponent, ConfirmComponent, NotificationComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }