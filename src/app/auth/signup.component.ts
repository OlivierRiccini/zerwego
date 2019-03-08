import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { AuthComponent } from './auth.component';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { UserInterfaceService } from '../services/user-interface.service';

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
    private userInterfaceService: UserInterfaceService
    ) { 
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
        this.userInterfaceService.success('Successfully registered!');
      },
      err => this.userInterfaceService.error(err.message)
    )
  }
}
