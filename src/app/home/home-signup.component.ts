import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { UserInterfaceService } from '../services/user-interface.service';

@Component({
  selector: 'app-home-signup',
  templateUrl: './home-signup.component.html',
  styleUrls: ['./home-signup.component.scss']
})
export class HomeSignupComponent implements OnInit {

  signupForm: FormGroup;

  constructor(
    public fb: FormBuilder,
    public authService: AuthService,
    private userInterfaceService: UserInterfaceService
    ) { 
        this.signupForm = this.fb.group({
            name: [''],
            email: [''],
            password: ['']
        });
  }
  
  ngOnInit() {
    
  }

  public onSubmit() {
    const user = this.signupForm.value;
    this.authService.register(user).subscribe(
      user => {
        this.userInterfaceService.success(`Successfully registered!`);
      },
      err => this.userInterfaceService.error(err.message)
    )
  }
}
