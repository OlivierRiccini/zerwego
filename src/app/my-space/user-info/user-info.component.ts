import { Component } from '@angular/core';
import { IUser } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent {
  public currentUser: IUser;

  constructor(public authService: AuthService, public fb: FormBuilder) { 
    this.initUser();
  }
  
  public initUser(): void {
    this.currentUser = this.authService.getCurrentUser();
  }

  public disableForm(form: FormGroup): void {
    for (const ctl in form.controls) {
      form.get(ctl).disable();
      form.get(ctl).setValue(this.getDefaultValues()[ctl]);
    }
  }

  public enableForm(form: FormGroup): void {
    for (const ctl in form.controls) {
      form.get(ctl).enable();
    }
  }

  public getDefaultValues(): { username: string, email: string, phone: string } {
    return {
      username: this.currentUser.username ? this.currentUser.username : '',
      email: this.currentUser.email ? this.currentUser.email : '',
      phone: this.currentUser.phone ? this.currentUser.phone.internationalNumber: ''
    }
  }

}
