import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, ValidatorFn, FormControl } from '@angular/forms';
import { ValidatePassword } from 'src/app/shared/utils/validators';
import { AuthService } from 'src/app/services/auth.service';
import { MatDialogRef } from '@angular/material';
import { HomeComponent } from '../../home.component';
import { ICredentials } from 'src/app/models/auth';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss', '../auth.component.scss'],
})
export class SigninComponent implements OnInit {
  public form: FormGroup;
  public isEmailLogin: boolean = true;
  public isPhoneLogin: boolean = false;

  constructor(private fb: FormBuilder, private authService: AuthService, private dialogRef: MatDialogRef<HomeComponent>) { }

  ngOnInit() {
    this.createForm();
  }

  private createForm() {
    this.form = this.fb.group({
      loginMode: ['email', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
    this.addAsyncPasswordValidator('password');
    this.addAsyncPasswordValidator('email');
  }

  public onSelectLoginMode(mode: 'email' | 'phone'): void {
    this.updateLoginMode(mode);
    this.handleLoginModeControls(mode);
    this.form.reset();
  }

  public onSubmit(): void {
    if (this.form.valid) {
      const credentials: ICredentials = this.form.value;
      credentials.type = 'password';
      this.authService.login(credentials).subscribe(() => this.dialogRef.close());
    }
  }

  private updateLoginMode(mode: 'email' | 'phone'): void {
    this.isEmailLogin = mode === 'email';
    this.isPhoneLogin = mode === 'phone';
  }

  private handleLoginModeControls(mode: 'email' | 'phone'): void {
    const validators: ValidatorFn[] = [Validators.required];
    if (mode === 'email') { validators.push(Validators.email) };
    this.form.removeControl(mode === 'email' ? 'phone' : 'email');
    this.form.addControl(mode, new FormControl('', validators));
    this.addAsyncPasswordValidator(mode);
  }

  private addAsyncPasswordValidator(field: 'email' | 'password' | 'phone'): void {
    this.form.controls[field].setAsyncValidators(ValidatePassword.createValidator(this.authService, field));
  }

}
