import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { AuthComponent } from './auth.component';
import { MatDialog, MatDialogRef, MatStepper } from '@angular/material';
import { Router } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { UserInterfaceService } from '../services/user-interface.service';
import { FacebookService } from '../services/facebook.service';
import { IForgotPassword } from '../models/auth';
import { ContactMode } from '../models/shared';

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
    public facebookService: FacebookService
    ) { 
      super(fb, authService, dialogRef, router, userInterfaceService, facebookService);
    }
    
  ngOnInit() {
    super.ngOnInit();
    this.creatForgotPasswordForm();
    this.signInMode = true;
    this.label = {
      title: 'Sign in',
      submit: 'Sign in',
      changeForm: 'I don\t have an account yet'
    };
  }

  public onSubmit() {
    if (this.authForm.invalid) {
      return;
    }
    const user = this.authForm.value;
    this.authService.login({type: 'password', email: user.email, password: user.password}).subscribe(
      () => {
        this.dialogRef.close();
        this.userInterfaceService.success('Successfully logged in!');
      },
      err => this.userInterfaceService.error(err)
    )
  }

  creatForgotPasswordForm() {
    this.forgotPasswordForm = this.fb.group({
      contactMode: ['', [Validators.required]],
      emailForgotPass: [''],
      phoneForgotPass: ['']
    });
    this.forgotPasswordForm.get('emailForgotPass').disable();
    this.forgotPasswordForm.get('phoneForgotPass').disable();
  }

  public onSelectMode(contactMode: ContactMode) {
    const validators = [ Validators.required ];
    let toEnable: string;
    let toDisable: string;
    if (contactMode === 'email') {
      toEnable = 'emailForgotPass';
      toDisable = 'phoneForgotPass';
      validators.push(Validators.email);
    } else {
      toEnable = 'phoneForgotPass';
      toDisable = 'emailForgotPass';
    }
    // const validators = [ Validators.required ];
    // const toEnable = contactMode === 'email' ? 'emailForgotPass' : 'phoneForgotPass';
    // const toDisable = contactMode !== 'email' ? 'emailForgotPass' : 'phoneForgotPass';

    this.forgotPasswordForm.get(toEnable).setValidators(validators);
    this.forgotPasswordForm.get(toDisable).clearValidators();
    this.forgotPasswordForm.get(toEnable).enable();
    this.forgotPasswordForm.get(toDisable).disable();
  }

  public onSubmitForgotPasswordForm(stepper: MatStepper) {
    this.forgotPasswordFormIsSubmited = true;
    if (!this.forgotPasswordForm.valid) {
      return;
    }
    this.stepper = stepper;
    let type = this.forgotPasswordForm.value.contactMode;
    const contact: IForgotPassword = {type};
    const to = type === 'email' ? 'email' : 'phone';
    contact[to] = type === 'email' ?  this.forgotPasswordForm.value.emailForgotPass : this.forgotPasswordForm.value.phoneForgotPass;
    this.authService.forgotPassword(contact).subscribe(
      res => {
        this.userInterfaceService.success(res);
        this.forgotPasswordForm.reset();
        this.forgotPasswordButtonLabel = 'New password sent!'
        setTimeout(() => this.stepBack(this.stepper), 3000);
      },
      err => this.userInterfaceService.error(err)
    )
  }

  private stepBack(stepper: MatStepper){
    stepper.previous();
  }

}
