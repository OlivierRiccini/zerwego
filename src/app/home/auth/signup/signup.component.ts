import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { MatDialogRef } from '@angular/material';
import { HomeComponent } from '../../home.component';
import { checkPasswords, ValidateEmailNotTaken, ValidatePhoneNotTaken, ValidatePassword } from 'src/app/shared/utils/validators';
import { IUser } from 'src/app/models/user';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss', '../auth.component.scss']
})
export class SignupComponent implements OnInit {
  public form: FormGroup;
  public isEmailSignup: boolean = true;
  public isPhoneSignup: boolean = false;

  constructor(
    private fb: FormBuilder, 
    private authService: AuthService, 
    private dialogRef: MatDialogRef<HomeComponent>
  ) { }

  public ngOnInit() {
    this.createForm();
  }

  private createForm(): void {
    this.form = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword : ['', [Validators.required, checkPasswords]]
    });
    // this.addAsyncPasswordValidator('password');
    // this.addAsyncPasswordValidator('email');
    this.form.controls['email'].setAsyncValidators(ValidateEmailNotTaken.createValidator(this.authService));
    this.form.controls['phone'].setAsyncValidators(ValidatePhoneNotTaken.createValidator(this.authService));
  }

  // public onSelectLoginMode(mode: 'email' | 'phone'): void {
  //   this.updateSignupMode(mode);
  //   this.handleSignupModeControls(mode);
  //   this.form.reset();
  // }

  public onSubmit(): void {
    console.log(this.form.controls);
    if (this.form.valid) {
      const user: IUser = this.form.value;
      this.authService.register(user).subscribe(() => this.dialogRef.close());
    }
  }

  // private updateSignupMode(mode: 'email' | 'phone'): void {
  //   this.isEmailSignup = mode === 'email';
  //   this.isPhoneSignup = mode === 'phone';
  // }

  // private handleSignupModeControls(mode: 'email' | 'phone'): void {
  //   const validators: ValidatorFn[] = [Validators.required];
  //   if (mode === 'email') { validators.push(Validators.email) };
  //   this.form.removeControl(mode === 'email' ? 'phone' : 'email');
  //   this.form.addControl(mode, new FormControl('', validators));
  //   this.addAsyncPasswordValidator(mode);
  // }

  private addAsyncPasswordValidator(field: 'email' | 'password' | 'phone'): void {
    this.form.controls[field].setAsyncValidators(ValidatePassword.createValidator(this.authService, field));
  }


}
