import { Component } from '@angular/core';
import { IUser } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder } from '@angular/forms';

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

}
