import { Component, OnInit } from '@angular/core';
import { UserInfoComponent } from '../user-info.component';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { checkPasswords } from '../../../shared/utils/validators';
import { MyErrorStateMatcher } from 'src/app/shared/utils/error-matcher';
import { UserInterfaceService } from 'src/app/services/user-interface.service';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss', '../user-info.component.scss']
})
export class ResetPasswordComponent extends UserInfoComponent implements OnInit {
  public form: FormGroup;
  public isEditMode: boolean = false;
  public matcher = new MyErrorStateMatcher();

  constructor(
    public authService: AuthService, 
    public fb: FormBuilder,
    private router: Router,
    private userInterfaceService: UserInterfaceService) { 
    super(authService, fb)
  }

  public ngOnInit() {
    this.createForm();
  }
  
  public onToggleEditMode(): void {
    this.isEditMode = !this.isEditMode;
    if (!this.isEditMode) {
      this.form.reset();
      this.disableForm(this.form);
    } else {
      this.enableForm(this.form);
    }
  }

  public onSubmit() {
    if (this.form.invalid) {
      console.log('FORM INVALID');
      return;
    }
    const confirmEventSubscription: Subscription = this.userInterfaceService.confirm({
      message: `You're about to reset your password, if you continue you'll be logged out
               and redirected to the authentification page. Do you want to process?`,
      trueLabel: 'Yes I do',
      falseLabel: 'No thanks'
    }).subscribe((userResponse: boolean) => {
        if (userResponse) {
          this.processRequest();
        } else {
          this.isEditMode = false;
          this.form.reset();
          this.disableForm(this.form);
        }
        confirmEventSubscription.unsubscribe();
      });
  }

  private processRequest(): void {
    const oldPassword: string = this.form.value.currentPassword;
    const newPassword: string = this.form.value.newPassword;
    this.authService.updatePassword(this.currentUser.id, oldPassword, newPassword).subscribe(
      async () => {
        this.form.reset();
        this.userInterfaceService.success('Profile updated successfully!');
        await this.authService.logout().toPromise();
        this.router.navigate(['/', 'signin']);
        this.isEditMode = false;
      },
      () => {
        this.form.get('currentPassword').setErrors({ passwordNotValid: true })
      }
    );
  }

  private createForm(): void {
    this.form = this.fb.group({
      currentPassword: [{ value: '', disabled: !this.isEditMode}, [Validators.required]],
      newPassword: [{ value: '', disabled: !this.isEditMode}, [Validators.required, checkPasswords]],
      confirmPassword: [{ value: '', disabled: !this.isEditMode}, [Validators.required, checkPasswords]]
    });
    this.hanldePassChangesAfterConfirm();
  }

  private hanldePassChangesAfterConfirm(): void {
    this.form.get('newPassword').valueChanges.subscribe(
      (value: string) => {
        if (this.form.get('confirmPassword').value === value) {
          this.form.get('confirmPassword').setErrors(null);
        } else {
          this.form.get('confirmPassword').setErrors({notSame: true});
        }
      }
    )
  }

}
