import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { AuthRoutingModule } from './home-routing.module';
import { AuthComponent } from './auth/auth.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { HomeComponent } from './home.component';
import { BsDropdownModule } from 'ngx-bootstrap';

@NgModule({
  declarations: [HomeComponent, AuthComponent, SignupComponent, SigninComponent, ForgotPasswordComponent],
  imports: [
    CommonModule,
    SharedModule,
    AuthRoutingModule,
    BsDropdownModule.forRoot(),
    NgxIntlTelInputModule
  ],
  entryComponents: [AuthComponent]
})
export class HomeModule {}
