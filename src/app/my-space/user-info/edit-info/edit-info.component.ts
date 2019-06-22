import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UserInfoComponent } from '../user-info.component';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidateEmailNotTaken, ValidatePhoneNotTaken } from 'src/app/shared/utils/validators';
import { ICountryCode } from 'src/app/models/auth';
import { IUser } from 'src/app/models/user';

@Component({
  selector: 'app-edit-info',
  templateUrl: './edit-info.component.html',
  styleUrls: ['./edit-info.component.scss', '../user-info.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EditInfoComponent extends UserInfoComponent implements OnInit {
  public form: FormGroup;
  public isEditMode: boolean = false;
  public countryCodes: ICountryCode[];
  public userCountry: string[] = [];

  constructor(public authService: AuthService, public fb: FormBuilder) { 
    super(authService, fb)
  }

  public async ngOnInit() {
    await this.createForm();
  }
  
  public onToggleEditMode(): void {
    this.isEditMode = !this.isEditMode;
    if (!this.isEditMode) {
      this.form.reset();
      this.disableForm();
    } else {
      this.enableForm();
    }
  }

  public onSubmit() {
    if (this.form.valid) {
      const user : IUser= this.form.value;
      this.authService.updateProfile(user, this.currentUser.id).subscribe(() => { 
        this.initUser();
        this.disableForm();
        this.isEditMode = false;
      })
    }
  }

  private async createForm(): Promise<void> {
    this.form = this.fb.group({
      username: [{ value: this.getDefaultValues().username, disabled: !this.isEditMode}, [Validators.required]],
      email: [{ value: this.getDefaultValues().email, disabled: !this.isEditMode}],
      phone: [{ value: this.getDefaultValues().phone, disabled: !this.isEditMode}],
    });
    this.form.controls['email'].setAsyncValidators(ValidateEmailNotTaken.createValidator(this.authService, this.currentUser.id));
    this.form.controls['phone'].setAsyncValidators(ValidatePhoneNotTaken.createValidator(this.authService, this.currentUser.id));
  }

  private getDefaultValues(): { username: string, email: string, phone: string } {
    return {
      username: this.currentUser.username ? this.currentUser.username : '',
      email: this.currentUser.email ? this.currentUser.email : '',
      phone: this.currentUser.phone ? this.currentUser.phone.internationalNumber: ''
    }
  }

  private disableForm(): void {
    for (const ctl in this.form.controls) {
      this.form.get(ctl).disable();
      this.form.get(ctl).setValue(this.getDefaultValues()[ctl]);
    }
  }

  private enableForm(): void {
    for (const ctl in this.form.controls) {
      this.form.get(ctl).enable();
    }
  }

}
