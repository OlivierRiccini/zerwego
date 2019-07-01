import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { MatDialogRef } from '@angular/material';
import { HomeComponent } from '../../home.component';
import { checkPasswords, ValidateEmailNotTaken, ValidatePhoneNotTaken, ValidatePassword } from 'src/app/shared/utils/validators';
import { IUser } from 'src/app/models/user';
import { StepperService } from 'src/app/services/stepper-service';
import { Step } from 'src/app/models/shared';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss', '../auth.component.scss']
})
export class SignupComponent implements OnInit {
  public signUpForm: FormGroup;
  public isEmailSignup: boolean = true;
  public isPhoneSignup: boolean = false;

  constructor(
    private fb: FormBuilder, 
    private authService: AuthService, 
    private dialogRef: MatDialogRef<HomeComponent>,
    private stepperService: StepperService
  ) { 
    this.stepperService.stepHasChangedSubject.subscribe((step: Step) => this.stepHasChanged(step));
  }

  public ngOnInit() {
    this.createForm();
  }
  
  public onSubmit(): void {
    console.log(this.signUpForm.controls);
    if (this.signUpForm.valid) {
      const user: IUser = this.signUpForm.value;
      this.authService.register(user).subscribe(() => this.dialogRef.close());
    }
  }

  private stepHasChanged(step: Step): void {
    this.signUpForm.updateValueAndValidity();
    this.signUpForm.reset();
    console.log(step);
  }

  private createForm(): void {
    this.signUpForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email, ValidateEmailNotTaken.createValidator(this.authService)]],
      phone: ['', [Validators.required, ValidatePhoneNotTaken.createValidator(this.authService)]],
      password: ['', Validators.required],
      confirmPassword : ['', [Validators.required, checkPasswords]]
    });
    this.hanldePassChangesAfterConfirm();
  }

  private hanldePassChangesAfterConfirm(): void {
    this.signUpForm.get('password').valueChanges.subscribe(
      (value: string) => {
        if (this.signUpForm.get('confirmPassword').value === value) {
          this.signUpForm.get('confirmPassword').setErrors(null);
        } else {
          this.signUpForm.get('confirmPassword').setErrors({notSame: true});
        }
      }
    )
  }

  private addAsyncPasswordValidator(field: 'email' | 'password' | 'phone'): void {
    this.signUpForm.controls[field].setAsyncValidators(ValidatePassword.createValidator(this.authService, field));
  }


}
