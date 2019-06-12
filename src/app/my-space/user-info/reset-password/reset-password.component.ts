import { Component, OnInit } from '@angular/core';
import { UserInfoComponent } from '../user-info.component';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { checkPasswords } from '../../../shared/utils/validators';
import { MyErrorStateMatcher } from 'src/app/shared/utils/error-matcher';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss', '../user-info.component.scss']
})
export class ResetPasswordComponent extends UserInfoComponent implements OnInit {
  public form: FormGroup;
  public isEditMode: boolean = false;
  public matcher = new MyErrorStateMatcher();

  constructor(public authService: AuthService, public fb: FormBuilder) { 
    super(authService, fb)
  }

  public ngOnInit() {
    this.createForm();
  }
  
  public onToggleEditMode(): void {
    this.isEditMode = !this.isEditMode;
    if (!this.isEditMode) {
      this.form.reset();
      for (const ctl in this.form.controls) {
        this.form.get(ctl).disable();
      }
    } else {
      for (const ctl in this.form.controls) {
        this.form.get(ctl).enable();
      }
    }
  }

  public onSubmit() {
    console.log(this.form.value);
  }

  private createForm(): void {
    this.form = this.fb.group({
      currentPassword: [{ value: '', disabled: !this.isEditMode}, [Validators.required]],
      newPassword: [{ value: '', disabled: !this.isEditMode}, [Validators.required]],
      confirmPassword: [{ value: '', disabled: !this.isEditMode}, [Validators.required, checkPasswords]]
    });
  }

}
