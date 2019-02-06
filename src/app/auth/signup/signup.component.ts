import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

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

  public onSingup() {
    const user = this.authForm.value;
    this.authService.signup(user).subscribe(
      user => console.log(user),
      err => console.log('Error= ' + err)
    )
  }

}
