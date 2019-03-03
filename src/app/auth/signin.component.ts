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
      title: 'Sign in',
      submit: 'Sign in',
      changeForm: 'I don\t have an account yet'
    };
    // this.authService.endOfSessionEvent.subscribe(
    //   endOfSession => {
    //     this.label.title = endOfSession ? 'Sessions expired, reconnect!' : 'Sign PPP';
    //     console.log(this.label)
    //   },
    //   err => console.log(err)
    // );
  }

  public onSubmit() {
    const user = this.authForm.value;
    this.authService.login(user.email, user.password).subscribe(
      () => {
        this.dialogRef.close();
        this.router.navigate(['./', 'trips']);
      },
      err => console.log(err)
    )
  }

}
