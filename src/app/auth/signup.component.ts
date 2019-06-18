import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { AuthComponent } from './auth.component';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { UserInterfaceService } from '../services/user-interface.service';
import { checkPasswords, ValidatePhoneNotTaken } from '../shared/utils/validators';
import { SocialService } from '../services/social.service';
import { ValidateEmailNotTaken } from '../shared/utils/validators';
import { formatPhoneNumber } from '../shared/utils/helpers';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-signup',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class SignupComponent extends AuthComponent implements OnInit {

  public authForm: FormGroup;

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
      super(fb, authService, dialogRef, router, userInterfaceService, socialService, dataService)
  }
  
  ngOnInit() {
    super.ngOnInit();
    this.signUpMode = true;
    this.label = {
      title: 'Sign up',
      submit: 'Sign up',
      changeForm: 'I already have an account'
    }; 
    this.authFormIsPhone = true;
    this.authForm.addControl('username', new FormControl('', Validators.required));
    this.authForm.addControl('phone', new FormControl('', Validators.required));
    this.authForm.addControl('countryCallingCode', new FormControl('', Validators.required));
    this.authForm.addControl('confirmPassword', new FormControl('', [Validators.required, checkPasswords]));
    this.authForm.controls['email'].setAsyncValidators(ValidateEmailNotTaken.createValidator(this.authService));
    this.authForm.controls['phone'].setAsyncValidators(ValidatePhoneNotTaken.createValidator(this.authService));
    this.hanldePassChangesAfterConfirm();
  }

  public async onSubmit() {
    if (this.authForm.invalid) {
      return;
    }
    let user = this.authForm.value;
    if (user.phone) {
      user.phone = formatPhoneNumber(this.authForm.value.countryCallingCode, this.authForm.value.phone);
    }
    this.authService.register(user).subscribe((res: boolean) => {
      if (res) {
        this.dialogRef.close();
      }
    });
  }

  private hanldePassChangesAfterConfirm(): void {
    this.authForm.get('password').valueChanges.subscribe(
      (value: string) => {
        if (this.authForm.get('confirmPassword').value === value) {
          this.authForm.get('confirmPassword').setErrors(null);
        } else {
          this.authForm.get('confirmPassword').setErrors({notSame: true});
        }
      }
    )
  }
  
}
