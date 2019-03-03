import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { HomeComponent } from '../home/home.component';
import { MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  // styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  public label = {
    title: null,
    submit: null,
    changeForm: null
  }; 
  public signInMode: boolean = false;
  public signUpMode: boolean = false; 
  public authForm: FormGroup;

  constructor(public fb: FormBuilder, public authService: AuthService, public dialogRef: MatDialogRef<HomeComponent>, public router: Router) { }

  ngOnInit() {
    this.createForm();
  }

  private createForm() {
    this.authForm = this.fb.group({
      email: [''],
      password: ['']
    });
  }

  public onChangeDialogMode(mode: 'signup' | 'signin') {
      this.dialogRef.close();
      this.router.navigate(['./', mode]);
      this.authService.switchDialog(true);
  }

  public onCloseDialog() {
    console.log('blaaa');
    this.dialogRef.close();
  }
}
