import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { AuthComponent } from './auth.component';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { UserInterfaceService } from '../services/user-interface.service';
import { checkPasswords } from '../shared/utils/validators';
import { SocialService } from '../services/social.service';

@Component({
  selector: 'app-signup',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class SignupComponent extends AuthComponent implements OnInit {

  authForm: FormGroup;

  constructor(
    public fb: FormBuilder,
    public authService: AuthService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<HomeComponent>,
    public router: Router,
    public userInterfaceService: UserInterfaceService,
    public socialService: SocialService
    ) { 
      super(fb, authService, dialogRef, router, userInterfaceService, socialService)
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
    this.authForm.addControl('confirmPassword', new FormControl('', [Validators.required, checkPasswords]))
  }

  public onSubmit() {
    if (this.authForm.invalid) {
      return;
    }
    let user = this.authForm.value;
    if (user.phone) {
      user.phone = `${this.authForm.value.countryCallingCode}${this.authForm.value.phone.replace(/\W/g, '')}`;
    }
    this.authService.register(user).subscribe(
      user => {
        this.dialogRef.close();
        this.userInterfaceService.success('Successfully registered!');
      },
      err => this.userInterfaceService.error(err.message)
    )
  }
  
}
