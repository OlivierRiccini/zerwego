import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  authForm: FormGroup;

  constructor(public fb: FormBuilder, private authService: AuthService) { }

  ngOnInit() {
    this.createForm();
  }

  private createForm() {
    this.authForm = this.fb.group({
      email: [''],
      password: ['']
    });
  }

  public onSignin() {
    const user = this.authForm.value;
    this.authService.login(user.email, user.password).subscribe(
      user => console.log(user),
      err => console.log('Error= ' + err)
    )
  }

}
