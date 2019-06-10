import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {
  public currentUser: IUser;
  public form: FormGroup;
  public isEditMode: boolean = false;

  constructor(private authService: AuthService, private fb: FormBuilder,) { 
    this.currentUser = this.authService.getCurrentUser();
  }

  public ngOnInit() {
    this.createForm();
  }
  
  public onToggleEditMode(): void {
    this.isEditMode = !this.isEditMode;
    for (const ctl in this.form.controls) {
      this.isEditMode ? this.form.get(ctl).enable() : this.form.get(ctl).disable();
    }
    if (!this.isEditMode) {
      this.form.reset();
    }
  }

  private createForm(): void {
    this.form = this.fb.group({
      username: [{ value: this.currentUser.username ? this.currentUser.username : '', disabled: !this.isEditMode}],
      email: [{ value: this.currentUser.email ? this.currentUser.email : '', disabled: !this.isEditMode}],
      phone: [{ value: this.currentUser.phone ? this.currentUser.phone : '', disabled: !this.isEditMode}]
    });
  }

}
