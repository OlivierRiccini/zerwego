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
  // public form: FormGroup;
  // public isEditMode: boolean = false;

  constructor(public authService: AuthService, public fb: FormBuilder) { 
    this.currentUser = this.authService.getCurrentUser();
  }

  public ngOnInit() {
    // this.createForm();
  }
  
  // public onToggleEditMode(): void {
  //   this.isEditMode = !this.isEditMode;
  //   if (!this.isEditMode) {
  //     this.form.reset();
  //     for (const ctl in this.form.controls) {
  //       this.form.get(ctl).disable();
  //       this.form.get(ctl).setValue(this.getDefaultValues()[ctl]);
  //     }
  //   } else {
  //     for (const ctl in this.form.controls) {
  //       this.form.get(ctl).enable();
  //     }
  //   }
  // }

  // public onSubmit() {
  //   console.log(this.form.value);
  // }

  // private createForm(): void {
  //   this.form = this.fb.group({
  //     username: [{ value: this.getDefaultValues().username, disabled: !this.isEditMode}],
  //     email: [{ value: this.getDefaultValues().email, disabled: !this.isEditMode}],
  //     phone: [{ value: this.getDefaultValues().phone, disabled: !this.isEditMode}]
  //   });
  // }

  // private getDefaultValues(): { username: string, email: string, phone: string } {
  //   return {
  //     username: this.currentUser.username ? this.currentUser.username : '',
  //     email: this.currentUser.email ? this.currentUser.email : '',
  //     phone: this.currentUser.phone ? this.currentUser.phone : ''
  //   }
  // }

}
