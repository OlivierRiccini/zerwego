import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { UserInterfaceService } from '../services/user-interface.service';
import { MyErrorStateMatcher } from '../shared/utils/error-matcher';
import { checkPasswords } from '../shared/utils/validators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-signup',
  templateUrl: './home-signup.component.html',
  styleUrls: ['./home-signup.component.scss']
})
export class HomeSignupComponent implements OnInit {

  private signupForm: FormGroup;
  private successFullySubmitted: boolean = false;
  private matcher = new MyErrorStateMatcher();

  constructor(
    public fb: FormBuilder,
    public authService: AuthService,
    private userInterfaceService: UserInterfaceService,
    private router: Router
    ) { 
        this.signupForm = this.fb.group({
            username: ['', [Validators.required]],
            email: ['', [Validators.required, Validators.email]],
            phone: ['', [Validators.required]],
            password: ['', [Validators.required]],
            confirmPassword: ['', [Validators.required, checkPasswords]]
        });
  }
  
  ngOnInit() {}

  public onSubmit() {
    if (this.signupForm.invalid) {
      return;
    }
    const user = this.signupForm.value;
    this.authService.register(user).subscribe(
      user => {
        this.router.navigate(['/', 'trips', 'new', 'overview']);
        this.userInterfaceService.success(`Successfully registered!`);
      },
      err => this.userInterfaceService.error(err.message)
    )
  }
}
