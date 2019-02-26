import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { SignupComponent } from './signup.component';
import { SigninComponent } from './signin.component';
import { AuthComponent } from './auth.component';

@NgModule({
  declarations: [AuthComponent, SignupComponent, SigninComponent],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [AuthComponent]
})
export class AuthModule {}
