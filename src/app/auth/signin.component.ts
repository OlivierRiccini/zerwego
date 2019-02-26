import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { AuthComponent } from './auth.component';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-signin',
  templateUrl: './auth.component.html',
})
export class SigninComponent extends AuthComponent implements OnInit {

  authForm: FormGroup;

  constructor(
    public fb: FormBuilder,
    public authService: AuthService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<HomeComponent>,
    public router: Router) { 
      super(fb, authService, dialogRef, router);
    }
    
  ngOnInit() {
    super.ngOnInit();
    this.signInMode = true;
    this.label = {
      submit: 'Sign in',
      changeForm: 'I don\t have an account yet'
    }; 
  }

  public onSubmit() {
    const user = this.authForm.value;
    this.authService.login(user.email, user.password).subscribe(
      user => console.log(user),
      err => console.log(err)
    )
  }

}
