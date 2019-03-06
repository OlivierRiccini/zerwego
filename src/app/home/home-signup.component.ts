import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { AuthComponent } from '../auth/auth.component';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-home-signup',
  templateUrl: './home-signup.component.html',
  styleUrls: ['./home-signup.component.scss']
})
export class HomeSignupComponent extends AuthComponent implements OnInit {

  authForm: FormGroup;

  constructor(
    public fb: FormBuilder,
    public authService: AuthService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<HomeComponent>,
    public router: Router) { 
      super(fb, authService, dialogRef, router)
  }
  
  ngOnInit() {
    super.ngOnInit();
    this.signUpMode = true;
    this.label = {
      title: 'Sign up',
      submit: 'Sign up',
      changeForm: 'I already have an account'
    }; 
    this.authForm.addControl('name', new FormControl(''));
  }

  public onSubmit() {
    const user = this.authForm.value;
    this.authService.register(user).subscribe(
      user => {
        this.dialogRef.close();
        console.log(user);
      },
      err => console.log('Error= ' + err)
    )
  }
}
