import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { AuthComponent } from './auth.component';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { UserInterfaceService } from '../services/user-interface.service';
import { FacebookService } from '../services/facebook.service';

@Component({
  selector: 'app-signin',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class SigninComponent extends AuthComponent implements OnInit {

  authForm: FormGroup;

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
        // this.router.navigate(['./', 'trips']);
      },
      err => this.userInterfaceService.error(err)
    )
  }

}
