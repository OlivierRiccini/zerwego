import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {
  public currentUser: IUser;

  constructor(private authService: AuthService) { 
    this.currentUser = this.authService.getCurrentUser();
  }

  ngOnInit() {
  }

}
