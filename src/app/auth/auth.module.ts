import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { AuthComponent } from './auth.component';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

@NgModule({
  declarations: [AuthComponent, SignupComponent, SigninComponent, ForgotPasswordComponent],
  imports: [
    CommonModule,
    SharedModule,
    NgxIntlTelInputModule
  ],
  exports: [AuthComponent]
})
export class AuthModule {}
