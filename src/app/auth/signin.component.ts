import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { AuthComponent } from './auth.component';
import { MatDialog, MatDialogRef, MatStepper } from '@angular/material';
import { Router } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { UserInterfaceService } from '../services/user-interface.service';
import { SocialService } from '../services/social.service';
import { IForgotPassword, ICredentials } from '../models/auth';
import { formatPhoneNumber } from '../shared/utils/helpers';
import { ValidatePassword } from '../shared/utils/validators';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-signin',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class SigninComponent extends AuthComponent implements OnInit {

  public forgotPasswordForm: FormGroup;
  authForm: FormGroup;
  stepper: MatStepper;
  public forgotPasswordButtonLabel: string = 'Send new password';
  public forgotPasswordFormIsSubmited: boolean = false;

  constructor(
    public fb: FormBuilder,
    public authService: AuthService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<HomeComponent>,
    public router: Router,
    public userInterfaceService: UserInterfaceService,
    public socialService: SocialService,
    public dataService: DataService
    ) { 
      super(fb, authService, dialogRef, router, userInterfaceService, socialService, dataService);
    }
    
  public ngOnInit() {
    super.ngOnInit();
    this.creatForgotPasswordForm();
    this.signInMode = true;
    this.label = {
      title: 'Sign in',
      submit: 'Sign in',
      changeForm: 'I don\t have an account yet'
    };
    this.authForm.controls['password'].setAsyncValidators(ValidatePassword.createValidator(this.authService, 'password'));
    this.authForm.controls['email'].setAsyncValidators(ValidatePassword.createValidator(this.authService, 'email'));
  }

  public onSubmit() {
    console.log(this.authForm.value);
    if (this.authForm.invalid) {
      return;
    }
    const user = this.authForm.value;
    const credentials: ICredentials = {type: 'password', password: user.password};
    if (this.authForm.value.contactMode && this.authForm.value.contactMode === 'sms' && this.authForm.value.phone) {
      credentials.phone = this.authForm.value.phone;
      // credentials.phone = formatPhoneNumber(this.authForm.value.countryCallingCode, this.authForm.value.phone);
    } else if (this.authForm.value.email) {
      credentials.email = this.authForm.value.email;
    }
    this.authService.login(credentials).subscribe(
      () => {
        this.dialogRef.close();
      }
    )
  }

  public creatForgotPasswordForm(): void {
    this.forgotPasswordForm = this.fb.group({
      contactMode: ['', [Validators.required]],
      emailForgotPass: ['']
    });
  }

  public onSubmitForgotPasswordForm(stepper: MatStepper) {
    console.log(this.forgotPasswordForm.value);
    this.forgotPasswordFormIsSubmited = true;
    if (!this.forgotPasswordForm.valid) {
      return;
    }
    this.stepper = stepper;
    let type = this.forgotPasswordForm.value.contactMode;
    const contact: IForgotPassword = {type};
    const to = type === 'email' ? 'email' : 'phone';
    if (type === 'email') {
      contact[to] = this.forgotPasswordForm.value.emailForgotPass;
    } else {
      contact[to] = this.forgotPasswordForm.value.phoneForgotPass;
      // contact[to]= formatPhoneNumber(this.forgotPasswordForm.value.countryCallingCode, this.forgotPasswordForm.value.phoneForgotPass);
    }
    this.authService.forgotPassword(contact).subscribe(
      res => {
        this.userInterfaceService.success(res);
        this.forgotPasswordButtonLabel = 'New password sent!'
        setTimeout(() => {
          this.stepBack(this.stepper);
          this.forgotPasswordForm.reset();
        }, 5000);
      },
      err => this.userInterfaceService.error(err.error.message)
    )
  }

  private stepBack(stepper: MatStepper){
    stepper.previous();
  }

}
